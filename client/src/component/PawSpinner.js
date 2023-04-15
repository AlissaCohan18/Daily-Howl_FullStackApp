import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { purple } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import PetsIcon from "@mui/icons-material/Pets";

export default function PawSpinner() {
  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef // < number > 0;

  const buttonSx = {
    ...(success && {
      bgcolor: purple[500],
      "&:hover": {
        bgcolor: purple[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <PetsIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: purple[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
}
