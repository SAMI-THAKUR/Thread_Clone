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
  const store = useSelector((state) => state.user);
  if (store.loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  return (
    <main className="flex overflow-x-hidden w-screen bg-bg dark:bg-darkbg" style={{ height: "100vh" }}>
      <Header />
      <Outlet />
    </main>
  );
}

export default Layout;
