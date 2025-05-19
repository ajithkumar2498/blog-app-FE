import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { FaBookmark, FaRegBookmark, FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import AxiosService from '../utils/AxiosService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const PostMenuActions = ({post}) => {
 
  
  const navigate = useNavigate()
   let user = useSelector((state) => state.auth.user); 
   if (typeof user === "string") {
  try {
    user = JSON.parse(user);
  } catch (e) {
    console.error("Error parsing user", e);
    user = null;
  }
}
  let token = user?.token;
   const isAuthor = user.name === post.author

  const deleteMutation = useMutation({
    mutationFn: async ()=>{
     
      return AxiosService.delete(`/blogs/${post._id}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
    },
    onSuccess: ()=>{
      toast.success("post deleted successfully!")
      navigate("/")
    },
    onError: (error)=>{
      console.log(error.response.data)
      toast.error(error.response.data)
    }
  })


  const handleDelete = ()=>{
    deleteMutation.mutate()
    toast.success("post deleted successfully")
    navigate("/")
    
  }
  
  const handleUpdate = ()=>{
      navigate(`/edit-blog/${post._id}`);
  }
  if (!isAuthor) return null
  return <>
  
   <div className="mt-4">
       <h1>Actions</h1>
       
        <div 
          onClick={handleDelete}
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"  >
          <RiDeleteBin6Line className='text-red-600'/>
          <span className='text-red-600'>Delete this post</span>
        {
          deleteMutation.isPending && <span className='text-xs'>(in progress)</span>
        }
        </div>
        <button 
          onClick={handleUpdate}
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"  >
          <FaRegEdit className='text-blue-800'/>
          <span className='text-blue-800'>update post</span>
        </button>

   </div>
  </>
}

export default PostMenuActions