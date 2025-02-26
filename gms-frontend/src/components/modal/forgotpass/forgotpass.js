import React,{useState} from 'react'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';


const Forgotpass = () => {
    const [btncontent,setbtncontent] = useState('Get otp');
    const [getotpbtn,setgetotpbtn] = useState(false); 
    const [updatepassbtn,setupdatepassbtn] = useState(false);

    const click = () => {
        if (!getotpbtn){
            // setgetotpbtn(true);
            // setbtncontent('Verify otp');
            sendotp(); 
        }else if (getotpbtn && !updatepassbtn){
            // setupdatepassbtn(true);
            // setbtncontent('Update password');
            verifyotp();
        }else{
            changepassword();
        }
    }

    const changepassword = async () => {
        await axios.post('http://localhost:4000/auth/reset-password',{email:inputfeilds.email,newpassword:inputfeilds.password}).then((response)=>{
            toast.success(response.data.message);
        }).catch(err=>{
            toast.error(err.response.data.error);
            console.log(err);
        });
    }

    const sendotp = async () => {
        await axios.post('http://localhost:4000/auth/reset-password/sendotp',{email:inputfeilds.email}).then((response)=>{
            setgetotpbtn(true);
            setbtncontent('Verify otp');
            toast.success(response.data.message);
        }).catch(err=>{
            toast.error(err.response.data.error);
            console.log(err);
        });
    };

    const verifyotp = async () => {
        await axios.post('http://localhost:4000/auth/reset-password/checkotp',{email:inputfeilds.email,otp:inputfeilds.otp}).then((response)=>{
            setupdatepassbtn(true);
            setbtncontent('Update password');
            toast.success(response.data.message);
        }).catch(err=>{
            toast.error(err.response.data.error);
            console.log(err);
        });
    };

    const [inputfeilds,setinputfeilds] = useState({email:"",otp:"",password:""});
    const handlechange = (e,n) => {
        setinputfeilds({...inputfeilds,[n]:e.target.value});
    };

  return (
    <div>
        <div class='mt-10 text-lg font-semibold'>Enter email:</div>
        <input value={inputfeilds.email} onChange={(event)=>{handlechange(event,"email")}} type="text" class='w-full p-2 rounded-lg border-slate-400 border-2' placeholder='Email'/>

       {getotpbtn && <div><div class=' text-lg font-semibold'>Enter otp:</div>
        <input value={inputfeilds.otp} onChange={(event)=>{handlechange(event,"otp")}} type="text" class='w-full  p-2 rounded-lg border-slate-400 border-2' placeholder='Otp'/></div>}

        {updatepassbtn && <div><div class=' text-lg font-semibold'>Enter new password:</div>
        <input value={inputfeilds.password} onChange={(event)=>{handlechange(event,"password")}} type="password" class='w-full  p-2 rounded-lg border-slate-400 border-2' placeholder='New password'/></div>}

        <div class='bg-slate-800 text-center text-white text-lg mt-10 rounded-lg w-[50%] mx-auto hover:bg-white hover:text-black cursor-pointer border-slate-800 border-[1px] ' onClick={() => click()} >{btncontent}</div>
        <ToastContainer />
    </div>
  )
}

export default Forgotpass