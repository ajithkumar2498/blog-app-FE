import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import Image from './Image';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
// import {SignedIn, SignedOut, SignInButton, useAuth, UserButton} from "@clerk/clerk-react"

const Navbar = () => {
  const [open,setOpen] = useState(false)


   const nav = useNavigate()

   
   const  user  = useSelector((state) => state.auth);

   const handleLogout = ()=> {
    sessionStorage.removeItem("userInfo")
    nav("/login")
    toast.success("logged out Successful")
   }

  // var user = sessionStorage.getItem("userInfo")

  // user = JSON.parse(user)

  useEffect(()=>{
    if(!user){
      nav("/login")
    }
  },[user])

  return <>
  <div className='w-full h-16 md:h-20 flex items-center justify-between'>
  
    {/* Logo */}
    <Link to={"/"} className='flex items-center gap-1 text-2xl font-bold'>
         <Image src="logo.jpg" alt="blog Logo" w={56} h={42} className="mix-blend-multiply"/>
        <span>blogify</span>
    </Link>
    {/* Mobile Menu */}
    <div className='md:hidden'>
      {/* Mobile Button */}
      <div className='cursor-pointer' onClick={()=> setOpen((prev)=>  !prev)}>
        {open ? <MdClose /> : <GiHamburgerMenu />}
      </div>
        {/* Mobile Link List */}
      <div className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${open ? "-right-0" : "-right-100"}`}>
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/write">Add Blog</Link>
           {/* <p >{user}</p> */}
            <button className='flex py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-400 hover:text-blue-950'>Logout <span className='font-xl pt-1'><IoLogOut /></span> </button>
      </div>
    </div>
   
    {/* desktop menu */}
    <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
      <Link to="/">Home</Link>
      <Link to="/">Trending</Link>
      <Link to="/">Most Popular</Link>
      <Link to="/write">Add Blog</Link>  
       {/* <p >{user}</p>    */}
        <button onClick={handleLogout} className='flex py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-400 hover:text-blue-950'>Logout <span className='font-xl pt-1'><IoLogOut /></span> </button>        
    </div>
  </div>

  </>
}

export default Navbar