import React, { useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';


const Search = () => {

  const location = useLocation();
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState('');


  const handleKeyPress = (e)=>{
     if (e.key === "Enter" && query.trim() !== "") {
    const newParams = {
      ...Object.fromEntries(searchParams),
      search: query.trim(), 
    };

    if (location.pathname === "/blogs") {
      setSearchParams(newParams);
    } else {
      nav(`/blogs?category=${query.trim()}`);
    }
  }
  }
  return <>
       <div className="bg-gray-100 p-2 rounded-xl flex items-center gap-2">
      <LuSearch />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  </>
}

export default Search