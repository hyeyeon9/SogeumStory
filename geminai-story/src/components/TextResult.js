import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import M from "materialize-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function TextResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { keyword, mainCharacter, genre } = location.state || {};
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [nextIdea, setNextIdea] = useState("");
  const [newStory, setNewStory] = useState("");
  const [newKeywords, setNewKeywords] = useState([]);

  const handleClick1 = () => {
    M.toast({ html: "좋아요😀" });
  };

  const handleClick2 = () => {
    M.toast({ html: "싫어요😪" });
  };

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
      <div
        className="site-title"
        onClick={() => {
          navigate("/");
        }}
      >
        SogeumStory
      </div>
      {/* <span className=" home-btn" onClick={() => navigate("/")}>
        <i class="medium material-icons">forward</i>
      </span> */}
      <div className="tag-box">
        <span className="tag">#{genre}</span>
        <span className="tag">#{mainCharacter}</span>
        {newKeywords.map((keyword, index) => (
          <span className="tag" key={index}>
            {keyword}
          </span>
        ))}
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
          <span onClick={handleClick1} className="like-btn31" value="❤">
            <i className="small material-icons">favorite</i>
          </span>
          <span onClick={handleClick1} className="like-btn21">
            <i className="small material-icons">thumb_up</i>
          </span>

          <span onClick={handleClick2} className="like-btn11">
            <i className="small material-icons">thumb_down</i>
          </span>
          <div className="story-title">{title}</div>
          <p className="result-story">
            {story}
            {newStory && (
              <>
                <p className="new-result-story">{newStory}</p>
              </>
            )}
          </p>
          <form
            className="next-form"
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

export default TextResult;
