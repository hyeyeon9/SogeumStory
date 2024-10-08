import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import M from "materialize-css";

function TextDetails() {
  const [mainCharacter, setMainCharacter] = useState("");
  const [genre, setGenre] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { keyword } = location.state;

  useEffect(() => {
    // Materialize select 요소 초기화
    M.FormSelect.init(document.querySelectorAll("select"));
  }, []);

  const handleGenerate = (e) => {
    e.preventDefault();

    if (!mainCharacter || !genre) {
      console.error("Main Character and Genre are required");
      return;
    }

    navigate("/text-result", { state: { keyword, mainCharacter, genre } });
  };

  return (
    <div className="DetailsPage">
      <div
        className="site-title"
        onClick={() => {
          navigate("/");
        }}
      >
        GemStory
      </div>
      <div className="detail-title">
        좋아요😊
        <br></br>주인공과 장르를 알려주세요!
      </div>
      <span className="detail-text">원하는 주인공이 있나요?</span>
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
          <option value="일상물">
            <span className="blue-text">일상물</span>
          </option>
          <option value="개그">
            <span className="blue-text">개그</span>
          </option>
          <option value="로맨스">
            <span className="blue-text">로맨스</span>
          </option>
          <option value="스릴러">
            <span className="blue-text">스릴러</span>
          </option>
          <option value="무협/사극">
            <span className="blue-text">무협/사극</span>
          </option>
          <option value="드라마">
            <span className="blue-text">드라마</span>
          </option>
        </select>
        {/* <label>장르 선택</label> */}
      </div>

      <div className="generate-btn">
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={handleGenerate}
          disabled={!mainCharacter || !genre}
        >
          이야기 생성 <i className="material-icons right">send</i>
        </button>
      </div>
    </div>
  );
}

export default TextDetails;
