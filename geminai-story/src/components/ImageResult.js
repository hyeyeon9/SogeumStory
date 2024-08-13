import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import M from "materialize-css";

function ImageResult() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");
  const { image, mainCharacter, genre } = location.state;
  const navigate = useNavigate();

  const handleClick1 = () => {
    M.toast({ html: "좋아요😀" });
  };

  const handleClick2 = () => {
    M.toast({ html: "싫어요😪" });
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
    <div className="ResultPage">
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
      </div>
      {loading ? (
        <p>
          <Loading />
        </p>
      ) : (
        <>
          <span onClick={handleClick1} className="like-btn3" value="❤">
            <i class="small material-icons">favorite</i>
          </span>
          <span onClick={handleClick1} className="like-btn2">
            <i class="small material-icons">thumb_up</i>
          </span>

          <span onClick={handleClick2} className="like-btn1">
            <i class="small material-icons">thumb_down</i>
          </span>
          <span className="image-title">{title}</span>
          <img src={image} alt="첨부한 이미지" className="result-image" />
          <p className="image-story">{story}</p>
        </>
      )}
    </div>
  );
}
export default ImageResult;
