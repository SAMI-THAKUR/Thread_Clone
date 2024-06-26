import { Avatar, Image, WrapItem } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Action from "./actions";
import useGetUserProfile from "../hooks/useGetUser";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Tweet(props) {
  const Curruser = useSelector((state) => state.user).user;
  if (!Curruser) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  const { post } = props;
  const liked = post.likes.includes(Curruser._id);
  const { user, loading } = useGetUserProfile(post.postedBy);
  if (loading) {
    return <div>Loading...</div>;
  }
  const date = new Date(post.createdAt).toDateString().split(" ").slice(0, 3).join(" ");

  const linkify = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlPattern);

    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        return (
          <a
            key={index}
            href={part.startsWith("http") ? part : `https://${part}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300"
          >
            {part}
          </a>
        );
      } else {
        return part;
      }
    });
  };
  return (
    <div className="px-5 sm:px-10 md:px-20">
      <div className="flex flex-shrink-0  py-3 ">
        <div className="flex w-full  justify-between flex-wrap">
          <NavLink to={`/user/${user.username}`} className="flex-shrink-0 group block">
            <div className="flex items-center">
              <div>
                <WrapItem>
                  <img src={user.profilePic} className="w-8 sm:w-10 h-8 sm:h-10 rounded-full" />
                </WrapItem>
              </div>
              <div className="ml-2">
                <p className="text-base leading-6 font-medium text-head dark:text-darkhead font-Konkhmer">
                  {loading ? "Loading..." : user.username}
                  <span className="text-sm ml-3 leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                    @{loading ? "Loading..." : user.username}
                  </span>
                </p>
              </div>
            </div>
          </NavLink>
          <div className="flex w-fit gap-5 items-center justify-items-end text-gray-400 font-robo justify-between">
            <span className="text-sm">{date}</span>
            <button
              href="#"
              className="mt-1 group flex items-center text-gray-500 p-1.5   rounded-full hover:bg-slate-200 hover:text-slate-900 duration-200"
            >
              <Icon icon="ri:more-fill" className="text-sm" />
            </button>
          </div>
        </div>
      </div>
      <div className="pl-5 sm:pl-10 md:pl-16 w-full">
        <p className="text-lg  flex-shrink-[2] text-text dark:text-darktext font-robo">{linkify(post.body)}</p>
        {post.image && <img src={post.image} className="mt-5 pr-5 object-scale-down max-h-[400px] drop-shadow-md rounded-md m-auto" />}
        <Action id={post["_id"]} liked={liked} />
        <div className="flex gap-x-5 -mt-2 mb-3 text-gray-400  -ml-1 font-mono">
          <span>{post.likes.length} likes</span>
        </div>
      </div>
      <hr className="border-gray-600"></hr>
    </div>
  );
}
