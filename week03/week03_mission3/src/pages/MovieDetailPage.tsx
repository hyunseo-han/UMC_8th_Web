import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MovieDetail, MovieCredits } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>(); // URL에 있는 movieId를 가져옴 (예: /movie/1234 → movieId = "1234")
  const [movie, setMovie] = useState<MovieDetail | null>(null); // movie: 영화 상세 정보 (MovieDetail 타입)
  const [credits, setCredits] = useState<MovieCredits | null>(null); // credits: 출연진 및 제작진 정보 (MovieCredits 타입)
  const [isLoading, setIsLoading] = useState(true); // isLoading: 로딩 중 여부
  const [isError, setIsError] = useState(false); // isError: 에러 발생 여부

  // movieId가 바뀔 때마다 실행됨
  // axios.get()을 통해 두 개의 API 요청을 동시에 실행: movieUrl: 영화 상세 정보, creditUrl: 출연진 및 제작진
  useEffect(() => {
    const fetchMovieAndCredits = async () => {
      try {
        setIsLoading(true);

        const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const creditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

        const [movieRes, creditRes] = await Promise.all([
          axios.get<MovieDetail>(movieUrl, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }),
          axios.get<MovieCredits>(creditUrl, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }),
        ]);

        setMovie(movieRes.data);
        setCredits(creditRes.data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) fetchMovieAndCredits();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !movie || !credits) {
    return (
      <div className="text-center text-red-600 text-xl mt-10">
        Failed to load movie details.
      </div>
    );
  }

  // 데이터 가공
  const director = credits.crew.find((person) => person.job === "Director"); // 감독 추출: 제작진 중 job === "Director" 인 사람
  const topCast = credits.cast.slice(0, 5); // 주요 배우: cast 리스트에서 상위 5명만 추출
  const fallbackImg = "https://via.placeholder.com/185x278?text=No+Image"; // 이미지 경로가 없다면 기본 이미지(fallbackImg) 사용

  const getProfileUrl = (path: string | null) =>
    path ? `https://image.tmdb.org/t/p/w185${path}` : fallbackImg;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-500 italic">{movie.tagline}</p>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} min
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)} (
            {movie.vote_count} votes)
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
            {/* 장르 리스트는 join(", ")으로 문자열 변환 */}
          </p>

          {/* 감독 정보 */}
          {director && (
            <div>
              <h2 className="text-xl font-semibold mt-6 mb-2">Director</h2>
              <div className="flex items-center gap-4">
                <img
                  src={getProfileUrl(director.profile_path)}
                  alt={director.name}
                  className="w-20 h-28 rounded-md object-cover shadow"
                />
                <span className="text-lg">{director.name}</span>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mt-6 mb-2">Top Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {/* 출연 배우 리스트 */}
              {topCast.map((actor) => (
                <div key={actor.cast_id} className="text-center">
                  <img
                    src={getProfileUrl(actor.profile_path)}
                    alt={actor.name}
                    className="w-full h-40 object-cover rounded-md shadow"
                  />
                  <p className="font-semibold mt-2">{actor.name}</p>
                  <p className="text-sm text-gray-500">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
