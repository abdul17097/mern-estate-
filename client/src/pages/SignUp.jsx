import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
const SignUp = () => { 
    const [formData, setFormData] = useState()
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`/api/auth/signup`,
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
                setError(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/signin')
        } catch (error) {
            console.error('Error during signup:', error);
            setLoading(false);
            setError(error.message);
        }
    }
  return (
    <div className='p-3 max-w-lg mx-auto '>
        <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
            type="text"
            placeholder='username' 
            className="border p-3 rounded-lg"
            onChange={handleChange}
            id='username'
            name='username'  
            />
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
            <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-65 disabl ed:opacity-80 ">{loading? "LOADING...": "Sign Up"}</button>
        </form>
        <div className="flex gap-2 mt-5">
            <p className="">Have an account?</p>
            <Link to='/signin'>
                <span className="text-blue-700">Sign In</span>
            </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default SignUp