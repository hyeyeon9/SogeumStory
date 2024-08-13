import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!keyword) {
      console.error("Keyword is required");
      return;
    }
    navigate("/text-details", {
      state: {
        keyword,
      },
    });
  };

  return (
    <div className="home-container">
      <div
        className="site-title"
        onClick={() => {
          navigate("/");
        }}
      >
        SogeumStory
      </div>
      <div className="text-story-title">
        어떤 키워드로 소설을 작성해볼까요?✍
      </div>
      <span className="text-story-span">주제도 좋아요!</span>
      <div className="keyword-tags">
        <div className="tag">#고양이</div>
        <div className="tag">#코딩공부</div>
        <div className="tag">#아이스아메리카노</div>
      </div>

      <div className="text-form-container">
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">textsms</i>
                <input
                  type="text"
                  id="keyword-input"
                  className="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <label for="keyword-input">keyword</label>
              </div>
            </div>
          </div>
        </div>
        <div className="keyword_btn">
          <button
            class="btn waves-effect waves-light"
            onClick={handleNext}
            disabled={!keyword}
          >
            다음
            <i class="material-icons right">send</i>
          </button>
        </div>
        {/* <button onClick={handleNext} disabled={!keyword}>
          다음
        </button> */}
        {/* 
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">mode_edit</i>
              <textarea
                id="icon_prefix2"
                class="materialize-textarea"
                value={keyword}
                name="keyword"
                onChange={(e) => setKeyword(e.target.value)}
              ></textarea>
              <label for="icon_prefix2">Keyword</label>
            </div>
          </div>
        </form> */}
      </div>
    </div>
  );
}

export default App;
