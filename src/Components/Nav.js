import React from "react";
import { Link } from 'react-router-dom';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className="home-button btn"
            onClick={() => console.log("hi")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            as={Link} to='/'
          >
            Home
          </Typography>
          {/* spacer */}
          <Typography sx={{ flexGrow: 500 }}></Typography>
          <Button className="btn" as={Link} to='/login' color="inherit">Login</Button>
          <Button className="btn" as={Link} to='/signup' color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
