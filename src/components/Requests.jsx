import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constants";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BACKEND_BASE_URL + "/user/requests/received/",
        { withCredentials: true }
      );
      setRequests(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequest = async (status, requestId) => {
    try {
      await axios.post(
        BACKEND_BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      // Remove from UI instantly
      setRequests((prev) =>
        prev.filter((req) => req._id !== requestId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Connection Requests
      </h2>

      {requests.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No pending requests
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => {
            const user = req.fromUserId;

            return (
              <div key={req._id} className="card bg-base-100 shadow-xl">
                <figure className="px-6 pt-6">
                  <img
                    src={user.photoUrl}
                    alt="profile"
                    className="rounded-full w-24 h-24 object-cover"
                  />
                </figure>

                <div className="card-body items-center text-center">
                  <h2 className="card-title">
                    {user.firstName} {user.lastName}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Age: {user.age} | {user.gender}
                  </p>

                  <p className="text-sm italic">{user.about}</p>

                  <div className="flex flex-wrap gap-2 justify-center mt-2">
                    {user.skills.map((skill, index) => (
                      <div key={index} className="badge badge-outline">
                        {skill}
                      </div>
                    ))}
                  </div>

                  <div className="card-actions mt-4">
                    <button
                      className="p-2 bg-blue-500 rounded-lg text-white"
                      onClick={() =>
                        handleRequest("accepted", req._id)
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="bg-blue-500 p-2 rounded-lg text-white"
                      onClick={() =>
                        handleRequest("rejected", req._id)
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Requests;