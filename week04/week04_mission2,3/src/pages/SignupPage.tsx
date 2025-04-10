import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ResponseSignupDto } from "../types/auth";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상입니다." })
      .max(20, { message: "비밀번호는 최대 20자 이하입니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상입니다." })
      .max(20, { message: "비밀번호는 최대 20자 이하입니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const emailValue = watch("email");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // eslint-disable-next-line
    const { passwordCheck, ...rest } = data;
    const response: ResponseSignupDto = await postSignup(rest);
    console.log(response);
  };

  const handleNext = async () => {
    const valid = await trigger(
      step === 1 ? "email" : step === 2 ? ["password", "passwordCheck"] : "name"
    );
    if (valid) setStep((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
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
          <h1 className="text-xl font-bold text-white">회원가입</h1>
        </div>

        {step === 1 && (
          <>
            <input
              {...register("email")}
              name="email"
              type="email"
              className={`border w-[300px] p-[10px] focus:outline-pink-500 rounded-sm focus:outline-2 placeholder-gray-200 text-white`}
              placeholder="이메일을 입력해주세요!"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={
                !emailValue || !!errors.email // 이메일이 없거나, 오류가 있을 경우 비활성화
              }
              className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-bold hover:bg-pink-700 disabled:bg-gray-700"
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-white text-sm mb-1">
              ✉ <span className="font-semibold">{getValues("email")}</span>
            </div>
            <div className="relative w-[300px]">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className={`border w-full p-[10px] pr-10 focus:outline-pink-500 rounded-sm focus:outline-2 placeholder-gray-200 text-white`}
                placeholder="비밀번호"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 rounded-xl"
              >
                {showPassword ? (
                  <img src="https://icons.veryicon.com/png/128/miscellaneous/b2-icon/eye-open-15.png" />
                ) : (
                  <img src="https://icons.veryicon.com/png/128/miscellaneous/common-icons-25/eyes-close-your-eyes.png" />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm">
                {errors.password.message}
              </div>
            )}

            <div className="relative w-[300px]">
              <input
                {...register("passwordCheck")}
                type={showPasswordCheck ? "text" : "password"}
                className={`border w-full p-[10px] pr-10 focus:outline-pink-500 rounded-sm focus:outline-2 placeholder-gray-200 text-white `}
                placeholder="비밀번호 확인"
              />
              <button
                type="button"
                onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 rounded-xl"
              >
                {showPasswordCheck ? (
                  <img src="https://icons.veryicon.com/png/128/miscellaneous/b2-icon/eye-open-15.png" />
                ) : (
                  <img src="https://icons.veryicon.com/png/128/miscellaneous/common-icons-25/eyes-close-your-eyes.png" />
                )}
              </button>
            </div>

            {errors.passwordCheck && (
              <div className="text-red-500 text-sm">
                {errors.passwordCheck.message}
              </div>
            )}
            <button
              type="button"
              disabled={!!errors.password || !!errors.passwordCheck}
              onClick={handleNext}
              className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-bold hover:bg-pink-700 disabled:bg-gray-700"
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <>
            {/* 프로필 이미지 */}
            <div className="w-[120px] h-[120px] rounded-full bg-gray-300 overflow-hidden mx-auto mb-4">
              <img
                src="https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"
                alt="기본 프로필 이미지"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 닉네임 입력 */}
            <input
              {...register("name")}
              name="name"
              type="text"
              className={`border w-[300px] p-[10px] focus:outline-pink-500 rounded-sm focus:outline-2 placeholder-gray-200 text-white ${
                errors.name
                  ? "border-red-500 bg-red-200 text-black"
                  : "border-gray-200"
              }`}
              placeholder="이름"
            />
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name.message}</div>
            )}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-bold hover:bg-pink-700 transition-colors disabled:bg-gray-700"
            >
              회원가입 완료
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
