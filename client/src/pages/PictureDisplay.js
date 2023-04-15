import { useEffect, useState } from "react";
import Photo from "../component/Photo";
import MemeForm from "../component/MemeForm";

const SearchPictures = () => {
  const [dogData, setDogData] = useState(null);
  const [picturePosition, setPicturePosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const arrowBackHandler = () => {
    setPicturePosition(picturePosition - 1);
  };

  const arrowForwardHandler = () => {
    setPicturePosition(picturePosition + 1);
  };

  useEffect(() => {
    showPicture();
  }, []);

  const api =
    process.env.REACT_APP_DOG_API_URL + process.env.REACT_APP_DOG_API_KEY;

  const showPicture = () => {
    setPicturePosition(0)
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setDogData(data);
        setIsLoading(false);
      })
      .catch((e) => {
      });
  };

  return (
    <div>
      <h1>Search Pup Pics!</h1>
      {isLoading && <p>...Loading</p>}
      {dogData && (<div>
        <Photo
          props={dogData[picturePosition].url}
          isFirstImage={picturePosition === 0 ? false : true}
          isLastImage={picturePosition === 9 ? false : true}
          onBckClick={arrowBackHandler}
          onFwdClick={arrowForwardHandler}
          apiCall={showPicture}
        />
        <MemeForm
         selectedDogURL={dogData[picturePosition].url}
         />
        </div>
      )}
     
    </div>
  );
};

export default SearchPictures;
