import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Membercards from './membercards/membercards';
import Addmemmod from './addmemmod/addmemmod';
import Addmembership from './addmembership/addmembership';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

const Members = () => {
    const [data,setdata] = useState([]);
    const [addmem,setaddmem] = useState(false);
    const showaddmem = () => {
        setaddmem(prev => !prev);
    };

    const [addmembership,setaddmembership] = useState(false);
    const showaddmembership = () => {
        setaddmembership(prev => !prev);
    };

    const handleprev = () => {
        if(currentpage!==1){
            let curpage = currentpage-1;
            setcurrentpage(curpage);
            var from = (curpage-1)*9;
            var to = curpage*9;
            setstartfrom(from);
            setendto(to);
            let skipval = skip-9;
            setskip(skipval);
            fetchdata(skipval,9);
        }
    }

    const handlenext = () => {
        if(currentpage!==noofpages){
            let curpage = currentpage+1;
            setcurrentpage(curpage);
            var from = (curpage-1)*9;
            var to = curpage*9;
            if(to>totaldata){
                to = totaldata;
            }
            setstartfrom(from);
            setendto(to);
            let skipval = skip+9;
            setskip(skipval);
            fetchdata(skipval,9);
        }
    }

    const [currentpage,setcurrentpage] = useState(1);
    const [startfrom,setstartfrom] = useState(0);
    const [endto,setendto] = useState(9);
    const [totaldata,settotaldata] = useState(0);
    const [noofpages,setnoofpages] = useState(0);
    const [limit,setlimit] = useState(9);
    const [skip,setskip] = useState(0);
    const [search,setsearch] = useState("");
    const [issearchmode,setissearchmod] = useState(false);

    useEffect(() => {
        fetchdata(0,9);
    }, []);

    const fetchdata = async(skip,limits) => {
        await axios.get(`http://localhost:4000/members/allmembers?skip=${skip}&limit=${limits}`,{withCredentials:true}).then((response)=>{
            console.log(response);
            let totaldatas = response.data.totalmembers;
        settotaldata(totaldatas);
        setdata(response.data.members2);

        let extrapage = totaldatas%limit===0?0:1;
        let noofpagess = parseInt(totaldatas/limit)+extrapage;
        setnoofpages(noofpagess);

        if(totaldatas===0){
            setstartfrom(-1);
            setendto(0);
        }else if(totaldatas<=9){
            setstartfrom(0);
            setendto(totaldatas);
        }
        }).catch(err=>{
            console.log(err);
        });
    };

    const handlesearch = async () =>{
        if(search!==""){
            setissearchmod(true);
            await axios.get(`http://localhost:4000/members/searchmember?searchterm=${search}`,{withCredentials:true}).then((res)=>{
                console.log(res);
                setdata(res.data.members);
                settotaldata(res.data.totalmembers);
            }).catch(err=>{
                console.log(err);
                toast.error("technical foalt");
            });
        }else{
            if(issearchmode){
                window.location.reload();
            }else{
                toast.error("please enter any value");
            }
        }
    }

var content = null;
 if(!issearchmode){
    content = data.map((item,index)=>{
    if(index+1 >= startfrom+1 && index+1 <= endto){
    return(
         <Membercards item={item} />
    );
    }
})
} else{
   content =  data.map((item,index)=>{
        return(
             <Membercards item={item} />
        );
    }
   );
}

  return (
    <div class='w-3/4 p-5 text-black h-[100vh]' >
        
        <div class='border-2 bg-slate-900 flex justify-between w-full p-3 rounded-lg text-white'>
            <div onClick={() => showaddmem()} class='border-[1px] pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-white hover:text-black' ><PersonAddAlt1Icon sx={{ fontSize:'25px' }}/>  Add members</div>
            <div onClick={() => showaddmembership()} class='border-[1px] pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-white hover:text-black' ><AddIcon/> Memberships</div>
        </div>

        <Link to={'/dashboard'} >
           <ArrowBackIcon sx={{fontSize:'17px'}}/> Back to dashboard
        </Link>

        <div class='mt-5 w-1/2 flex gap-2' >
            <input value={search} onChange={(event)=>{setsearch(event.target.value)}} type='text' class='w-full border-2 p-2 rounded-lg' placeholder='search by name or mobile' />
            <button onClick={()=>{handlesearch()}} class='bg-slate-900 text-white p-2 rounded-lg hover:bg-white hover:text-black border-[2px]' ><SearchIcon/></button>
        </div>

        <div class='mt-5 text-xl flex justify-between text-slate-900' >
            <div>Total members {issearchmode ?totaldata:null}</div>
            {
            !issearchmode ?<div class='flex gap-5 '>
                <div>{startfrom+1}-{endto} of {totaldata}</div>
                <div class={`w-8 h-8 border-2 cursor-pointer rounded-xl flex items-center justify-center hover:bg-slate-800 hover:text-white ${currentpage===1?'bg-gray-200 text-gray-400 hover:bg-gray-200 hover:text-gray-400':null} `} onClick={() => handleprev()}><ChevronLeftIcon/></div>
                <div class={`w-8 h-8 border-2 cursor-pointer rounded-xl flex items-center justify-center hover:bg-slate-800 hover:text-white ${currentpage===noofpages?'bg-gray-200 text-gray-400 hover:bg-gray-200 hover:text-gray-400':null} ` } onClick={ ()=>handlenext() } ><ChevronRightIcon/></div>
            </div> : null
            }
        </div>

        <div class='bg-slate-100 rounded-lg mt-5 p-5 w-full grid grid-cols-3 gap-5 h-[60%] overflow-x-auto' > 
            
            {   
                content
            }  
        </div>

        {addmem && <Addmemmod closeaddmem={showaddmem}/>}
        {addmembership && <Addmembership closeaddmembership={showaddmembership}/>}
        <ToastContainer/>
    </div>
  )
}


export default Members