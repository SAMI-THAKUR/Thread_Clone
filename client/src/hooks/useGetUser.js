import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import axios from "axios";

const useGetUserProfile = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`https://thread-clone-pi-gules.vercel.app/user/profile/${props}`, {
          withCredentials: true,
        });
        let data = res.data;
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
  }, [props, showToast]);

  return { loading, user };
};

export default useGetUserProfile;
