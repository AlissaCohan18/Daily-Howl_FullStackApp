import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Container, Button } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const MemeForm = ({selectedDogURL}) => {
  const { user } = useAuthContext();
  const [isMeme, setIsMeme] = useState(false);
  const [memeText, setMemeText] = useState("");
  const [error, setError] = useState(null);
  
  const memeAdded = (e) => {
    // console.log(e);
    if (e !== "") {
      setIsMeme(true);
      setMemeText(e)
    } else {
      setIsMeme(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = user.username
    const meme = { memeText, username, memeUrl:selectedDogURL };
    console.log(meme)
    console.log(user)

    const response = await fetch(`/api/memes/${user.userId}`, {
      method: "POST",
      body: JSON.stringify(meme),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setMemeText("");
    }
  };

  return (
    <Container className="memeContainer">
      <div>
        <TextField
          onChange={(e) => memeAdded(e.target.value)}
          label="meme"
          sx={{ m: 1, width: "25ch" }}
        />
      </div>
      <Button
        className="btn"
        size="small"
        disabled={!isMeme}
        variant="outlined"
        color="secondary"
        onClick={handleSubmit}
      >
        Add Meme
      </Button>
    </Container>
  );
};

export default MemeForm;
