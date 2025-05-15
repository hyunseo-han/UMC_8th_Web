import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../components/CommentCard/CommentList";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import "../App.css";
import { FaHeart } from "react-icons/fa";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import { useEffect, useState } from "react";

const LpDetailPage = () => {
  const navigate = useNavigate();
  const { lpId } = useParams();
  const numericLpId = Number(lpId);

  if (!lpId || isNaN(numericLpId)) {
    return (
      <div className="text-red-500 text-center mt-10">
        잘못된 접근입니다. URL을 확인해주세요.
      </div>
    );
  }
  const { accessToken } = useAuth();

  const { data: lp, isError } = useGetLpDetail({ lpId: Number(lpId) });
  const { data: me } = useGetMyInfo(accessToken);

  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();
  const { mutate: updateLp } = useUpdateLp();
  const { mutate: deleteLp } = useDeleteLp();

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const DEFAULT_THUMBNAIL =
    "https://media.istockphoto.com/id/1408806884/photo/12-inch-vinyl-lp-record-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=RF9dJiOjNmu4pmLSnNWITncbOspZ7BYvTyAQis_OK1U=";

  useEffect(() => {
    if (lp?.data) {
      setTitle(lp.data.title);
      setContent(lp.data.content);
      setThumbnail(lp.data.thumbnail);
    }
  }, [lp]);
  const isLiked = lp?.data.likes
    .map((like) => like.userId)
    .includes(me?.data.id as number);

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLp = () => {
    dislikeMutate({ lpId: Number(lpId) });
  };

  const handleUpdate = () => {
    console.log("📸 업로드된 썸네일:", thumbnail); //base64인지, URL인지 확인

    updateLp({
      lpId: Number(lpId),
      title,
      content,
      thumbnail,
    });
    setEditMode(false);
  };

  const handleDelete = () => {
    if (confirm("정말로 이 LP를 삭제하시겠습니까?")) {
      deleteLp(Number(lpId));
    }
  };

  if (isError || !lp) {
    return <div className="text-red-500 text-center mt-10">Error Occurred</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 py-8 text-white bg-[#212121] rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          이전
        </button>
        <div className="flex items-center gap-3 text-gray-300 text-sm">
          <span>
            {formatDistanceToNow(new Date(lp.data.createdAt), {
              addSuffix: true,
              locale: ko,
            })}
          </span>
          {/* <button title="edit">수정</button>
          <button title="delete">삭제</button> */}
          {me?.data.id === lp.data.authorId && (
            <>
              {editMode ? (
                <>
                  <button onClick={handleUpdate} className="cursor-pointer">
                    저장
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="cursor-pointer"
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    className="cursor-pointer"
                  >
                    수정
                  </button>
                  <button onClick={handleDelete} className="cursor-pointer">
                    삭제
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* 제목 */}
      {editMode ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold bg-[#202024] p-2 rounded w-4/5 text-white mx-auto block text-center"
        />
      ) : (
        <h2 className="text-2xl font-bold text-center mb-4">{lp.data.title}</h2>
      )}

      {editMode ? (
        <label
          htmlFor="thumbnail-upload"
          className="cursor-pointer block mx-auto text-center"
        >
          <img
            src={thumbnail || DEFAULT_THUMBNAIL}
            alt="썸네일"
            className="w-64 h-64 object-cover mx-auto rounded-full shadow-lg mb-4 spin-lp"
          />
          <input
            id="thumbnail-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("file", file);

              const rawToken = localStorage.getItem("accessToken");
              const token = rawToken?.replace(/^"|"$/g, "");

              const uploadUrl = token
                ? "http://localhost:8000/v1/uploads"
                : "http://localhost:8000/v1/uploads/public";

              const headers: HeadersInit = {};
              if (token) headers["Authorization"] = `Bearer ${token}`;

              try {
                const response = await fetch(uploadUrl, {
                  method: "POST",
                  headers,
                  body: formData,
                });

                const result = await response.json();

                if (!response.ok) {
                  alert("이미지 업로드 실패: " + result.message);
                  return;
                }

                setThumbnail(result.data.imageUrl);
                console.log("이미지 업로드 성공:", result.data.imageUrl);
              } catch (err) {
                console.error("이미지 업로드 중 오류:", err);
                alert("이미지 업로드 중 오류가 발생했습니다.");
              }
            }}
          />
        </label>
      ) : (
        <img
          src={lp.data.thumbnail || DEFAULT_THUMBNAIL}
          alt={lp.data.title}
          className="w-64 h-64 object-cover mx-auto rounded-full shadow-lg mb-4 spin-lp"
        />
      )}

      {/* 내용 */}
      {editMode ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-4/5 bg-[#202024] p-2 rounded text-white mx-auto block text-center"
          rows={6}
        />
      ) : (
        <p className="text-sm text-center text-gray-300 mb-4 whitespace-pre-line">
          {lp.data.content}
        </p>
      )}

      {/* 태그 */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {lp.data.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-200"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      {/* 좋아요 */}
      <div className="flex items-center justify-center gap-1 text-center">
        <button
          onClick={isLiked ? handleDislikeLp : handleLikeLp}
          className="flex items-center"
        >
          <FaHeart
            className="w-5 h-4 cursor-pointer hover:scale-125"
            style={{
              fill: isLiked ? "red" : "black",
              stroke: isLiked ? "red" : "white",
              strokeWidth: 50,
            }}
          />
        </button>
        <span className="text-white text-sm">{lp.data.likes?.length || 0}</span>
      </div>

      {/* 댓글 */}
      <div className="mt-8">
        <CommentList />
      </div>
    </div>
  );
};

export default LpDetailPage;
