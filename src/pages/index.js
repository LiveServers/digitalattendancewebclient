import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import GenerateQRCodeContainer from "../containers/GenerateQRCodeContainer";

const Home = ({
  isMobileTablet,
  pdfGeneratorOpen, 
  setPdfGeneratorOpen,
  pdfData,
  setPdfData,
}) => {
  const router = useRouter();
  React.useEffect(()=>{
    const expiryTime = window?.localStorage?.getItem("expiryTime");
    if(!expiryTime || (new Date() > new Date(expiryTime))){
      window?.localStorage?.clear();
      router.push("/login");
    }
  },[]);
  return (
    <>
      <GenerateQRCodeContainer pdfData={pdfData} setPdfData={setPdfData} pdfGeneratorOpen={pdfGeneratorOpen} setPdfGeneratorOpen={setPdfGeneratorOpen} />
    </>
  );
};

export default React.memo(Home);

Home.propTypes = {
  isMobileTablet: PropTypes.bool.isRequired,
  isLargeScreen: PropTypes.bool.isRequired,
};
