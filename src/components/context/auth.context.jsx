import React, { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
    email: "",
    fullName: "",
    phone: "",
    avatar: "",
    role: "",
    _id: ""
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        phone: "",
        avatar: "",
        role: "",
        _id: ""
    });

    const [isAppLoading, setIsAppLoading] = useState(true);

    return (
        <AuthContext.Provider value={{
            user, setUser,
            isAppLoading, setIsAppLoading
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};