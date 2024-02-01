import React, { useState } from 'react'
import {useSelector} from 'react-redux'
const Profile = () => {
  const {currentUser} = useSelector((state)=> state.user);
  const {formData, setFormData} = useState()

  const hadleInputs = (event)={

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form action="" className='flex flex-col gap-3'>
        <img 
        src={currentUser.avatar} 
        alt="profile" 
        className="w-24 h-24 object-cover rounded-full my-2 self-center cursor-pointer" />
        <input 
        type="text"
        onChange={hadleInputs} 
        className="border p-3 rounded-lg"
        placeholder='username' id='username'/>
        <input 
        type="email
        onChange={hadleInputs}" 
        className="border p-3 rounded-lg"
        placeholder='email' id='email'/>
        <input 
        type="text"
        onChange={hadleInputs} 
        className="border p-3 rounded-lg"
        placeholder='password' id='password' />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
        <div className="flex justify-between">
          <span className="text-red-700 cursor-pointer">Delete account</span>
          <span className="text-red-700 cursor-pointer">Sigin out</span>
        </div>
    </div>
  )
}

export default Profile