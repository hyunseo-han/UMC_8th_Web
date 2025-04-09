import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
}
function useCustomFetch<T>(url: string): ApiResponse<T> {
  //custom한 hook이라 영화 말고도 넒게 사용 가능해서 data로 이름 바꿔줌
  const [data, setData] = useState<T | null>(null); //null로 해줌
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true); // 처음엔 true

      try {
        const { data } = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(data);
      } catch {
        setIsError(true); // 에러 메시지를 받고싶으면 type을 boolean이 아니라 string으로 하면 됨
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, isError };
}

export default useCustomFetch;
