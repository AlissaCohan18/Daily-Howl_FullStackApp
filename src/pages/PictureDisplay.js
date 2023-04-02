import { useEffect, useState } from "react";
import Photo from "../component/Photo";

const SearchPictures = () => {
  const [dogData, setDogData] = useState([]);

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

  return (
    <div>
      <h1>Search Pup Pics!</h1>
      {dogData &&
        dogData.map((photo) => {
          return <Photo props={photo.url} />;
        })}
    </div>
  );
};

export default SearchPictures;
