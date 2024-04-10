import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [value, setValue] = useState("");

    return (
        <UserContext.Provider value={{ value, setValue }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;