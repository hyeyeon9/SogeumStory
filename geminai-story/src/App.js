import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import TextStory from "./pages/Text/TextStory";
import TextDetails from "./pages/Text/TextDetails";
import TextResult from "./pages/Text/TextResult";
import ImageStory from "./pages/Image/ImageStory";
import ImagePreview from "./pages/Image/ImagePreview";
import ImageDetails from "./pages/Image/ImageDetails";
import ImageResult from "./pages/Image/ImageResult";

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

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
