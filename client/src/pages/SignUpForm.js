import React from "react";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lowerEmail = email.toLowerCase();
    const user = { username, email: lowerEmail, password };
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setUsername("");
      setEmail("");
      setPassword("");

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return (
    <Container>
      <section>
        <h1>Sign Up Now to get started!</h1>
      </section>
      <form sx={{ display: "flex", flexWrap: "wrap" }}>
        <div>
          <TextField
            label="Username"
            id="username"
            sx={{ m: 1, width: "25ch" }}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <TextField
            label="email"
            id="email"
            sx={{ m: 1, width: "25ch" }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button
              size="large"
              href="#"
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </FormControl>
        </div>
        {error && <div>{error}</div>}
      </form>
    </Container>
  );
}
