import React, { useEffect } from 'react'
import NavBar from './components/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BACKEND_BASE_URL } from './utils/constants'
import { addUser } from './utils/userSlice'

const Body = () => {

  const dispatch= useDispatch();
  const navigate= useNavigate();

  const user= useSelector((state)=>state.user);

  const fetchUser= async()=>{
      if(user) return;
    try{
      const user=await axios.get(BACKEND_BASE_URL+'/profile/view',{
        withCredentials:true
      });
      dispatch(addUser(user.data));
    }catch(err){
      navigate('/login');
      console.log(err);
    }
  };

  useEffect(()=>{
    
    fetchUser();
  },[])
  return (
    <div >
       <NavBar />
       <Outlet />
       {/*<Footer />*/}
    </div>
  )
}

export default Body
