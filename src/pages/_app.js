// pages/_app.js
import React from "react";
import { UserProvider } from "../../context/userContext";
import "../styles/globals.css";
import React from "react";
import { UserProvider } from "../../context/userContext";


function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>

            <Component {...pageProps} />;
\
        </UserProvider>
    );
}

export default MyApp;
