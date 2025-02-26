import React,{useState,useEffect} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import Switch from 'react-switch';

const Memberdetail = () => {
    const navigate = useNavigate();

    const [status,setstatus] = useState("pending");
    const [renew,setrenew] = useState(false);
    const [data,setdata] = useState(null);
    const [membership,setmembership] = useState([]);
    const [planmember,setplanmember] = useState("");
    const {id} = useParams();

    useEffect(() => {
        fetchdata();
        fetchmembership();
        console.log(id);
    },[])
    const fetchmembership = async () => {
        await axios.get('http://localhost:4000/membership/get-membership',{withCredentials: true}).then((res)=>{
            setmembership(res.data);
            setplanmember(res.data[0]._id);
        }).catch(err=>{
            console.log(err);
            toast.error('Failed to fetch membership');
        });
    };
    const fetchdata = async () => {
        await axios.get(`http://localhost:4000/members/getindmember/${id}`,{withCredentials:true}).then((res)=>{
            console.log(res);
            setdata(res.data.member);
            setstatus(res.data.member.status);
            toast.success(res.data.message);
        }).catch((err)=>{
            console.log(err);
            toast.error('Failed to fetch member');
        });
    };

    const handleswitchbtn = async() => {
        let statuss= status==="active"?"pending":"active";
        await axios.post(`http://localhost:4000/members/changestatus/${id}`,{status:statuss},{withCredentials:true}).then((res)=>{
            toast.success('Status changed successfully');
        }).catch(err=>{
            console.log(err);
            toast.error('Failed to change status');
        });
        setstatus(statuss);
    }
    
    const isdateinpast = (inputDate) => {
        const today = new Date();
        const givendate = new Date(inputDate);

        return givendate < today;
    }

    const handleonchangeselect = (event) => {
        let value = event.target.value;
        setplanmember(value);
    }

    const handlerenewsavebtn = async() => {
        await axios.put(`http://localhost:4000/members/updatememplan/${id}`,{membership:planmember},{withCredentials:true}).then((res)=>{
            console.log(res);
            setdata(res.data.member);
            toast.success('Membership plan updated successfully');
        }).catch(err=>{
            toast.error('Could not update')
            console.log(err);
        });
    }

  return (
    <div className='w-3/4 text-black p-5 '>
        <div onClick={() => navigate(-1)} className='bg-slate-800 text-white hover:text-black hover:bg-white border-2 rounded-lg h-[38px] flex justify-center items-center w-[9%] cursor-pointer ' >
            <ArrowBackIcon sx={{fontSize:'25px'}}/> Back 
        </div>
        <div className='mt-10 p-2 '>
            <div className='w-[100%] h-[450px] flex'>

                
                <div className='w-[100%] mt-5 p-5 text-xl overflow-y-auto' >
                    <div className='mt-1 mb-2 text-2xl  font-semibold'> Name: {data?.name} </div>
                    <div className='mt-1 mb-2 text-2xl  font-semibold'> Mobile: {data?.mobile} </div>
                    <div className='mt-1 mb-2 text-2xl  font-semibold'> Address: {data?.address} </div>
                    <div className='mt-1 mb-2 text-2xl  font-semibold'> Joined date: {data?.createdAt.slice(0,10).split('-').reverse().join('-')} </div>
                    <div className='mt-1 mb-2 text-2xl  font-semibold'> Next bill date: {data?.nextbilldate.slice(0,10).split('-').reverse().join('-')} </div>
                    <div className='mt-1 mb-2 text-2xl  font-semibold'> Status:  <Switch onColor='#6366F1' checked={status==="active"} onChange={()=>{handleswitchbtn()}}  /></div>
                    {
                        isdateinpast(data?.nextbilldate) && <div onClick={() => {setrenew(prev =>!prev);}} class={`mt-7 border-2 p-2 w-full md:w-1/2 border-slate-800 text-center cursor-pointer hover:bg-slate-800 hover:text-white rounded-lg ${renew && status==="active" ? 'bg-slate-800 text-white':null } `} >Renew</div>
                    }
                    { renew && status==='active'? (<div class='bg-slate-50 rounded-lg p-3 mt-5 mx-auto mb-5 h-fit w-full '>
                                                        <div className='w-full'>
                                                            <div className='my-5 '>
                                                                <div>Membership</div>
                                                                <select value={planmember} onChange={(event)=>{handleonchangeselect(event)}} className='w-full border-2 p-2 rounded-lg'>
                                                                    {
                                                                        membership.map((item,index)=>{
                                                                        return (<option value={item._id}> {item.months} months membership </option>);
                                                                        })
                                                                    }
                                                                </select>
                                                                <div className={`cursor-pointer border-2 rounded-lg p-2 mt-4 border-slate-800 w-1/2 text-center mx-auto bg-slate-800 text-white`} onClick={() => handlerenewsavebtn()} >Save</div>
                                                            </div>
                                                        </div>
                                                    </div> ) : null 
                    }
                </div>

            </div>  
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Memberdetail