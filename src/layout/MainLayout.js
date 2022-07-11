import React from "react";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppHeader from "../containers/AppHeader";

const MainLayout = ({ children, isMobileTablet, setPdfGeneratorOpen, pdfGeneratorOpen }) => {
  const theme = useTheme();
  return (
    <>
      <Grid
        container
        direction="column"
        wrap="nowrap"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{
          width: "100%",
          backgroundColor: theme.palette.grey[0],
          // height: "100vh",
        }}
      >
        <AppHeader
          isMobileTablet={isMobileTablet}
          setPdfGeneratorOpen={setPdfGeneratorOpen}
          pdfGeneratorOpen={pdfGeneratorOpen}
        />
        {children}
      </Grid>
    </>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isMobileTablet: PropTypes.bool.isRequired,
};
