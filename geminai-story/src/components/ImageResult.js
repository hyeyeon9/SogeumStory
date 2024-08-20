import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import M from "materialize-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function ImageResult() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");
  const { image, mainCharacter, genre } = location.state;
  const navigate = useNavigate();

  const [likeCount1, setLikeCount1] = useState(0);
  const [likeCount2, setLikeCount2] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);

  const [nextIdea, setNextIdea] = useState("");
  const [newStory, setNewStory] = useState("");
  const [newKeywords, setNewKeywords] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/update-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalStory: story,
          newIdea: nextIdea,
        }),
      });
      const data = await response.json();
      setNewStory(data.updatedStory);
      setNewKeywords(data.keywords);
      setNextIdea("");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleClick1 = () => {
    M.toast({ html: "❤" });
    setLikeCount1(likeCount1 + 1);
  };

  const handleClick2 = () => {
    M.toast({ html: "좋아요😀" });
    setLikeCount2(likeCount2 + 1);
  };

  const handleClick3 = () => {
    M.toast({ html: "싫어요😪" });
    setDisLikeCount(disLikeCount + 1);
  };

  useEffect(() => {
    const handleSubmit = async () => {
      if (!image) {
        console.error("No image provided");
        return;
      }
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("mainCharacter", mainCharacter);
      formData.append("genre", genre);

      try {
        const response = await fetch("http://localhost:5000/generate-image", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          const storyText = data.story;

          // 제목 추출
          const titleMatch = storyText.match(/\*\*제목:\*\*\s*(.+)/);
          const title = titleMatch ? titleMatch[1].trim() : "제목 없음";

          // 이야기 본문 추출
          const storyMatch = storyText.match(/\*\*이야기:\*\*\s*(.+)/s);
          const story = storyMatch ? storyMatch[1].trim() : "이야기 없음";

          setTitle(title);
          setStory(story);
        } else {
          alert(data.error || "Failed to generate story");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error generating story");
      }

      setLoading(false);
    };
    // 이미지 파일이 선택된 경우에만 handleSubmit을 호출합니다.
    if (image) {
      handleSubmit();
    }
  }, [image, mainCharacter, genre]);
  return (
    <div className="ResultPage" id="image-result-page">
      <div
        className="site-title"
        onClick={() => {
          navigate("/");
        }}
      >
        SogeumStory
      </div>
      <span className=" home-btn" onClick={() => navigate("/")}>
        <i class="medium material-icons">forward</i>
      </span>
      <div className="tag-box">
        <span className="tag">#{genre}</span>
        <span className="tag">#{mainCharacter}</span>
        {newKeywords.map((keyword, index) => (
          <span className="tag" key={index}>
            #{keyword}
          </span>
        ))}
      </div>
      {loading ? (
        <p>
          <Loading />
        </p>
      ) : (
        <>
          <span onClick={handleClick1} className="like-btn3" value="❤">
            <i class="small material-icons">favorite</i>
            <div className="favorite_cnt2">{likeCount1}</div>
          </span>
          <span onClick={handleClick2} className="like-btn2">
            <i class="small material-icons">thumb_up</i>
            <div className="thumb_up_cnt2">{likeCount2}</div>
          </span>

          <span onClick={handleClick3} className="like-btn1">
            <i class="small material-icons">thumb_down</i>
            <div className="thumb_down_cnt2">{disLikeCount}</div>
          </span>
          <span className="image-title">{title}</span>
          <img src={image} alt="첨부한 이미지" className="result-image" />
          <p className="image-story">
            {story}
            {newStory && (
              <>
                <p className="new-result-story">{newStory}</p>
              </>
            )}
          </p>

          <form
            className="next-form Image-next-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              value={nextIdea}
              onChange={(e) => setNextIdea(e.target.value)}
              className="next-step"
              type="text"
              placeholder="추가하고 싶은 아이디어를 입력해주세요!"
            />
            <button
              type="submit"
              className={`next-step-btn ${nextIdea.trim() ? "active" : ""}`}
            >
              {" "}
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
export default ImageResult;
