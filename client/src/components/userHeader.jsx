import { Icon } from "@iconify/react";
import { VStack, Flex, Menu, MenuButton, MenuList, MenuItem, Portal, useToast, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
const shadowStyle = {
  boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)", // Add a 1px shadow on each side
};
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import useShowToast from "../hooks/useShowToast";
import { setFollowing } from "../feature/User";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function UserHeader({ user }) {
  const store = useSelector((state) => state.user);
  const currUser = store.user;
  const [following, setFollow] = useState(currUser.following.includes(user._id));
  const dispatch = useDispatch();

  const toast = useToast();
  const copyUrl = () => {
    try {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      console.log("URL copied to clipboard");
    } catch (error) {
      console.error("Failed to copy URL to clipboard:", error);
    }
  };
  const show = useShowToast();

  const followUnfollow = async () => {
    try {
      const res = await axios.post(
        `/api/user/followUnfollow/${user._id}`,
        {},
        {
          credentials: "include",
          withCredentials: true,
        },
      );
      if (res.data.error) {
        show("Error", "Error in following the user", "error");
      } else {
        show("Success", res.data.message, "success");
        let newFollowing = [...currUser.following];
        if (following) {
          newFollowing = newFollowing.filter((id) => id !== user._id);
        } else {
          newFollowing.push(user._id);
        }
        dispatch(setFollowing(newFollowing));
        setFollow(!following);
      }
    } catch (error) {
      show("Error", "Error in following the user", "error");
    }
  };
  return (
    <div className="pt-10 h-fit w-full px-5 sm:px-10 md:px-12">
      <VStack className=" p-6" style={shadowStyle}>
        <div className="flex  justify-between w-full">
          <div className="mt-0">
            <h1 className="text-[25px] sm:text-[28px]  text-head dark:text-darkhead font-Konkhmer tracking-wide">{user.name}</h1>
            <div className="flex gap-3 h-fit self-start">
              <h1 className="text-base sm:text-lg  text-text dark:text-darktext font-mono tracking-wider">{user.username}</h1>
              {currUser.username === user.username && (
                <NavLink
                  to="/update"
                  className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-2 rounded dark:bg-blue-900 dark:text-blue-300 h-fit self-center"
                >
                  Edit Profile
                </NavLink>
              )}
              {currUser.username != user.username ? (
                following == false ? (
                  <button
                    onClick={followUnfollow}
                    className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-2 rounded dark:bg-blue-900 dark:text-blue-300 h-fit self-center"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={followUnfollow}
                    className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-2 rounded dark:bg-red-900 dark:text-red-300 h-fit self-center"
                  >
                    Unfollow
                  </button>
                )
              ) : null}
            </div>
          </div>

          <img className="rounded-full w-20 sm:w-36 h-20 sm:h-36" src={user["profilePic"]} alt="image description" />
        </div>
        <p className="mb-3 text-[13px] sm:text-[16px]  text-text dark:text-darktext mt-5 self-start">{user.bio}</p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-3">
            <h1 className="text-sm text-[#424b4b] dark:text-darktext font-mono">{user.followers.length} followers</h1>
            <h1 className="text-sm text-[#424b4b] dark:text-darktext font-mono">{user.following.length} following</h1>
          </div>

          <div className="flex gap-5 items-center">
            <a href="https://www.instagram.com/?hl=en">
              <Icon icon="skill-icons:instagram" className="text-[22px]" />
            </a>

            <Menu>
              <MenuButton className="dark:text-darktext text-text">
                <Icon icon="icon-park-solid:more-two" className="my-auto text-2xl" />
              </MenuButton>
              <Portal>
                <MenuList className="h=10" py="2px" px="5px">
                  <MenuItem
                    onClick={() => {
                      copyUrl();
                      toast({
                        title: "Copied to clipboard!",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                      });
                    }}
                  >
                    <div className="flex gap-4 ">
                      <Icon icon="solar:copy-bold" className="my-auto" />
                      <span className="font-Konkhmer">Copy</span>
                    </div>
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </div>
        </div>
      </VStack>
    </div>
  );
}

export default UserHeader;
