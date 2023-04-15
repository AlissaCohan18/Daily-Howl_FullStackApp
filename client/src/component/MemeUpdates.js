import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import TextField from "@mui/material/TextField";

const MemeUpdates = ({ meme, user, isDashboard }) => {
  const [createdMeme, setCreatedMeme] = useState("");
  const [likeCount, setLikeCount] = useState();
  const [isLikedByUser, setIsLikedByUser] = useState(true);
  const [createdMemeText, setCreatedMemeText] = useState("");

  useEffect(() => {
    if (isDashboard) {
      fetchMemes();
    } else {
      setCreatedMeme(meme);
      checkIfUserLikedMeme();
    }
  }, []);

  useEffect(() => {
    setLikeCount(createdMeme.likeCount);
    setCreatedMemeText(createdMeme.memeText);
  }, [createdMeme]);

  const checkIfUserLikedMeme = () => {
    meme.likes.map((like) => {
      if (like.username === user.username) {
        setIsLikedByUser(false);
      }
    });
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
    // need to use meme here since meme is an object when on All Memes
    const response = await fetch(`/api/memes/${meme._id}/like`, {
      method: "PUT",
      body: JSON.stringify(like),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setLikeCount(json.likeCount);
      setIsLikedByUser(false);
    }
  };

  const handleSave = async () => {
    const updatedText = { memeText: createdMemeText };
    // need to use createdMeme here since meme is a string when on dashboard
    await fetch(`/api/memes/${createdMeme._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedText),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  const handleUnlike = async () => {
    // need to use meme here since meme is an object when on All Memes
    const response = await fetch(`/api/memes/${meme._id}/like/${user.username}`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setLikeCount(json.likeCount);
      setIsLikedByUser(true);
    }
  }

  return (
    <div className="pictureCard">
      <img src={createdMeme.memeUrl} className="main-photo" alt="dog" />
      <p>Likes: {likeCount}</p>
      {isDashboard ? (
        <div>
          <TextField
            label="meme text"
            id="meme text"
            sx={{ m: 1, width: "25ch" }}
            onChange={(e) => setCreatedMemeText(e.target.value)}
            value={createdMemeText}
          />
          <Button onClick={handleSave}>Save Update</Button>
        </div>
      ) : (
        <div>
          <p>{createdMeme.username}</p>
          <p>{createdMeme.memeText}</p>
          {isLikedByUser ? (
            <ThumbUpOffAltIcon
              className="likes-btn"
              onClick={handleLike}
            ></ThumbUpOffAltIcon>
          ) : (
            <ThumbUpIcon
              className="likes-btn"
              onClick={handleUnlike}
            ></ThumbUpIcon>
          )}
        </div>
      )}
    </div>
  );
};

export default MemeUpdates;
