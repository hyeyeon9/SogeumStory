import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import M from "materialize-css";

function ImageDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { image } = location.state;
  const [loading, setLoading] = useState(false);
  const [mainCharacter, setMainCharacter] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    // Materialize select 요소 초기화
    M.FormSelect.init(document.querySelectorAll("select"));
  }, []);

  const handleGenerateStory = async () => {
    setLoading(true);
    navigate("/image-result", { state: { image, mainCharacter, genre } });
  };

  return (
    <div className="detail-container">
      <div className="site-title">SogeumStory</div>
      <div className="detail-title">주인공과 장르를 선택하세요 👩‍🦰</div>
      <span className="detail-text">이 소설의 주인공은 나?</span>
      <div className="input-field col s6">
        <input
          id="mainCharacter"
          type="text"
          className="validate"
          value={mainCharacter}
          placeholder="주인공을 입력하세요."
          onChange={(e) => setMainCharacter(e.target.value)}
        />
      </div>

      <span className="detail-text">장르를 골라주세요!</span>
      <div className="input-field col s12">
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="" disabled>
            장르
          </option>
          <option value="판타지">
            <span className="blue-text">판타지</span>
          </option>
          <option value="SF">
            <span className="blue-text">SF</span>
          </option>
          <option value="로맨스">
            <span className="blue-text">로맨스</span>
          </option>
          <option value="스릴러">
            <span className="blue-text">스릴러</span>
          </option>
          <option value="코미디">
            <span className="blue-text">코미디</span>
          </option>
        </select>
        {/* <label>장르 선택</label> */}
      </div>
      <div className="detail-btn">
        <button
          type="submit"
          onClick={handleGenerateStory}
          disabled={loading || !mainCharacter || !genre}
        >
          {loading ? "생성 중.." : "이야기 생성하기"}
        </button>
      </div>
    </div>
  );
}

export default ImageDetails;
