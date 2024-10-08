import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div
        className="site-title"
        onClick={() => {
          navigate("/");
        }}
      >
         GemStory
      </div>
      <div className="homepage-title">
        <span className="geminai">GeminAI</span>와 함께 <br></br>
        자신만의 이야기를 만들어 보세요!
      </div>

      <div className="options">
        <div className="options-card" onClick={() => navigate("/text-story")}>
          <div className="card-content">
            <span className="card-title">"키워드"로 만드는 이야기</span>
            <p className="card-text">
              원하는 키워드, 주인공, 그리고 장르를 선택하여 <br></br>자신만의
              독창적인 소설을 만들어보세요!😚
            </p>
          </div>
          <div className="card-link">
            <a className="waves-effect waves-light btn" href="/text-story">
              계속하기
              <i className="material-icons right">send</i>
            </a>
          </div>
        </div>

        <div className="options-card" onClick={() => navigate("/image-story")}>
          <div className="card-content">
            <span className="card-title">"사진"으로 만드는 이야기</span>
            <p className="card-text">
              원하는 사진으로 창의적인 이야기를 만들 수 있어요! 사진 안에 숨겨진
              이야기를 발견해보세요🤭
            </p>
          </div>
          <div className="card-link">
            <a className="waves-effect waves-light btn" href="/image-story">
              계속하기
              <i className="material-icons right">send</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
