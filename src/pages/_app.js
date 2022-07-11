import React from "react";
import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import { StyledEngineProvider, useTheme } from "@mui/material/styles";
import Head from "next/head";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import json2mq from "json2mq";
import createEmotionCache from "../theme/createEmotionCache";
import ThemeProvider from "../theme";
import MainLayout from "../layout/MainLayout";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }) {
  const [devLoaded, setDevLoaded] = React.useState(false);
  const [pdfGeneratorOpen, setPdfGeneratorOpen] = React.useState(false);
  const [pdfData, setPdfData] = React.useState({});
  const location = useRouter();
  const theme = useTheme();
  const isMobileTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(
    json2mq({
      minWidth: 1400,
    }),
    {
      noSsr: true,
    }
  );
  const { asPath } = location;
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "dev") {
      setDevLoaded(true);
    }
  }, [asPath, devLoaded]);
  if ((process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" || process.env.NODE_ENV === "production") && !devLoaded) {
    return null;
  }
  return (
    <>
      <Head>
        <title>Digital Attendance</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <CacheProvider value={clientSideEmotionCache}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider>
          <MainLayout pdfGeneratorOpen={pdfGeneratorOpen} setPdfGeneratorOpen={setPdfGeneratorOpen} isMobileTablet={isMobileTablet}>
            <Component
              {...pageProps}
              isMobileTablet={isMobileTablet}
              isLargeScreen={isLargeScreen}
              pdfGeneratorOpen={pdfGeneratorOpen} 
              setPdfGeneratorOpen={setPdfGeneratorOpen}
              pdfData={pdfData}
              setPdfData={setPdfData}
            />
            </MainLayout>
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
