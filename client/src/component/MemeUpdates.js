import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const MemeUpdates = ({ meme, user, isDashboard }) => {
  const [createdMeme, setCreatedMeme] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [isLikedByUser, setIsLikedByUser] = useState(true);

  useEffect(() => {
    if (isDashboard) {
      fetchMemes();
    } else {
      setCreatedMeme(meme);
      checkIfUserLikedMeme();
    }

    setLikeCount(meme.likeCount);
  }, []);

  const checkIfUserLikedMeme = () => {
    meme.likes.map((like)=>{
      if(like.username===user.username){
       setIsLikedByUser(false)
      }
    })
  };

  const fetchMemes = async () => {
    const response = await fetch(`/api/memes/${meme}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setCreatedMeme(json);
    }
  };

  const handleLike = async () => {
    const like = { likeBody: true, username: user.username };
    const response = await fetch(`/api/memes/${meme._id}/like`, {
      method: "PUT",
      body: JSON.stringify(like),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    console.log(json.likeCount);

    if (response.ok) {
      setLikeCount(json.likeCount);
      setIsLikedByUser(false);
    }
  };

  const handleEdit = () => {
    console.log("edit my meme");
  };

  return (
    <div className="pictureCard">
      <img src={createdMeme.memeUrl} className="main-photo" alt="dog" />
      <p>{createdMeme.memeText}</p>
      <p>{likeCount}</p>
      {isDashboard ? (
        <div>
          <Button onClick={handleEdit}>edit meme</Button>
        </div>
      ) : (
        <div>
          <p>{createdMeme.username}</p>
         {isLikedByUser && <ThumbUpIcon className="likes-btn" onClick={handleLike}></ThumbUpIcon>}
        </div>
      )}
    </div>
  );
};

export default MemeUpdates;
