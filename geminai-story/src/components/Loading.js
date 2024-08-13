import "../css/TextResult.css";

function Loading() {
  return (
    <div className="loading-container">
      {/* 제목 부분에 로딩바 1개 */}
      <div className="loading-title">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>

      {/* 출력 내용 부분에 로딩바 2-3개 */}
      <div className="loading-story">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}

export default Loading;

  