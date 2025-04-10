import { UserSigninInformation, validateSignin } from "../utils/validate";
import useForm from "../hooks/useForm";
import { postSignin } from "../apis/auth";
import { ResponseSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  // api 통신
  const handleSubmit = async () => {
    console.log(values);
    try {
      const response: ResponseSigninDto = await postSignin(values);
      setItem(response.data.accessToken);
    } catch (error) {
      alert(error);
    }
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 ">
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center justify-center py-2">
          {/* 뒤로가기 버튼: 왼쪽에 고정 */}
          <button
            className="absolute left-4 text-white text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img
              src="https://icon-library.com/images/ios-back-icon/ios-back-icon-10.jpg"
              alt="뒤로가기"
              className="w-6 h-6"
            />
          </button>
          <h1 className="text-xl font-bold text-white">로그인</h1>
        </div>
        <input
          {...getInputProps("email")}
          name="email"
          type={"email"}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:outline-pink-500 rounded-sm focus:outline-2 placeholder-gray-200 text-white `}
          placeholder="이메일을 입력해주세요"
        />
        {/* 새로고침 했을 때 경고 문구 안 보이게  */}
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          type={"password"}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:outline-pink-500 rounded-sm focus:outline-2 placeholder-gray-200 text-white `}
          placeholder="비밀번호를 입력해주세요"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-bold hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-700 "
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
