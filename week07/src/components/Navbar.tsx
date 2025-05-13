import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ResponseMyInfoDto } from "../types/auth";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { accessToken, logout } = useAuth();

  const [user, setUser] = useState<ResponseMyInfoDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        const res = await getMyInfo();
        setUser(res);
      }
    };
    fetchData();
  }, [accessToken]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-5 py-3 h-15 bg-[#212121]">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-white text-3xl hover:cursor-pointer"
        >
          ≡
        </button>
        <button
          onClick={() => navigate("")}
          className="text-2xl font-bold text-pink-600 cursor-pointer "
        >
          돌려돌려돌림판
        </button>
      </div>
      <div className="flex gap-3">
        <button className="py-2 hover:cursor-pointer">
          <img
            src="https://www.citypng.com/public/uploads/preview/white-search-icon-button-png-img-735811696240431a0p3ex0i2v.png"
            alt="검색"
            className="w-5 h-5 inline-block mr-2"
          />
        </button>
        {!accessToken && (
          <>
            <button
              onClick={() => navigate("login")}
              className="px-4 py-2 hover:bg-pink-500 text-white bg-gray-700 rounded-md cursor-pointer"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("signup")}
              className="px-4 py-2 hover:bg-pink-500 text-white bg-gray-700 rounded-md cursor-pointer"
            >
              회원가입
            </button>
          </>
        )}

        {accessToken && (
          <>
            <p className="pt-2 pr-2 text-white">
              {user?.data.name}님 반갑습니다.
            </p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-500 text-white bg-[#212121] rounded-md cursor-pointer"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
