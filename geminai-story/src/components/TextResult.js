import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import M from "materialize-css";

function TextResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { keyword, mainCharacter, genre } = location.state || {};
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const handleClick1 = () => {
    M.toast({ html: "좋아요😀" });
  };

  const handleClick2 = () => {
    M.toast({ html: "싫어요😪" });
  };

  useEffect(() => {
    const generateStory = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/generate-text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keyword: keyword,
            mainCharacter: mainCharacter,
            genre: genre,
          }),
        });
        const data = await response.json();
        setStory(data.story);
        setTitle(data.title);
      } catch (error) {
        console.error(error);
        setStory("Fail to generate story");
        setTitle("Fail to generate title");
      }
      setLoading(false);
    };

    generateStory();
  }, [keyword, mainCharacter, genre]);

  return (
    <div className="ResultPage" id="text-page">
      <div className="site-title">SogeumStory</div>
      <span className=" home-btn" onClick={() => navigate("SogeumStory/")}>
        <i class="medium material-icons">forward</i>
      </span>
      <div className="tag-box">
        <span className="tag">#제미나이</span>
        <span className="tag">#{genre}</span>
        <span className="tag">#{mainCharacter}</span>
      </div>
      {/* {loading ? (
        <h1 className="result-page-title">"생성중 .. 잠시만 기다려!!"</h1>
      ) : (
        <></>
      )} */}
      {loading ? (
        <Loading />
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
          <div className="story-title">{title}</div>
          <p className="result-story">{story}</p>
        </>
      )}
    </div>
  );
}

export default TextResult;
