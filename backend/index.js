const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');
const multer = require('multer');
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments');
const path = require('path');

const app=express()

//database
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database is connected successfully!")
    }
    catch(err){
        console.log(err)
    }
}

//middlewares
dotenv.config()
app.use(express.json()); //pass incoming data
app.use("/images", express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)

//image upload
const storage = multer.diskStorage({
    destination:(req, file, fn)=>{
        fn(null,"images")
    },
    filename:(req, file, fn)=>{
        fn(null, req.body.img)
        // fn(null, "1.jpg")
    }
})

const upload = multer({storage:storage})
app.post('/api/upload', upload.single("file"), (req,res)=>{
    res.status(200).json("Image has been uploaded!!!")
})

app.listen(process.env.PORT, ()=>{
    connectDB();
    console.log("App is running on Port "+process.env.PORT);
})