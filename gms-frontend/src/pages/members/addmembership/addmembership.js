import React,{useState,useEffect} from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

const Addmembership = ({closeaddmembership}) => {
    const [membership,setmembership] = useState([]);
    const [inputfeilds,setinputfeilds] = useState({months:"",price:""});
        const handlechange = (e,n) => {
            setinputfeilds({...inputfeilds,[n]:e.target.value});
        };

        const fetchmemberships = async ()=>{
        await axios.get('http://localhost:4000/membership/get-membership',{withCredentials:true}).then((response)=>{
                console.log(response);
                setmembership(response.data);
                toast.success(response.data.length+"Membership fetched");
            }).catch(err=>{
                console.log(err);
                toast.error("Failed to fetch membership");
            });
        }
        useEffect(() => {
            fetchmemberships();
        },[])

        const handleaddmembership = async ()=>{
            await axios.post('http://localhost:4000/membership/add',inputfeilds,{withCredentials:true}).then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
                toast.error("Failed to add membership");
            });
        }

  return (
    <div class=' bg-black fixed bg-opacity-50 w-full h-[100vh] text-black top-0 left-0 flex justify-center' >
        <div class='bg-white rounded-lg w-1/2 h-fit mt-32 p-5' >
            <div class='flex justify-between'>
                <div class='text-4xl font-semibold '>Membership</div>
                <div onClick={() => closeaddmembership()} ><ClearIcon sx={{ fontsize:"32px" }}/></div>
            </div>
            <div class='text-black'>
                <div class='flex flex-wrap gap-5 items-center justify-center mt-7' >
                    {
                        membership.map((item,index)=>{
                            return(
                                <div class='text-lg cursor-pointer bg-slate-800 text-white border-2 px-2 flex-col gap-3 justify-between py-1 rounded-xl font-semibold hover:bg-white hover:text-black ' >
                                    <div>Months - {item.months}</div>
                                    <div>Rate - {item.price}Rs</div>
                                </div>
                            );
                        })
                    }
                </div>

                <hr className='my-8' />

                <div className='flex gap-10 mb-10'>
                    <input value={inputfeilds.months} onChange={(event)=>{handlechange(event,"months")}} className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2 ' type='number' placeholder='Add no. of months' />
                    <input value={inputfeilds.price} onChange={(event)=>{handlechange(event,"price")}} className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2 ' type='number' placeholder='Add price' />
                    <div onClick={()=>{handleaddmembership()}} class='text-lg border-2 p-1 w-auto mt-0 rounded-xl curdor-pointer bg-slate-800 text-white hover:bg-white hover:text-black cursor-pointer ' >+Add</div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Addmembership