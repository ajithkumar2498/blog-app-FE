import React from "react";
import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import AxiosService from "../utils/AxiosService";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PostList = () => {
  let user = useSelector((state) => state.auth.user); 
  user=JSON.parse(user)
  const token = user?.token;
  
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchPosts = async (pageParam = 1, searchParams) => {
  const searchParamsObject = Object.fromEntries([...searchParams]);

  const res = await AxiosService.get("/blogs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: searchParamsObject, 
  });

  return res.data;
};

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length + 1 : undefined,
  });

  if (status === "loading") return "Loading...";
  if (status === "error") return "An error has occurred: " + error.message;

  const allPosts = data?.pages?.flat() || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts ...</h4>}
      endMessage={<p><b>All posts loaded...</b></p>}
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;
