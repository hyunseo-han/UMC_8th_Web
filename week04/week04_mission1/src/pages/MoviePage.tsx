import { useState } from "react";
import { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

// 이 컴포넌트는 특정 카테고리(now_playing, popular, top_rated 등)의 영화 리스트를 받아와 보여주는 페이지
export default function MoviePage() {
  const [page, setPage] = useState(1); //page: 현재 페이지 번호
  const { category } = useParams<{ category: string }>(); //React Router의 useParams를 사용해 URL에 있는 category 값을 받아옴 | ex: /movie/popular → category는 "popular"
  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-EN&page=${page}`;
  const {
    data: movies,
    isPending,
    isError,
  } = useCustomFetch<MovieResponse>(url);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        {/* < 버튼은 현재 페이지가 1이면 비활성화됨 (disabled) */}
        {/* setPage로 페이지 상태를 바꾸면 useEffect가 다시 실행되어 영화 목록을 새로 가져옴 */}
        <button
          disabled={page === 1}
          className="bg-[#E52B12] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#a80c18] transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
          onClick={() => setPage((prev) => prev - 1)}
        >{`<`}</button>
        <span>{page}페이지</span>
        <button
          className="bg-[#E52B12] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#a80c18] transition-all duration-200 cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
        >{`>`}</button>
      </div>

      {/* 로딩 중일 때는 가운데 LoadingSpinner 컴포넌트를 보여줌 */}
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {/* 영화 배열을 .map()으로 돌면서 각 영화 정보를 MovieCard 컴포넌트에 넘겨줌 */}
      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
