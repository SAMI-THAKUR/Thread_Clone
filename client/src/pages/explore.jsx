import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

export default function Explore() {
  const [suggest, setSuggest] = useState([]);
  const user = useSelector((state) => state.user).user;
  const toast = useToast();
  useEffect(() => {
    const getSuggestion = async () => {
      try {
        const res = await axios.get("/api/user/suggested", {
          withCredentials: true,
        });
        const data = res.data;
        if (data.error) {
          toast({
            title: "Error",
            description: "Failed to get suggested users",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else {
          setSuggest(data.suggestedUsers);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to get suggested users",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    };

    getSuggestion(); // Call the getFeed function when the component mounts or when user changes
  }, [user]);
  return (
    <div className="pb-20 w-screen mx-5 mt-10 h-full" style={{ height: "100%" }}>
      <div class="flex justify-center items-center h-20 font-Konkhmer  text-head dark:text-darkhead font-semibold text-3xl tracking-widest">
        Suggested Users
      </div>
      {suggest.length === 0 && <div class="text-center text-gray-400 font-semibold text-2xl mt-20">No suggested users</div>}
      <div class="flex flex-wrap justify-center gap-5 px-5 py-10">
        {suggest.map((user, idx) => (
          <ProfileCard key={idx} user={user} />
        ))}
      </div>
    </div>
  );
}

function ProfileCard(props) {
  const { user } = props;
  return (
    <div class="text-center p-6 px-12 bg-gray-800 border-2 border-head dark:border-darkhead h-fit">
      <img src={user.profilePic} className="mx-auto rounded-full mb-5 w-20 h-20" />
      <p class="text-sm text-gray-100 font-mono">{user.username}</p>
      <div class="mt-5">
        <NavLink to={`/user/${user.username}`} className="border-2 border-white rounded-full py-2 px-3 text-xs font-semibold text-gray-100">
          View Profile
        </NavLink>
      </div>
    </div>
  );
}
