import React from "react";
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Container, Button } from "@mui/material";

export default function SingUpForm() {

  // Allow user to view or hide their password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);


  return (
    <Container>
      <section>
        <h1>Sign Up Now to get started!</h1>
      </section>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <div>
          <TextField
            label="Username"
            id="username"
            sx={{ m: 1, width: "25ch" }}
          />
          {/* TODO: add e-mail validation */}
          <TextField label="email" id="email" sx={{ m: 1, width: "25ch" }} />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <Button size="large" href="#" variant="contained" color="secondary">
              Submit
            </Button>
          </FormControl>
        </div>
      </Box>
    </Container>
  );
}
