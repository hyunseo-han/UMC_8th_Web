// form에 입력하는것들을 관리하는 Hook
import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T; // {email: '', passwork: '' }
  validate: (values: T) => Record<keyof T, string>;
}

// 제네릭 넘겨주고 받음
function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>(); // Record 타입:
  const [errors, setErrors] = useState<Record<string, string>>();

  // keyof T: email. password
  // 사용자가 입력값을 바꿀 때 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지 (기존 값 유지)
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 이메일 인풋, 패스워드 인풋, 속성들을 가져오는 것
  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name];

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 바뀔때마다 실행 -> useEffect
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
