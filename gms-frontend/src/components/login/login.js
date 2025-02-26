import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';

const Login = () => {

  const [loginfields,setloginfields] = useState({username:"",password:""});
  const navigate = useNavigate();
  const ogin = async() => {
  //sessionStorage.setItem('isogin', true);
  //navigate('/dashboard');
  
    await axios.post('http://localhost:4000/auth/login',loginfields,{withCredentials:true}).then((resp)=>{
      console.log(resp.data.isexist);
      localStorage.setItem('gymname', resp.data.isexist.gymname);
      localStorage.setItem('isogin',true);
      localStorage.setItem('token', resp.data.token);
      navigate('/dashboard');
    }).catch((err)=>{
      toast.error(err.response.data.error);
    });
  }

 const handleonchange = (e,n) => {
  setloginfields({...loginfields,[n]:e.target.value});
 };

  return (
    <div class='bg-gray-50 bg-opacity-55 w-1/3 mt-20 p-10 rounded-lg h-fit ml-[150px] '>
        <div class='text-black font-sans text-2xl mt-5 text-center'>Login</div>
        <input value={loginfields.username} onChange={(event)=>{handleonchange(event,"username")}} type="text" class='w-full mt-14  p-2 rounded-lg' placeholder='Enter Username'/>
        <input value={loginfields.password} onChange={(event)=>{handleonchange(event,"password")}} type="password" placeholder="Password" class="w-full rounded-lg p-2 mt-5" />
        <div class='bg-slate-800 text-white font-sans text-lg font-semibold mt-8 w-[80%] text-center mx-auto p-1 rounded-lg hover:bg-white hover:text-black hover:cursor-pointer' onClick={() => ogin()}>Login</div>
        <ToastContainer />
    </div>
  )
}

export default Login