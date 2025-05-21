import { useEffect, useState } from "react";

//useDebounce 커스텀 훅을 직접 만들어보았나요?
function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebouncValue] = useState<T>(value);

  //value값이나 delay값이 바뀔때 실행 되어야 함
  useEffect(() => {
    //delay 시간 후에 value를 debouncedValue로 업데이트 하는 타이머를 시작
    const handler: number = setTimeout(() => setDebouncValue(value), delay);

    //value가 바뀌면 클린업하는 함수도 제공해야 함
    //값이 계속 바뀔때마다 마지막에 멈춘 값만 업데이트
    return () => clearTimeout(handler);
  }, [value, delay]);

  //최종적으로 잠시 기다린 후의 값을 반환한다
  return debounceValue;
}

export default useDebounce;
