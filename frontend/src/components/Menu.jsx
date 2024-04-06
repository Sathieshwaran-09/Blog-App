import React from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { URL } from '../url';

const Menu = () => {
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout=async()=>{
    try {
      const res = await axios.get(URL+"/api/auth/logout", {withCredentials:true});
      //console.log(res);
      setUser(null)
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
    {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h3>}

    {!user &&<h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/register">Register</Link></h3>}

    {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/"+user._id}>Profile</Link></h3>}

    {user &&<h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/create">Create Post</Link></h3>}

    {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/myblogs/"+user._id}>My Blogs</Link></h3>}
    
    {user &&<h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">Logout</h3>}

    </div>
  )
}

export default Menu