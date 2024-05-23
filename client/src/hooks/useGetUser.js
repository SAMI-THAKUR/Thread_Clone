import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const useGetUserProfile = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/user/profile/${props}`, {
          credentials: "include",
          withCredentials: true,
        });
        let data = await res.json();
        data = data.user;
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return { loading, user };
};

export default useGetUserProfile;
