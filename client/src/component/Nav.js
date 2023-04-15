import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography
            className="home-button btn"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            as={Link}
            to="/"
          >
            Home
          </Typography>
            {!user && (
            <div>
          <Button className="btn" as={Link} to='/login' color="inherit">Login</Button>
          <Button className="btn" as={Link} to='/signup' color="inherit">Sign Up</Button>
          </div>
          )}
          {user && (
            <div>
           <Button className="btn search-btn" as={Link} to='/dashboard' color="inherit">Dashboard</Button>
              <Button className="btn search-btn" as={Link} to='/all-memes' color="inherit">Memes</Button>
          <Button className="btn search-btn" as={Link} to='/search' color="inherit">Pics</Button>
          <Button onClick={handleClick} className="btn" as={Link} to='/' color="inherit">Log Out</Button>
          </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
