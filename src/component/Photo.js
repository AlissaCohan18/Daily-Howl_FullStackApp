import { useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Photo = ({
  props,
  onFwdClick,
  onBckClick,
  isFirstImage,
  isLastImage,
}) => {
  return (
    <div className="pictureCard">
      {isFirstImage && (
        <ArrowBackIosIcon onClick={onBckClick} className="arrow" />
      )}
      <img src={props} className="main-photo" alt="dog" />
      {isLastImage && (
        <ArrowForwardIosIcon onClick={onFwdClick} className="arrow" />
      )}
    </div>
  );
};

export default Photo;
