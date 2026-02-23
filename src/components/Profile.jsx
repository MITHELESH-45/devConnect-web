import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'
import axios from 'axios'
import { addUser } from "../utils/userSlice";
import { BACKEND_BASE_URL } from "../utils/constants";

const Profile = () => {

  const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  gender: '',
  about: '',
  age: '',
  photoUrl: ''
  });
  
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  
  

  useEffect(() => {
  if (user?.data) {
    setFormData({
      firstName: user.data.firstName || '',
      lastName: user.data.lastName || '',
      gender: user.data.gender || '',
      about: user.data.about || '',
      age: user.data.age || '',
      photoUrl: user.data.photoUrl || ''
    });
  }
}, [user]);

if (!user || !user.data) {
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
        <p className="text-lg">Loading profile...</p>
      </div>
    )
  }

const handleChange = (e) => {
  const {name,value} = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.patch(
      BACKEND_BASE_URL + "/profile/edit",
      formData,
      { withCredentials: true } 
    );

    

    dispatch(addUser(res.data));  

    alert(res.data.message);

  } catch (err) {
    console.error(err);
    alert("Profile update failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">

      <div className="flex flex-col lg:flex-row gap-10 items-start">

        
        <div className="card w-96 max-w-lg bg-base-300 shadow-2xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-6">
              Edit Profile
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                   onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">About</span>
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full h-24"
                />
              </div>

              <div className="card-actions mt-6">
                <button type="submit" className="bg-blue-500 rounded-lg p-2 w-full">
                  Save Profile
                </button>
              </div>

            </form>
          </div>
        </div>

        
        {user && <UserCard user={formData} />}

      </div>
    </div>
  )
}

export default Profile