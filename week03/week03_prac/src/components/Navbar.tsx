import { Link } from "react-router-dom";
//react-router-dom 에서 제공해주는 Link 태그를 활용하면, 원하는 경로로 페이지 이동을 할 수 있다

const Navbar = () => {
  return (
    <nav>
      <Link to={"/"}>홈 페이지로 이동</Link>
      <Link to="/movies">영화 목록 페이지로 이동</Link>
    </nav>
  );
};

export default Navbar;
