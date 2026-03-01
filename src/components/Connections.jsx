import axios from "axios";
import React, { useEffect } from "react";
import { BACKEND_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(
        BACKEND_BASE_URL + "/user/connections",
        { withCredentials: true }
      );

      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(!connections){
    fetchConnection();
    }
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-info shadow-lg w-fit">
          <span>No connections yet </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <h1 className="text-3xl font-bold text-center mb-10">
        Your Connections
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((user) => (
          <div
            key={user._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="card-body">
              
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src={user.photoUrl} alt="profile" />
                  </div>
                </div>

                <div>
                  <h2 className="card-title text-lg">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm opacity-70">
                    Age {user.age} • {user.gender}
                  </p>
                </div>
              </div>

              
              <p className="text-sm mt-3 opacity-80">
                {user.about}
              </p>

              
              <div className="mt-4 flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <div key={index} className="badge badge-primary badge-outline">
                    {skill}
                  </div>
                ))}
              </div>

              
              <div className="card-actions justify-end mt-4">
                
                <button className="p-2 bg-blue-500 rounded-lg">
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;