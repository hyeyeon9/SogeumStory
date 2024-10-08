import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import catImage from "../cat.jpg";
import sleepingCat from "../Sleeping_cat.jpg";
import green from "../EAT_green.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageStory() {
  // 슬라이더 설정
  const settings = {
    dots: true, // 하단에 점으로 페이지네이션 표시
    infinite: true, // 무한 반복
    speed: 500, // 슬라이더 속도
    slidesToShow: 3, // 한 번에 보여줄 슬라이드 수 (반응형에 따라 변경됨)
    slidesToScroll: 1, // 한 번에 넘어가는 슬라이드 수
    arrows: false, // 화살표를 숨김
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // 화면 크기가 768px 이하일 때 슬라이드 1개만 표시
          slidesToScroll: 1,
        },
      },
    ],
  };

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
      <div
        className="site-title"
        onClick={() => {
          navigate("/");
        }}
      >
        GemStory
      </div>
      <div className="image-title1">
        사진으로📷 <br></br>
        자신만의 소설을 만들어봐요!
      </div>
      <span className="exmaple-text">이런 사진은 어때요?</span>
      {/* React Slick Slider */}
      <Slider {...settings} className="Slider">
        <div className="slider-wrapper">
          <img src={catImage} alt="고양이" className="slider-image" />
        </div>
        <div className="slider-wrapper">
          <img src={sleepingCat} alt="고양이" className="slider-image" />
        </div>
        <div className="slider-wrapper">
          <img src={green} alt="고양이" className="slider-image" />
        </div>
      </Slider>
      {/* <div className="image-example">
        <img src={catImage} alt="고양이" />
        <img src={sleepingCat} alt="고양이" />
        <img src={green} alt="고양이" />
      </div> */}
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
