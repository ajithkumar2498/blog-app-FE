import React from 'react'
import { Link } from 'react-router-dom'
import Image from './Image'
import { format } from 'timeago.js'


const PostListItem = ({post}) => {

 
  return <>
  
    <div className='flex flex-col xl:flex-row gap-8 mb-8'>
           {/* Image */}
           {post.img &&  <div className='md:hidden xl:block xl:w-1/3'>
                <Image src={post.img} className="rounded-2xl object-cover" w="735"/>
           </div>}
           {/* Details */}
           <div className="flex flex-col gap-4 xl:w-2/3">
             <Link to={`/blog/${post._id}`} className="text-4xl font-semibold">
             {post.title}
             </Link>
             <div className='flex items-center gap-2 text-gray-400 text-sm'>
                <span>Written By</span>
                <Link className="text-blue-800" to={`/blogss?author=${post.author}`}>{post.author || "Unknown Author"}</Link>
                <span>on</span>
                <Link className="text-blue-800">{post.category}</Link>
                <span>{format(post.createdAt)}</span>
             </div>
                <p>
                {
                  post.desc
                }
                </p>
                <Link to={`/blog/${post._id}`} className='underline text-blue-800 text-sm'>
                Read More
                </Link>
           </div>
          
    </div>

  </>
}

export default PostListItem