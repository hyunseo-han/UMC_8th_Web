import React from "react";
import "./App.css";
import ButtonGroup from "./components/ButtonGroup";
import { useCount } from "./context/CounterProvider";

function App() {
  const { count, handleIncrement, handleDecrement } = useCount();

  return (
    <>
      <h1>{count}</h1>
      <ButtonGroup
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </>
  );
}

export default App;

// const nickname = "헤일리";
//   const sweetPotato = "고구마";
//   const array = [
//     { name: "헤일리", tech: "REACT", food: "녹차" },
//     { name: "율무", tech: "REACT", food: "율무차" },
//     { name: "박창섭", tech: "", food: "커피" },
//   ];
//   return (
//     <>
//       <strong className="school">동덕여자대학교</strong>
//       <p style={{ color: "purple", fontWeight: "bold", fontSize: "3rem" }}>
//         {nickname}/한현서
//       </p>
//       <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
//       <ul>
//         {array.map((item, idx) => (
//           // <li key={idx}>{yaho}</li>
//           <List key={idx} name={item.name} tech={item.tech} food={item.food} />
//         ))}
//       </ul>
//     </>
//   );

// const [count, setCount] = useState(0);
//   const handleIncreaseNumber = () => {
//     setCount((prev) => prev + 1);
//     setCount((prev) => prev + 1);
//     setCount((prev) => prev + 1);
//     setCount((prev) => prev + 1);
//     setCount((prev) => prev + 1);
//     setCount((prev) => prev + 1);
//   };
//   return (
//     <>
//       <h1>{count}</h1>
//       <button onClick={handleIncreaseNumber}>숫자 증가</button>
//     </>
//   );

// // 초기 상태로 '김용민', 26, '매튜'를 가진 person 객체를 초기값으로 생성합니다.
// const [person, setPerson] = useState({
//   name: "한현서",
//   age: 25,
//   nickname: "헤일리",
//   // city가 들어갈 자리를 미리 만들어놔야한다.
//   // 그래야 person에서 city라는 값이 있다고 타입이 추론이 됩니다.
//   city: "",
// });

// // city 값을 새로 추가하여 업데이트하는 함수
// const updateCity = () => {
//   setPerson((prevPerson) => ({
//     ...prevPerson, // 이전 person 객체의 복사본 생성
//     city: "서울", // 새로 city 값을 추가하거나 업데이트
//   }));
// };

// // age 값을 1씩 증가시키는 함수
// const increaseAge = () => {
//   setPerson((prevPerson) => ({
//     ...prevPerson, // 이전 person 객체의 복사본을 생성합니다.
//     age: prevPerson.age + 1, // 다른 key의 value는 유지, age 값을 기존 값에서 1 증가
//   }));
// };

// return (
//   <>
//     <h1>이름: {person.name}</h1>
//     <h2>나이: {person.age}</h2>
//     <h3>닉네임: {person.nickname}</h3>
//     {person.city && <h4>도시: {person.city}</h4>}
//     <button onClick={updateCity}>도시 추가</button>
//     <button onClick={increaseAge}>나이 증가</button>
//   </>
// );
