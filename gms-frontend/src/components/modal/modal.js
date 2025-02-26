import React from 'react'
import Forgotpass from './forgotpass/forgotpass';
import ClearIcon from '@mui/icons-material/Clear';

const Modal = ({handle}) => {
  return (
    <div class=' bg-black fixed bg-opacity-50 w-full h-[100vh] text-black top-0 left-0 flex justify-center' >
        <div class='bg-white rounded-lg w-1/2 h-fit mt-32 p-5' >  
        <div class='flex justify-between'>
            <div class='text-4xl font-semibold '>Forgot password</div>
            <div onClick={() => handle()} className='cursor-pointer' ><ClearIcon sx={{ fontsize:"32px" }}/></div>
        </div>
        <Forgotpass />
        </div>
    </div>
  )
}

export default Modal