import React,{useState} from 'react'
import Modal from '../modal/modal'
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
  const [forgetpass,setforgetpass]=useState(false);

  const handle = () => {
    setforgetpass(prev=>!prev);
  }
  
  const [inputfeilds,setinputfeilds] = useState({email:"",gymname:"",username:"",password:""}); 
  const handlechange = (e,n) => {
    setinputfeilds({...inputfeilds,[n]:e.target.value});
  }; 

  const handleregister = async() => {
    await axios.post('http://localhost:4000/auth/register',inputfeilds).then((resp)=>{
      toast.success(resp.data.message);
    }).catch(err => {
      toast.error(err.response.data.error);
    });
  };

  return (
    <div class='bg-gray-50 bg-opacity-55 w-1/3 mt-20 ml-20 mb-[50px] p-10 rounded-lg h-fit'>
            <div class='text-black font-sans text-2xl mt-5 text-center'>Register your gym</div>
            <input value={inputfeilds.email} onChange={(event)=>{handlechange(event,"email")}} type="text" class='w-full mt-14  p-2 rounded-lg' placeholder='Email'/>
            <input value={inputfeilds.gymname} onChange={(event)=>{handlechange(event,"gymname")}} type="text" placeholder="Gym name" class="w-full rounded-lg p-2 mt-5" />
            <input value={inputfeilds.username} onChange={(event)=>{handlechange(event,"username")}} type="text" placeholder="Username" class="w-full rounded-lg p-2 mt-5" />
            <input value={inputfeilds.password} onChange={(event)=>{handlechange(event,"password")}} type="password" placeholder="Password" class="w-full rounded-lg p-2 mt-5" />

            <div class='bg-slate-800 text-white font-sans text-lg font-semibold mt-8 w-[80%] text-center mx-auto p-1 rounded-lg hover:bg-white hover:text-black hover:cursor-pointer' onClick={() => handleregister()} >Register</div>
            <div class='bg-slate-800 text-white font-sans text-lg font-semibold mt-3 w-[80%] text-center mx-auto p-1 rounded-lg hover:bg-white hover:text-black hover:cursor-pointer ' onClick={() => handle()} >forget password</div>

            {forgetpass && <Modal handle={handle}/>}
            <ToastContainer />
        </div>
  )
}

export default Register