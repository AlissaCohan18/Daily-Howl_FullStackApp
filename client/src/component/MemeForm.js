import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Container, Button } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const MemeForm = ({ selectedDogURL }) => {
  const { user } = useAuthContext();
  const [memeText, setMemeText] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

    console.log(memeText)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = user.username;
    const meme = { memeText, username, memeUrl: selectedDogURL };
    

    const response = await fetch(`/api/memes/${user.userId}`, {
      method: "POST",
      body: JSON.stringify(meme),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setMemeText("");
      //redirect to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <Container className="memeContainer">
      <div>
        <TextField
          onChange={(e) => setMemeText(e.target.value)}
          label="meme"
          value={memeText}
          sx={{ m: 1, width: "25ch" }}
        />
      </div>
      <Button
        className="btn"
        size="small"
        disabled={memeText === ""}
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
