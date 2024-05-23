import { Outlet } from "react-router-dom";
import Header from "./header";
function Layout() {
  return (
    <main className="flex w-screen bg-bg dark:bg-darkbg">
      <Header />
      <Outlet />
    </main>
  );
}

export default Layout;
