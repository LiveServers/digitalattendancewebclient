import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import LoginContainer from "../containers/LoginContainer";
import AppHeader from "../containers/AppHeader";

const Login = ({isMobileTablet}) => {
    return (
        <>
            <Head>
                <title>Log In</title>
            </Head>
            <LoginContainer />
        </>
    )
}

export default React.memo(Login);

Login.propTypes = {
  isMobileTablet: PropTypes.bool.isRequired,
  isLargeScreen: PropTypes.bool,
};