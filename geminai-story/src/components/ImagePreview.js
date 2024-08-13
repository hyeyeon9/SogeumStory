import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ImagePreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state || {};

  if (!image) {
    return <p>이미지가 없습니다. 다시 시도해주세요</p>;
  }

  const handleConfirm = () => {
    navigate("/image-details", { state: { image } });
  };

  return (
    <div className="image-preview-container">
      <div className="site-title" onClick={() => {
          navigate("/");
        }}>SogeumStory</div>
      <h2 >사진 확인해주세요!</h2>
      <img alt="uploaded Preview" src={image} />
      <div className="preview-btn">
      <button onClick={() => navigate(-1)}>다시 선택하기</button>
      <button onClick={handleConfirm}>다음</button>
      </div>
    </div>
  );
}

export default ImagePreview;
