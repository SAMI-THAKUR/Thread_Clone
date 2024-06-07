import { UserHeader, Tweet } from "../components/components";
import useGetUserProfile from "../hooks/useGetUser";
import { useParams } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../feature/Post";

export default function UserPage() {
  const { username } = useParams();
  const { user, loading } = useGetUserProfile(username);
  const post = useSelector((state) => state.post).post;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (user?._id) {
          const res = await axios.get(`https://thread-clone-pi-gules.vercel.app/post/user/${user["_id"]}`);
          dispatch(setPost(null));
          dispatch(setPost(res.data.posts));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserPosts();
  }, [user, setPost]);
  if (username === "undefined") return <h1 style={{ height: "100%" }}>User not found</h1>;
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!user && !loading) return <h1 style={{ height: "100%" }}>User not found</h1>;
  return (
    <div className="pb-20 w-screen mx-5 mt-10 h-full" style={{ height: "100%" }}>
      <UserHeader user={user} />
      <div className="w-full mt-10">
        {post.map((post, idx) => (
          <Tweet post={post} key={idx} />
        ))}
      </div>
    </div>
  );
}
