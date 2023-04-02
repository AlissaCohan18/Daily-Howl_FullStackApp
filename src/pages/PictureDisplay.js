import { useEffect, useState } from "react";
import Photo from "../component/Photo";
import Beagle from "../beagle.jpeg";

const SearchPictures = () => {
  const [dogData, setDogData] = useState(null);
  const [picturePosition, setPicturePosition] = useState(0);

  const arrowBackHandler = () => {
    console.log("back click");
    setPicturePosition(picturePosition - 1);
  };

  const arrowForwardHandler = () => {
    console.log("forward click");
    setPicturePosition(picturePosition + 1);
  };

  useEffect(() => {
    showPicture();
  }, []);

  const api =
    process.env.REACT_APP_DOG_API_URL + process.env.REACT_APP_DOG_API_KEY;

  const showPicture = () => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setDogData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(dogData);

  return (
    <div>
      <h1>Search Pup Pics!</h1>

      {dogData && (
        <Photo
          props={dogData[picturePosition].url}
          isFirstImage={picturePosition === 0 ? false : true}
          isLastImage={picturePosition === 9 ? false : true}
          onBckClick={arrowBackHandler}
          onFwdClick={arrowForwardHandler}
        />
      )}
    </div>
  );
};

export default SearchPictures;
