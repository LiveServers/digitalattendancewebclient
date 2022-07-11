import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/router";
import MuiButton from "../components/MuiButton";

export default function AppHeader({ isMobileTablet, setPdfGeneratorOpen, pdfGeneratorOpen }) {
  const router = useRouter();
  const [searchString, setSearchString] = React.useState("");
  const handleBack = () => {
    router.back();
  };
  return (
    <Box sx={{ flexGrow: 1, width:"100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
            direction="row"
            sx={{width:"100%"}}
          >
            <Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Digital Attendance
                </Typography>
            </Box>
            {
              pdfGeneratorOpen && (
                <Box>
                  <MuiButton sx={{backgroundColor:"#fff",color:"#000"}} onClick={() => setPdfGeneratorOpen(false)} height={30} variant="contained" text="CLOSE PDF VIEWER" />
                </Box>
              )
            }
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}