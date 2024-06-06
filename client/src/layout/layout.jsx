import { Outlet } from "react-router-dom";
import Header from "./header";
import { getUserProfile } from "../feature/User";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Spinner, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  return (
    <main className="flex gap-10 w-screen bg-bg dark:bg-darkbg">
      <Header />
      <Outlet />
    </main>
  );
}

export default Layout;
