import axios, { AxiosInstance } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL, // vite 환경변수를 통해 백엔드 주소 주입
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem(
  //     LOCAL_STORAGE_KEY.accessToken
  //   )}`,
  // },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

  // 회원가입, 로그인 요청일 땐 Authorization 헤더 생략
  const isAuthEndpoint =
    config.url?.includes("/auth/signup") ||
    config.url?.includes("/auth/signin");

  if (token && !isAuthEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
