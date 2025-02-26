import React from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const handlelogout = async() => {
        localStorage.clear();
        navigate('/');
    };

  return (
    <div class='w-1/4 text-white bg-slate-800 p-5 font-extralight h-[100vh]' >
        <div class='text-center font-semibold text-[20px] box-border' >
            {localStorage.getItem('gymname')}
        </div>
        <div class='mt-5 flex gap-5'>
        <div>
        <img alt='pic' class='h-[100px] w-[100px] rounded-full ' src='https://i.pinimg.com/736x/da/0a/06/da0a067786d801a98e9209e32dc18c95.jpg' />
        </div>
        <div >
        <div class='text-xl font-extralight' >Good morning</div>
        <div class='font-semibold mt-1' >Admin</div>
        </div>
        </div>

        <div class='border-t-2 border-gray-700 mt-10 py-5' >
            <Link to='/dashboard' class={`flex gap-2 font-semibold bg-slate-500 p-3 rounded-lg cursor-pointer hover:bg-white hover:text-black mt-5 ${location.pathname==="/dashboard"?'bg-white text-black':null } `}>
                <div><HomeIcon/></div>
                <div>Dashboard</div>
            </Link>

            <Link to='/members' class={`flex gap-2 font-semibold bg-slate-500 p-3 rounded-lg cursor-pointer hover:bg-white hover:text-black mt-2 ${location.pathname==="/members"?'bg-white text-black':null }`}>
                <div><PersonIcon/></div>
                <div>Members</div>
            </Link>

            <div onClick={()=> handlelogout()} class='flex gap-2 font-semibold bg-slate-500 p-3 rounded-lg cursor-pointer hover:bg-white hover:text-black mt-2'>
                <div><LogoutIcon/></div>
                <div>Logout</div>
            </div>
        </div>

    </div>
  )
}

export default Sidebar