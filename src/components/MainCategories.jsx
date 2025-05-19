import React from 'react'
import { Link } from 'react-router-dom'
import {BiSearchAlt } from "react-icons/bi";
import Search from './Search';


const MainCategories = () => {
  return <>
  
  <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
    {/* Links */}
    <div className='flex-1 flex items-center justify-center flex-wrap'> 
         <Link to="/blogs" className='bg-blue-800 text-white rounded-full px-4 py-2'> All Posts</Link>
         <Link to="/blogs?category=web-design" className='hover:bg-blue-50  rounded-full px-4 py-2'> Web Design</Link>
         <Link to="/blogs?category=development" className='hover:bg-blue-50  rounded-full px-4 py-2'> Development</Link>
         <Link to="/blogs?category=databases" className='hover:bg-blue-50  rounded-full px-4 py-2'> Database</Link>
         <Link to="/blogs?category=seo" className='hover:bg-blue-50 rounded-full px-4 py-2'> Search Engines</Link>
         <Link to="/blogs?category=marketing" className='hover:bg-blue-50 rounded-full px-4 py-2'> Marketing</Link>
    </div>
    <span className='text-xl font-medium'>|</span>
    {/* search */}
    <Search/>
  </div>
  
  </>
}

export default MainCategories