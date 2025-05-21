// import { useEffect, useState } from "react";
// import useThrottle from "../hooks/useThrottle";

// const ThrottlePage = () => {
//   const [scrollY, setScrollY] = useState<number>(0);
//   const handleScroll = useThrottle(() => {
//     setScrollY(window.scrollY); //window객체에 scrollY를 줌
//   }, 2000);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   return (
//     <div className="h-dvh flex flex-col items-center justify-center">
//       <div>
//         <h1>쓰로틀링이 무엇일까요?</h1>
//         <p>scrollY: {scrollY}px</p>
//       </div>
//     </div>
//   );
// };

// export default ThrottlePage;

import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  // ✅ 스크롤 이벤트 핸들러에 쓰로틀링 적용
  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 500); // 500ms마다 최대 한 번만 실행

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="h-[3000px] flex flex-col items-center justify-center">
      <div>
        <h1>쓰로틀링이 무엇일까요?</h1>
        <p>scrollY: {scrollY}px</p>
      </div>
    </div>
  );
};

export default ThrottlePage;
