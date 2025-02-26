import React,{useState,useEffect} from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';

const Addmemmod = ({closeaddmem}) => {

  const [inputfeilds,setinputfeilds] = useState({name:"",mobile:"",address:"",date:"",membership:""});
  const handlechange = (e,n) => {
    setinputfeilds({...inputfeilds,[n]:e.target.value});
  }

  const [selectedoptions,setselectedoptions] = useState("");
  const [membership,setmembership] = useState([]);

  const fetchmemberships = async ()=>{
    await axios.get('http://localhost:4000/membership/get-membership',{withCredentials:true}).then((response)=>{
            console.log(response);
            setmembership(response.data);
            if(response.data.length===0){
              return toast.error("No membership found",{
                className:"text-lg"
              });
            }else{
              setselectedoptions(response.data[0]._id);
              setinputfeilds({...inputfeilds,membership:response.data[0]._id});
            }
        }).catch(err=>{
            console.log(err);
        });
    }
    useEffect(() => {
        fetchmemberships();
    },[])

    const handleregister = async () => {
      await axios.post('http://localhost:4000/members/newmember',inputfeilds,{withCredentials:true}).then((res) => {
        toast.success('added successfully');
      }).catch((err) => {
        console.log(err);
        toast.error('something wrong');
      });
    }; 

  const handleonchange = (event) => {
    setselectedoptions(event.target.value);
    setinputfeilds({...inputfeilds,membership:event.target.value});
  };

  return (
    <div class=' bg-black fixed bg-opacity-50 w-full h-[100vh] text-black top-0 left-0 flex justify-center' >
        <div class='bg-white rounded-lg w-1/2 h-fit mt-32 p-5' >
          <div class='flex justify-between'>
            <div class='text-4xl font-semibold '>Add new members</div>
            <div onClick={() => closeaddmem()} ><ClearIcon sx={{ fontsize:"32px" }}/></div>
          </div>

          <div className='grid grid-cols-2 text-lg mt-7 gap-5' >
            <input value={inputfeilds.name} onChange={(event)=>{handlechange(event,"name")}} placeholder='Name' type='text' className='border-2 w-[90%] px-3 py-2 border-slate-400 rounded-md h-12'/>
            <input value={inputfeilds.mobile} onChange={(event)=>{handlechange(event,"mobile")}} placeholder='Mobile no.' type='text' className='border-2 w-[90%] px-3 py-2 border-slate-400 rounded-md h-12'/>
            <input value={inputfeilds.address} onChange={(event)=>{handlechange(event,"address")}} placeholder='Enter Address' type='text' className='border-2 w-[90%] px-3 py-2 border-slate-400 rounded-md h-12'/>
            <input value={inputfeilds.date} onChange={(event)=>{handlechange(event,"date")}} type='date' className='border-2 w-[90%] px-3 py-2 border-slate-400 rounded-md h-12'/>
            <select value={selectedoptions} onChange={(event)=>{handleonchange(event)}} class='border-2 w-[90%] h-12 py-2 border-slate-400 rounded-md placeholder:text-gray' >
                    {
                        membership.map((item,index)=>{
                            return(
                                <option key={index} value={item._id} >{item.months} months</option>
                            );
                        })
                    }
            </select>
            <div></div>
            <div class='w-1/4'> 
              <img src={'https://static.thenounproject.com/png/1176685-200.png'} className='w-full h-full rounded-full' />
            </div>
            <div onClick={()=>handleregister()} className='text-center border-2 bg-slate-800 p-3 h-14 w-28 mx-auto text-lg rounded-xl cursor-pointer text-white hover:bg-white hover:text-black ' >
              Register
            </div>
          </div>
        </div> 
        <ToastContainer/>
    </div>
  )
}

export default Addmemmod