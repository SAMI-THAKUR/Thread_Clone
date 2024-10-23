import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Tweet } from "../components/components";
import { setPost } from "../feature/Post";
import { useToast } from "@chakra-ui/react";

const api = axios.create({
  withCredentials: true,
});

function HomePage() {
  const user = useSelector((state) => state.user).user;
  const post = useSelector((state) => state.post).post;
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await api.get("/api/post/getfeed");
        const data = res.data;
        if (data.error) {
          toast({
            title: "Error",
            description: "Failed to get feed",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else {
          dispatch(setPost(null));
          dispatch(setPost(data));
        }
      } catch (error) {}
    };
    getFeed(); // Call the getFeed function when the component mounts or when user changes
  }, [dispatch]);

  if (!user) {
    return <div class="text-center text-gray-400 font-semibold text-2xl mt-20">Please login to view feed</div>;
  }
  return (
    <div className="z-0 pb-20 w-full mt-10 h-[10000px]" style={{ height: "100%" }}>
      {post.map((post, idx) => (
        <Tweet post={post} key={idx} />
      ))}
    </div>
  );
}

export default HomePage;
