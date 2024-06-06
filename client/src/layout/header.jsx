import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { Menu, MenuButton, MenuList, MenuItem, Portal, useToast } from "@chakra-ui/react";
import axios from "axios";
import { setUser } from "../feature/User";

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();
  const user = useSelector((state) => state.user).user;
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const toast = useToast();
  console.log(user);
  const logOut = async () => {
    try {
      const res = await axios.get("https://thread-clone-pi-gules.vercel.app/auth/logout");
      const data = res.data;
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        localStorage.removeItem("user-threads");
        dispatch(setUser(null)); // Dispatch setUser action to update user state
        navigate("/");
        toast({
          title: "Logout successfully!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={toggleSidebar} className="fixed top-0 left-0 z-50 md:hidden m-5">
        <Icon icon="bi:list" className="text-[#2B2730] dark:text-[#d5d5d5] text-[40px]" />
      </button>

      <aside
        id="sidebar"
        className={`${
          isSidebarOpen ? "fixed" : "hidden"
        } z-30 top-0 left-0 h-screen md:h-100% md:overflow-hidden w-full md:w-fit md:px-5 md:sticky bg-opacity-75 bg-gray-900  md:grid`}
      >
        <div className="z-50 h-full w-[350px] px-20 overflow-hidden flex flex-col justify-between  py-4  bg-bg dark:bg-darkbg border-r-2 border-gray-700">
          <div>
            <nav className="flex align-middle justify-center pt-5">
              <button onClick={toggleTheme}>
                <Icon icon="bi:threads-fill" className="text-[#2B2730] dark:text-[#d5d5d5] text-[40px]" />
              </button>
            </nav>
            <ul className="my-20 font-medium mt-5 justify-center align-top">
              <li>
                <Link to="/" logo="bi:house-door-fill" name="Home" />
              </li>
              <li>{user && <Link to={`/user/${user.username}`} logo="solar:user-bold" name="Profile" />}</li>
              <li>{user && <Link to="/explore" logo="material-symbols:explore" name="Explore" />}</li>
              <li>{user && <Link to="/create" logo="mingcute:add-fill" name="Create" />}</li>
            </ul>
          </div>
          {user != null ? (
            <div className="flex p-5 mb-5 relative mx-auto">
              <div className="flex justify-between items-start gap-5">
                <img src={user.profilePic} className="w-12 h-12 rounded-full" alt="image description" />
                <div className="text-xl my-auto leading-snug font-semibold text-head dark:text-darkhead">{user == null ? "" : user.username}</div>
                <Menu>
                  <MenuButton className="dark:text-darktext text-text my-auto flex align-middle">
                    <Icon icon="icon-park-solid:more-two" className="my-auto text-2xl" />
                  </MenuButton>
                  <Portal>
                    <MenuList className="h=10" py="2px" px="5px">
                      <MenuItem
                        onClick={() => {
                          logOut();
                        }}
                      >
                        <div className="flex gap-4 z-50">
                          <Icon icon="solar:copy-bold" className="my-auto" />
                          <span className="font-Konkhmer">Logout</span>
                        </div>
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              </div>
            </div>
          ) : (
            <div className="mb-10 flex items-center justify-center gap-x-3">
              <NavLink className="bg-transparent p-2 rounded-lg text-bg border-2 border-bg w-28 text-center" to="/signup">
                Signup
              </NavLink>
              <NavLink className="bg-bg p-2 rounded-lg text-head w-28 text-center" to="/login">
                Log in
              </NavLink>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function Link(props) {
  const { to, logo, name } = props;
  return (
    <NavLink to={to} className="grid mx-auto p-2  rounded-lg text-text dark:text-darktext hover:bg-gray-200 dark:hover:bg-gray-700">
      <div className="flex mx-auto gap-8">
        <div className="w-5 my-auto">
          <Icon icon={logo} className="  text-xl " />
        </div>
        <div className="w-20 flex">
          <span className=" text-[22px] self-center font-robo">{name}</span>
        </div>
      </div>
    </NavLink>
  );
}
