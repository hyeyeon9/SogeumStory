import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import TextStory from "./components/TextStory";
import ImageStory from "./components/ImageStory";
import "./css/Home.css";
import "./css/TextStory.css";
import "./css/TextDetail.css";
import "./css/TextResult.css";
import "./css/ImageHome.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import TextDetails from "./components/TextDetails";
import TextResult from "./components/TextResult";
import ImagePreview from "./components/ImagePreview";
import ImageDetails from "./components/ImageDetails";
import ImageResult from "./components/ImageResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text-story" element={<TextStory />} />
        <Route path="/text-details" element={<TextDetails />} />
        <Route path="/text-result" element={<TextResult />} />
        <Route path="/image-story" element={<ImageStory />} />
        <Route path="/image-preview" element={<ImagePreview />} />
        <Route path="/image-details" element={<ImageDetails />} />
        <Route path="/image-result" element={<ImageResult />} />
      </Routes>
    </Router>
  );
}

export default App;
