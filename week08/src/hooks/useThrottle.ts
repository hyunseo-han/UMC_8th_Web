// // 주어진 값(상태)가 자주 변경될 때
// // 최소 간격으로만 업데이트 해서 성능을 개선한다.

// import { useEffect, useRef, useState } from "react";

// function useThrottle<T>(value: T, delay = 500): T {
//   // throttledValue: 실제로 바깥에 변환할 thrittled된 상태값
//   const [throttledValue, setThrottledValue] = useState<T>(value);

//   // lastExececuted: 마지막으로 setThrottledValue가 실행된 시점
//   const lastExcecuted = useRef<number>(Date.now());

//   useEffect(() => {
//     // 만약 현재 시간이 마지막 실행 시점보다 delay 이후라면 즉시 갱신
//     if (Date.now() >= lastExcecuted.current + delay) {
//       lastExcecuted.current = Date.now(); // 마지막 실행 시간 업데이트
//       setThrottledValue(value); // 즉시 상태 업데이트
//     } else {
//       // 아직 delay가 지나지 않았다면 delay 후에 강제로 업데이트 예정
//       const timerId: number = setTimeout(() => {
//         lastExcecuted.current = Date.now(); // 타이머 실행 시점으로 갱신
//         setThrottledValue(value); // 상태값 업데이트
//       }, delay);

//       // value가 바뀔 때마다 기존 타이머 제거 (최신 값만 반영)
//       return () => clearTimeout(timerId);
//     }
//   }, [value, delay]); // value나 delay가 바뀔 때마다 effect 재실행

//   return throttledValue; // throttled된 값을 반환
// }

// export default useThrottle;

import { useRef } from "react";

/**
 * 전달된 함수를 쓰로틀링하여 일정 시간(delay)마다 한 번만 실행되도록 함
 */
function useThrottle(callback: () => void, delay = 500): () => void {
  const lastExecuted = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  return () => {
    const now = Date.now();

    if (now - lastExecuted.current >= delay) {
      lastExecuted.current = now;
      callback();
    } else {
      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        lastExecuted.current = Date.now();
        callback();
      }, delay - (now - lastExecuted.current));
    }
  };
}

export default useThrottle;
