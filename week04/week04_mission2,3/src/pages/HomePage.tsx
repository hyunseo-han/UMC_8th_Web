const HomePage = () => {
  const clearAll = () => {
    localStorage.clear();
    console.log("✅ 로컬스토리지 전체 삭제 완료");
  };

  return (
    <>
      <button
        onClick={clearAll}
        className="bg-white text-black px-4 py-2 rounded-md shadow"
      >
        전체 초기화
      </button>
      <div className="text-white">HomePage</div>
    </>
  );
};

export default HomePage;
