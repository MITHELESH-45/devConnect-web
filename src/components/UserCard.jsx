import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { BACKEND_BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, photoUrl, about, age, gender } = user;

  const handleAction = async (status) => {
    try {
      await axios.post(
        `${BACKEND_BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      // remove user from redux feed
      dispatch(removeFeed(_id));

    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 -mt-10">
      <div className="relative w-80 h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-black">

        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="absolute bottom-20 left-5 text-white">
          <h2 className="text-3xl font-bold">
            {firstName} {lastName}
          </h2>
          <p className="text-sm opacity-90 mt-1 w-64">
            {about}
          </p>
          <p>{age} years old, {gender}</p>
        </div>

        <div className="absolute bottom-5 w-full flex justify-center gap-6">
          <button
            className="bg-blue-500 px-6 py-2 rounded-full text-white"
            onClick={() => handleAction("ignored")}
          >
            Ignore
          </button>

          <button
            className="bg-pink-500 px-6 py-2 rounded-full text-white"
            onClick={() => handleAction("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;