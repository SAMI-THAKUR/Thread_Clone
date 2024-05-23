import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Tweet } from "../components/components";
import { setPost } from "../feature/Post";

function HomePage() {
  const user = useSelector((state) => state.user).user;
  const post = useSelector((state) => state.post).post;
  const dispatch = useDispatch();
  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get("http://localhost:5000/post/getfeed", {
          credentials: "include",
          withCredentials: true,
        });
        const data = res.data;
        if (data.error) {
          console.log(data.error);
        } else {
          dispatch(setPost(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFeed(); // Call the getFeed function when the component mounts or when user changes
  }, [user, setPost]);
  if (user === null) return <div className="w-full h-full flex items-center justify-center text-yellow-50">Please login to view your feed</div>;
  return (
    <div className="w-fit mt-10 h-[100vh]">
      <div className="w-full">
        {post.map((post, idx) => (
          <Tweet post={post} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
