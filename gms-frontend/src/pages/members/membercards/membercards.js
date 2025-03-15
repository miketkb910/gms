import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Membercards = ({item}) => {
  
  return (
    <Link to={`/members/${item?._id}`} class='bg-white rounded-lg p-3 cursor-pointer hover:text-white hover:bg-slate-800' >
                <div class='w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full' >
                    <img alt='icon' class='rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl6VQ1CDb8f0-QVCyaXIPknZnIlQ9xz7VFw&s'/>  
                </div>
                <div class='mx-auto mt-5 text-center text-xl font-semibold font-mono'>
                    {item?.name}
                </div>
                <div class='mx-auto mt-2 text-center text-xl font-mono'>
                    {"+91 " + item?.mobile}
                </div>
                <div class='mx-auto mt-2 text-center text-xl font-mono'>
                Next bill date: {item?.nextbilldate.slice(0,10).split('-').reverse().join('-')}
                </div>
    </Link>   
  )
}

export default Membercards