import React from 'react'

const UserCard = ({user}) => {

    const { firstName, lastName,photoUrl, about,age,gender } = user

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

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Text Overlay */}
        <div className="absolute bottom-20 left-5 text-white">
          <h2 className="text-3xl font-bold">{firstName} {lastName}</h2>
          <p className="text-sm opacity-90 mt-1 w-64">
            {about}
          </p>
          <p>{age} years old, {gender}</p>
        </div>

        {/* Buttons */}
        <div className="absolute bottom-5 w-full flex justify-center gap-6">
          <button className="bg-blue-500 p-3 rounded-full text-white ">
            Ignored
          </button>
          <button className="bg-pink-500 p-3 rounded-full text-white">
            Intrested
          </button>
        </div>

      </div>

    </div>
  )
}

export default UserCard
