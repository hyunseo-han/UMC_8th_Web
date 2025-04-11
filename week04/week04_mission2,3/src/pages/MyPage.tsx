import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log("유저 정보:", response); // 콘솔에도 확인
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="text-white">환영합니다, {name}님!</div>
      <div className="text-white">
        {name}님의 이메일은 {email}입니다.
      </div>
    </>
  );
};

export default MyPage;
