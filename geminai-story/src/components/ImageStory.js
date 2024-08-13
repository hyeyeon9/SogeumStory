import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import catImage from "../cat.jpg";
import sleepingCat from "../Sleeping_cat.jpg";
import green from "../EAT_green.jpg";

function ImageStory() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      // 파일을 다음 페이지로 전달하기 위해 상태를 저장하거나 URL을 사용
      const reader = new FileReader();
      reader.onload = () => {
        navigate("/image-preview", { state: { image: reader.result } });
      };
      reader.readAsDataURL(image);
    }
  };

  return (
    <div className="ImageStory">
      <div className="site-title" onClick={() => {
          navigate("/");
        }}>SogeumStory</div>
      <div className="image-title1">
        사진으로📷 <br></br>
        자신만의 소설을 만들어봐요!
      </div>
      <span className="exmaple-text">이런 사진은 어때요?</span>
      <div className="image-example">
        <img src={catImage} alt="고양이" />
        <img src={sleepingCat} alt="고양이" />
        <img src={green} alt="고양이" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="file-upload-wrapper">
          <input
            className="image-input"
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="custom-file-upload">
            사진 선택하기
          </label>
          {image ? (
            <button className="input-btn" type="submit" disabled={!image}>
              ㄱㄱ
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}

export default ImageStory;
