import React,{useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import ErrorIcon from '@mui/icons-material/Error';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const [smalldash,setsmalldash] = useState(false);

  const handleonclickmenu = (value) => {
    sessionStorage.setItem('func', value);
  };

  return (
    <div class='w-3/4 p-5 relative text-black' >
      <div class='w-full bg-slate-800 text-white rounded-lg flex p-3 justify-between items-center'>
        <div><MenuIcon sx={{cursor:"pointer"}} onClick={()=>{ setsmalldash(prev=>!prev) }}/></div>
        <img alt='icon' class='w-7 h-7 rounded-3xl border-2' src='https://as2.ftcdn.net/jpg/02/75/25/61/1000_F_275256130_Y3EHRz1gW1VNvcDEIhg41S968n7UGhJe.jpg'/>
      </div>

      {smalldash && <div class='absolute rounded-xl text-white bg-slate-800 font-extralight text-lg p-3' >
        <div>welcome to gym management system</div>
        <p>feel free to ask any queries</p>
      </div>}

      <div class='mt-5 pt-3 px-4 bg-blue-100 rounded-lg bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%] items-center'>

        <Link to={'/members'} class='w-full h-fit py-7 px-5 border-2 text-white flex-col justify-center items-center text-center bg-gradient-to-b from-slate-900 to-slate-100 rounded-lg cursor-pointer hover:bg-none hover:text-black' >
          <div><GroupsIcon sx={{ fontSize:'43px' }} /></div>
          <div class='text-xl font-semibold font-mono'>Joined members</div>
        </Link>

        <Link to='/specific/monthly' onClick={() => handleonclickmenu("monthlyjoined")} class='w-full h-fit py-7 px-5 border-2 text-white flex-col justify-center items-center text-center bg-gradient-to-b from-slate-900 to-slate-100 rounded-lg cursor-pointer hover:bg-none hover:text-black' >
          <div><CalendarMonthIcon sx={{ fontSize:'43px' }} /></div>
          <div class='text-xl font-semibold font-mono'>Monthly joined</div>
        </Link>

        <Link to='/specific/expiring-in-3-days' onClick={() => handleonclickmenu("3daysexpire")} class='w-full h-fit py-7 px-5 border-2 text-white flex-col justify-center items-center text-center bg-gradient-to-b from-slate-900 to-slate-100 rounded-lg cursor-pointer hover:bg-none hover:text-black' >
          <div><TimerOffIcon sx={{ fontSize:'43px' }} /></div>
          <div class='text-xl font-semibold font-mono'>Expiring in 3 days</div>
        </Link>

        <Link to='/specific/expired' onClick={() => handleonclickmenu("expired")} class='w-full h-fit py-7 px-5 border-2 text-white flex-col justify-center items-center text-center bg-gradient-to-b from-slate-900 to-slate-100 rounded-lg cursor-pointer hover:bg-none hover:text-black' >
          <div><ErrorIcon sx={{ fontSize:'43px' }} /></div>
          <div class='text-xl font-semibold font-mono'>Expired</div>
        </Link>

        <Link to='/specific/inactive' onClick={() => handleonclickmenu("inactive")} class='w-full h-fit py-7 px-5 border-2 text-white flex-col justify-center items-center text-center bg-gradient-to-b from-slate-900 to-slate-100 rounded-lg cursor-pointer hover:bg-none hover:text-black' >
          <div><ReportGmailerrorredIcon sx={{ fontSize:'43px' }} /></div>
          <div class='text-xl font-semibold font-mono'>Inactive members</div>
        </Link>

      </div >
        <ToastContainer/>
    </div>
  )
}
 
export default Dashboard