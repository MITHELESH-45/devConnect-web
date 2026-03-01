import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'
import axios from 'axios'
import { BACKEND_BASE_URL } from '../utils/constants'
import { addFeed } from '../utils/feedSlice'

const Feed = () => {
  
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);


  const getFeed=async()=>{
    if(feed && feed.length>0) return;
    try{
       const feed=await axios.get(BACKEND_BASE_URL+'/user/feed',{
        withCredentials:true
       });

       dispatch(addFeed(feed.data.data));
       
    }catch(err){
        console.log(err);
    }  
  }

  useEffect(()=>{
    getFeed();
  },[])
  

  return (
    <div >
    {feed && feed.length > 0 ? (
      <UserCard user={feed[0]} />
    ) : (
      <p>No more users </p>
    )}
  </div>
  )
}

export default Feed