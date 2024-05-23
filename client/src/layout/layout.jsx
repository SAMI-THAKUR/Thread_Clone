import { Outlet } from "react-router-dom";
import Header from "./header";

// import { Redirect } from "react-router"; // Add this line

function Layout() {
  // if (!user) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <main className="flex w-screen bg-bg dark:bg-darkbg">
      <Header />
      <Outlet />
    </main>
  );
}

export default Layout;
