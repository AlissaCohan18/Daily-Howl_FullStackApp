import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Container, Button } from "@mui/material";



const MemeForm = () => {
  const [isMeme, setIsMeme] = useState(false)
  const memeAdded = (e) => {
    console.log(e)
    if (e !== ""){
      setIsMeme(true);
    }
    else{
    setIsMeme(false)};
  }; 
 
 
  return (
    <Container className="memeContainer">
      <div>
        <TextField onChange={(e)=> memeAdded(e.target.value)} label="meme" sx={{ m: 1, width: "25ch" }} />
      </div>
      <Button className="btn" size="small" disabled={!isMeme} variant="outlined" color="secondary">
        Add Meme
      </Button>
    </Container>
  );
};

export default MemeForm;