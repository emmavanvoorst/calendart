import { useState, createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(() => {

        let data = sessionStorage.getItem("users");
        // Step 1: Grab data from storage
        
        // Step 2: Parse stored data
        return data ? data : null;
        // Step 3: If data exists, return it. Else return null.
    })

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
};