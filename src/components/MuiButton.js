import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const MuiButton = ({ variant, text, height, ...rest }) => {
  return (
    <Box>
      <Button sx={{ height }} variant={variant} {...rest}>
        {text}
      </Button>
    </Box>
  );
};

export default MuiButton;

MuiButton.propTypes = {
  variant: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
