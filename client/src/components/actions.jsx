import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { setPost } from "../feature/Post";

export default function Action(props) {
  const toast = useToast();
  const { id, liked } = props;
  const [like, setLike] = useState(liked);
  const posts = useSelector((state) => state.post).post;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user).user;
  const likePost = async () => {
    try {
      const res = await axios.post(
        `/api/post/like/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      const data = res.data;
      if (data.error) {
        toast({
          title: "Error",
          description: "Error is liking this Post",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        if (liked) {
          const updatedPosts = posts.map((p) => {
            if (p._id === id) {
              return { ...p, likes: p.likes.filter((id) => id !== user._id) };
            }
            return p;
          });
          dispatch(setPost(updatedPosts));
        } else {
          const updatedPosts = posts.map((p) => {
            if (p._id === id) {
              return { ...p, likes: [...p.likes, user._id] };
            }
            return p;
          });
          dispatch(setPost(updatedPosts));
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error is liking this Post",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  // Include 'id' and 'liked' as dependencies
  return (
    <div className="flex justify-start mb-5">
      <div className="flex items-center -ml-3">
        <div className="flex-1 text-center">
          <button
            href="#"
            className="mt-1 group flex items-center p-1.5   rounded-full hover:bg-red-700 hover:text-red-300 duration-200"
            onClick={() => {
              likePost();
              setLike(!like);
            }}
          >
            {like ? (
              <Icon icon="icon-park-solid:like" className="text-xl text-red-600  group-hover:text-red-300" />
            ) : (
              <Icon icon="icon-park-outline:like" className="text-xl text-gray-500  group-hover:text-red-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
