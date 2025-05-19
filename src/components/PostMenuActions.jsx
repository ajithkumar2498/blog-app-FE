import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosService from "../utils/AxiosService";

const PostMenuActions = ({ post }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user = useSelector((state) => state.auth.user);
  const token = user?.token;

  const isAuthor = user?.name === post?.author;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return AxiosService.delete(`/blogs/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      queryClient.invalidateQueries(["posts"]); // Invalidate if you use posts list
      navigate("/");
    },
    onError: (error) => {
      console.error("Delete Error:", error?.response?.data || error.message);
      toast.error(error?.response?.data || "Failed to delete post");
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate();
    }
  };

  const handleUpdate = () => {
    navigate(`/edit-blog/${post._id}`);
  };

  if (!isAuthor) return null;

  return (
    <div className="mt-4">
      <h1>Actions</h1>

      <div
        onClick={handleDelete}
        className="flex items-center gap-2 py-2 text-sm cursor-pointer"
      >
        <RiDeleteBin6Line className="text-red-600" />
        <span className="text-red-600">Delete this post</span>
        {deleteMutation.isPending && (
          <span className="text-xs">(deleting...)</span>
        )}
      </div>

      <button
        onClick={handleUpdate}
        className="flex items-center gap-2 py-2 text-sm cursor-pointer"
      >
        <FaRegEdit className="text-blue-800" />
        <span className="text-blue-800">Update post</span>
      </button>
    </div>
  );
};

export default PostMenuActions;
