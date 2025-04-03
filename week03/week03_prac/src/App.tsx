import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//1. 만든 페이지들을 import
import HomePage from "./pages/Home";
import NotFound from "./pages/Not-found";
import Movies from "./pages/Movies";
import RootLayout from "./layout/Root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <HomePage />,
    element: <RootLayout />,
    errorElement: <NotFound />,
    // 1. Nacbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
    children: [
      {
        // 2. index: true는 위의 path: '/' 홈 경로를 의미한다.
        index: true,
        element: <HomePage />,
      },
      {
        // 3. 부모의 path가 '/' 이나 /를 붙이지 않아도 /movies랑 동일하게 동작한다.
        // Dynamic Routing /을 활용해서 동적으로 바뀌는 부분의 이름을 정의해준다
        // /: 뒤에 설정한 이름으로, 우리가 해당하는 params의 값을 받아올 수 있다
        path: "movies/:movieId",
        element: <Movies />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
