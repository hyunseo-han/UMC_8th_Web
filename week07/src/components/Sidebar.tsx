import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";
import { useState } from "react";
import { axiosInstance } from "../apis/axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handlerDeleteUser = async () => {
    try {
      await axiosInstance.delete("/v1/users");

      localStorage.clear();
      alert("탈퇴가 완료되었습니다.");
      closeModal();
      window.location.href = "/";
    } catch (e) {
      console.error(e);
    }
  };

  const profileImg =
    data?.data.avatar ||
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  return (
    <div className="w-60 h-[calc(100vh-64px)] bg-[#212121] text-white p-4 shadow-lg flex flex-col items-start">
      <button className="mb-4 hover:text-gray-500 hover:cursor-pointer">
        <img
          src="https://www.citypng.com/public/uploads/preview/white-search-icon-button-png-img-735811696240431a0p3ex0i2v.png"
          alt="검색"
          className="w-5 h-5 inline-block mr-2"
        />
        찾기
      </button>

      <button
        onClick={() => navigate("mypage")}
        className="mb-4 hover:text-gray-500 hover:cursor-pointer"
      >
        <img
          src={profileImg}
          alt="프로필"
          className="w-5 h-5 inline-block mr-2 rounded-full object-cover"
        />
        마이페이지
      </button>

      <button
        onClick={openModal}
        className="mb-4 hover:text-gray-500 hover:cursor-pointer"
      >
        탈퇴하기
      </button>
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#282A30] pb-8 pr-8 pl-8 pt-5 rounded-xl shadow-lg  w-xl max-w-md z-50"
          >
            <button
              onClick={closeModal}
              className="absolute right-10 top-4 w-6 h-6 bg-[#282A30] cursor-pointer"
            >
              X
            </button>
            <p className="text-2xl flex justify-center pt-10">
              정말 탈퇴하시겠습니까?
            </p>
            <div className="justify-items-center pt-20 px-10">
              <button
                onClick={handlerDeleteUser}
                className="w-25 h-10 rounded-xl bg-gray-400 cursor-pointer hover:bg-pink-500 mr-10"
              >
                예
              </button>
              <button
                onClick={closeModal}
                className="w-25 h-10 rounded-xl bg-pink-500 cursor-pointer ml-10"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
