import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../redux/userSlice';
import { app } from '../firebase';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom'
const OAuth = () => {
    const dispatch =  useDispatch()
    const {loading, error} = useSelector((state) => state.user || {})
    const navigate = useNavigate()
    const handleGoogleClick =async () =>{
        try {
            console.log("continue with google");
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const user = result.user
            console.log(user);
            const res = await fetch('/api/auth/google',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user.displayName,
                    photo: user.photoURL,
                    email: user.email,
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (error) {
            
        }
    }
  return (
    <>
    <button disabled={loading} onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg
    uppercase hover:opacity-95'>{loading? "LOADING...": "Continue with google"}</button>

    </>
    
  )
}

export default OAuth