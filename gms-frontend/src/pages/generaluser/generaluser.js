import React,{useState,useEffect} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom'
import Membercards from '../members/membercards/membercards';
import { getmonthlyjoined,expiringwithin3days,expired,inactive } from './data';


const Generaluser = () => {
    const [header,setheader] = useState("");
    const [data,setdata] = useState([]);

    useEffect(() => {
        const func = sessionStorage.getItem('func');
        functioncall(func);
    }, []);
 
    const functioncall = async(func) => {
        switch (func) {

            case "monthlyjoined":
                setheader("Monthly Joined Members");
                var datas = await getmonthlyjoined();
                setdata(datas.members);
                break;

            case "3daysexpire":
                setheader("Expiring in 3 days Members");
                var datas = await expiringwithin3days();
                setdata(datas.members);
                break;
                
            case "expired":
                setheader("Expired Members");
                var datas = await expired();
                setdata(datas.members);
                break;

            case "inactive":
                setheader("Inactive Members");
                var datas = await inactive();
                setdata(datas.members);
                break;

        }
    }

  return (
    <div class='w-3/4 flex-col p-5 text-black' >
        <div  class='w-full bg-slate-800 text-white rounded-lg flex p-3 justify-between items-center border-2'>
            <Link to='/dashboard' class='px-3 py-1 border-2 rounded-2xl cursor-pointer hover:bg-white hover:text-black flex' >
                <div><ArrowBackIcon/></div>
                <div>Back to dashboard</div>
            </Link>
        </div>
        <div class='mt-5 text-xl text-slate-800'>   
            {header}
        </div>
        <div class='bg-slate-100 rounded-lg mt-5 p-5 w-full grid grid-cols-3 gap-2 h-[75%] overflow-x-auto' >
            {
                data.map((item,index)=>{
                    return (
                        <Membercards item={item} />
                    );
                })
            }
        </div>
    </div>
  )
}

export default Generaluser