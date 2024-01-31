import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { signInFail, signInRequest, signInSuccess } from '../redux/userSlice'
const SignIN = () => { 
    const [formData, setFormData] = useState()
    const navigate = useNavigate()
    const dispatch =  useDispatch()
    const {error, loading} = useSelector(state => state.user);

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            dispatch(signInRequest());
            const res = await fetch(`/api/auth/signin`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }            
            );
            const data = await res.json();
            if(data.success === false) {
                dispatch(signInFail(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (error) {
            console.error('Error during signup:', error);
            dispatch(signInFail(error.message))
        }
    }
  return (
    <div className='p-3 max-w-lg mx-auto '>
        <h1 className="text-3xl text-center font-bold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
            type="email"
            placeholder='email' 
            className="border p-3 rounded-lg"
            onChange={handleChange}
            id='email'  
            name='email'
            />
            <input 
            type="password"
            placeholder='password' 
            className="border p-3 rounded-lg"
            onChange={handleChange}
            id='password' 
            name='password' 
            />
            <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-65 disabl ed:opacity-80 ">{loading? "LOADING...": "Sign IN"}</button>
        </form>
        <div className="flex gap-2 mt-5">
            <p className="">Create an account?</p>
            <Link to='/signup'>
                <span className="text-blue-700">Sign UP</span>
            </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default SignIN