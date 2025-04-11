import {
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth";
import { axiosInstance } from "./axios";

export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);

  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  return data;
};

// export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
//   const { data } = await axiosInstance.get("/v1/users/me");

//   return data;
// };

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const token = localStorage.getItem("accessToken");
  console.log("꺼낸 토큰:", token); // 이게 null, undefined, 혹은 "undefined"면 문제

  const { data } = await axiosInstance.get("/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// 회원 인증 관련 API 모음. 기본 인스턴스를 이용하면서 토큰 헤더를 붙여 요청함
