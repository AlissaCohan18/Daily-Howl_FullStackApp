import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const MemeUpdates = ({ meme, user, isDashboard, refresh }) => {
  const [createdMeme, setCreatedMeme] = useState("");
  const [likeCount, setLikeCount] = useState();
  const [isLikedByUser, setIsLikedByUser] = useState(true);
  const [createdMemeText, setCreatedMemeText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsEditing(false);
  };
  const handleDeleteMeme = async () => {
    setIsDeleting(true);
    // need to use createdMeme here since meme is a string when on dashboard
    const response = await fetch(
      `/api/memes/${user.userId}/${createdMeme._id}`,
      {
        method: "DELETE",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.ok) {
      //refresh page after deleting a meme
      refresh();
      setIsDeleting(false);
    }
  };

  const handleUnlike = async () => {
    // need to use meme here since meme is an object when on All Memes
    const response = await fetch(
      `/api/memes/${meme._id}/like/${user.username}`,
      {
        method: "DELETE",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setLikeCount(json.likeCount);
      setIsLikedByUser(true);
    }
  };

  return (
    <Box className="pictureCard">
      {isDashboard ? (
        // Dashboard
        <Paper elevation={2}>
          <img
            src={createdMeme.memeUrl}
            className="main-photo"
            alt="dog"
            style={{ marginTop: "24px" }}
          />
          <Typography
            variant="h5"
            component="p"
            sx={{ marginTop: "12px", marginBottom: "12px" }}
          >
            Likes: {likeCount}
          </Typography>
          <div>
            {isEditing ? (
              <TextField
                label="meme text"
                id="meme text"
                sx={{ m: 1, width: "25ch" }}
                onChange={(e) => setCreatedMemeText(e.target.value)}
                value={createdMemeText}
              />
            ) : (
              <p>{createdMemeText}</p>
            )}
          </div>
          {isDeleting ? (
            <p>Deleting...</p>
          ) : (
            <div style={{ marginBottom: "24px" }}>
              <Button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? "Save Update" : "Edit Post"}
              </Button>
              <Button onClick={handleDeleteMeme}>Delete Meme</Button>
            </div>
          )}
        </Paper>
      ) : (
        //All Memes
        <Paper elevation={2}>
          <Typography
            variant="h7"
            sx={{ marginTop: "12px", marginBottom: "12px" }}
          >
            <img src={createdMeme.memeUrl} className="main-photo" alt="dog" />
            {createdMeme.username}
          </Typography>
          <Typography
            variant="h5"
            sx={{ marginTop: "12px", marginBottom: "12px" }}
          >
            {createdMeme.memeText}
          </Typography>
          <Typography
            variant="p"
            component="h4"
            sx={{ marginTop: "12px", marginBottom: "12px" }}
          >
            Likes: {likeCount}
          </Typography>
          {isLikedByUser ? (
            <ThumbUpOffAltIcon
              className="likes-btn"
              onClick={handleLike}
              sx={{ fontSize: "30px" }}
            ></ThumbUpOffAltIcon>
          ) : (
            <ThumbUpIcon
              className="likes-btn"
              onClick={handleUnlike}
              sx={{ fontSize: "30px" }}
            ></ThumbUpIcon>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default MemeUpdates;
