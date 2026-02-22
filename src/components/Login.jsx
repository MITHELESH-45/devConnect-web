import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BACKEND_BASE_URL } from '../utils/constants'

const Login = () => {
  const [email, setEmailId] = useState('rahul@gmail.com')
  const [password, setPassword] = useState('Rahul@123')
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate= useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault()
    
    try{
    const res=await axios.post(BACKEND_BASE_URL+'/login',{
      email,
      password
    },{
      withCredentials:true
    });
    console.log(res.data);
    dispatch(addUser(res.data));
    navigate('/');
    }catch(err){
    setError(err.response.data.message);
    console.log(err);
    }
    
  }

  return (
    <div className="card card-border bg-base-300 w-96 mx-auto mt-20 shadow-xl">
      <div className="card-body">
        <h2 className="font-bold text-3xl text-center mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div className="form-control w-full mt-3">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full mt-1"
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="card-actions mt-5">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default Login