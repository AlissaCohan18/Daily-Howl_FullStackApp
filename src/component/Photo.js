import { useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/IconButton";

const Photo = ({
  props,
  onFwdClick,
  onBckClick,
  isFirstImage,
  isLastImage,
  apiCall
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
    {!isLastImage && <Button className="arrow" size="small" color="secondary" onClick={apiCall} > Next Set of PIctures</Button>}
    </div>
  );
};

export default Photo;
