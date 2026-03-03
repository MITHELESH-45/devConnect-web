import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { removeFeed } from '../utils/feedSlice';

const NavBar = () => {

  const user= useSelector((state)=>state.user);
  const dispatch= useDispatch();
  const navigate= useNavigate();
   
  const handleLogout=async()=>{

    try{
       await axios.post(BACKEND_BASE_URL+'/logout',{},{
        withCredentials:true
       });
       dispatch(removeUser());
       dispatch(removeFeed());
       navigate('/login');
       
      
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevConnect</Link>
  </div>
  {user && <div className="flex gap-2">
    <p className='mt-1'>Welcome! {user.data.firstName} </p>
    <div className="dropdown dropdown-end mx-2">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ">
          <img
            alt="Tailwind CSS Navbar component"
            className=''
            src={user.data.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between flex items-center">
              Profile
              <span className="badge">New</span>
          </Link>
        </li>

         <li>
          <Link to="/connections" className="justify-between flex items-center">
              Connections             
          </Link>
        </li>
        <li>
          <Link to="/requests" className="justify-between flex items-center">
              Requests           
          </Link>
        </li>
        <li><a>Settings</a></li>
        
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  }
</div>
  )
}

export default NavBar
