import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Explore() {
  const [suggest, setSuggest] = useState([]);
  const user = useSelector((state) => state.user).user;
  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(
          "https://thread-clone-6f8g.onrender.com/user/suggested",
          {},
          {
            credentials: "include",
            withCredentials: true,
          },
        );
        const data = res.data;
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.suggestedUsers);
          setSuggest(data.suggestedUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFeed(); // Call the getFeed function when the component mounts or when user changes
  }, [user]);
  return (
    <div className="h-dvh">
      <div class="flex justify-center items-center h-20 font-Konkhmer  text-head dark:text-darkhead font-semibold text-3xl tracking-widest">
        Suggested Users
      </div>
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
      <img src={user.profilePic} className="mx-auto rounded-full mb-5" />
      <p class="text-sm text-gray-100 font-mono">{user.username}</p>
      <div class="mt-5">
        <NavLink to={`/user/${user.username}`} className="border-2 border-white rounded-full py-2 px-3 text-xs font-semibold text-gray-100">
          View Profile
        </NavLink>
      </div>
    </div>
  );
}
