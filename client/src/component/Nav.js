import React from "react";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext'

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

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
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            as={Link} to='/'
          >
            Home
          </Typography>
          {/* spacer */}
          <Typography sx={{ flexGrow: 500 }}></Typography>
          {!user && (
                <div>
          <Button className="btn" as={Link} to='/login' color="inherit">Login</Button>
          <Button className="btn" as={Link} to='/signup' color="inherit">Sign Up</Button>
          </div>
          )}
          {user && (
            <div>
          <Button className="btn search-btn" as={Link} to='/search' color="inherit">Search Picts</Button>
          <Button onClick={handleClick} className="btn" as={Link} to='/' color="inherit">Log Out</Button>
          </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;