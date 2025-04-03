import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios"; //axios import

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // 응답에 대한 타입을 정의해줍니다.
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzI2MTk1ODhiNmExNjI2Y2IzYTBkODBhMjVjYTlhMyIsIm5iZiI6MTY1MzQ5MDE5Ni44MjIsInN1YiI6IjYyOGU0MjE0ZWQyYWMyNzU4YjNjNGYwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u0glJNs86Vq2a1B_snqDMrTUS2cSDr50JQ3tKsaZmoU`,
          },
        }
      );

      setMovies(data.results);
      console.log("영화 데이터:", data.results); // 이 위치에서 출력
    };

    fetchMovies();
  }, []);

  return (
    <ul>
      {/* 옵셔널 체인 활용 */}
      {movies?.map((movie) => (
        <li key={movie.id}>
          <h1>{movie.title}</h1>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;

// 실제로 **`useParams`**를 활용하면 파라미터에 대해 받아볼 수 있습니다.
// `console.log`를 활용해서 출력값을 보면 `movieId`에 실제로 입력한 값 `123`이 출력되는 것을 확인할 수 있습니다.
// const MoviesPage = () => {
//   const params = useParams();

//   console.log(params);

//   return <h1>{params.movieId}번의 Movies Page 야호~!</h1>;
// };

// export default MoviesPage;
