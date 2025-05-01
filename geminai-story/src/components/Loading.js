// components/Loading.js
import "../components/Loading.css";
function Loading() {
  return (
    <div className="loading-container">
      {/* 제목 부분 로딩 바 */}
      <div className="loading-title">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>

      {/* 본문 부분 로딩 바 */}
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
