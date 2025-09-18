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

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};