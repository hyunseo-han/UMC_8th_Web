import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col bg-[#161616]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="text-white">footer</footer>
    </div>
  );
};

export default HomeLayout;
