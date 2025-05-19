import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import AxiosService from '../utils/AxiosService';
import { useNavigate, useParams } from 'react-router-dom';
import UploadImages from '../components/UploadImages';
import { useSelector } from 'react-redux';

const WritePage = () => {
  const { id } = useParams(); 
  const nav = useNavigate();

  let user = useSelector((state) => state.auth.user);
  if (typeof user === "string") {
  try {
    user = JSON.parse(user);
  } catch (e) {
    console.error("Error parsing user", e);
    user = null;
  }
}

  const [value, setValue] = useState('');
  const [cover, setCover] = useState('');
  const [img, setImg] = useState('');
  const [progress, setProgress] = useState(0);
  const [initialData, setInitialData] = useState(null);


  useEffect(() => {
    if (!user) {
      toast.error('Please login to continue');
      nav('/login');
    }
  }, [user, nav]);


  const { isLoading: isPostLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await AxiosService.get(`/blogs/${id}`);
      const post = res.data;
      setInitialData(post);
      setValue(post.content);
      setCover({ filePath: post.img });
      return post;
    },
    enabled: !!id,
  });


  useEffect(() => {
    if (img) {
      setValue((prev) => prev + `<p><img src="${img.url}" alt="uploaded" /></p>`);
    }
  }, [img]);

  const createMutation = useMutation({
    mutationFn: async (newPost) =>
      AxiosService.post('/blogs/add-blog', newPost, {
        headers: { Authorization: `Bearer ${user?.token}` },
      }),
    onSuccess: () => {
      toast.success('Post created successfully!');
      nav('/');
    },
    onError: () => toast.error('Failed to create post'),
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedPost) =>
      AxiosService.put(`/blogs/update/${id}`, updatedPost, {
        headers: { Authorization: `Bearer ${user?.token}` },
      }),
    onSuccess: () => {
      toast.success('Post updated successfully!');
      nav('/');
    },
    onError: () => toast.error('Failed to update post'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      img: cover?.filePath || '',
      title: formData.get('title'),
      category: formData.get('category'),
      desc: formData.get('desc'),
      content: value,
    };

    if (id) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  if (id && isPostLoading) return <div>Loading post...</div>;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">{id ? 'Update Post' : 'Create New Post'}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <UploadImages type="image" setProgress={setProgress} setData={setCover}>
          <span className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            {cover?.filePath ? 'Change Cover Image' : 'Add a Cover Image'}
          </span>
        </UploadImages>
        <input
          type="text"
          name="title"
          className="text-4xl font-semibold bg-transparent outline-none"
          placeholder="My Awesome Story"
          defaultValue={initialData?.title || ''}
        />
        <div className="flex items-center gap-4">
          <label className="text-sm">Choose a Category:</label>
          <select
            name="category"
            className="p-2 rounded-xl bg-white shadow-md"
            defaultValue={initialData?.category || 'general'}
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          name="desc"
          placeholder="A Short Description"
          className="p-4 rounded-xl bg-white shadow-md"
          defaultValue={initialData?.desc || ''}
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 justify-center mr-2">
            <UploadImages type="image" setProgress={setProgress} setData={setImg}>
              🏞️
            </UploadImages>
            <UploadImages type="video" setProgress={setProgress}>
              ▶️
            </UploadImages>
          </div>
          <ReactQuill
            theme="snow"
            value={value}
            className="flex-1 rounded-xl bg-white shadow-md"
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          disabled={createMutation.isPending || updateMutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {createMutation.isPending || updateMutation.isPending ? 'Loading...' : id ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default WritePage;
