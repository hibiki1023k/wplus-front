// pages/_app.js
import {AuthProvider} from "../../context/AuthContext";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
