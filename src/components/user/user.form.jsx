import { Button, Input } from "antd";

import React, { useState } from "react";

const UserForm = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleClickButton = () => {
        alert(`Full Name: ${fullName}\nEmail: ${email}\nPassword: ${password}\nPhone Number: ${phoneNumber}`);
    }

    return (
        <div
            className="user-form"
            style={{
                marginTop: 32,
                maxWidth: 400,
                background: "#ffffffff",
                borderRadius: 10,
                boxShadow: "0 2px 12px rgba(102,126,234,0.10)",
                padding: "28px 20px",
                marginLeft: "auto",
                marginRight: "auto"
            }}
        >
            <div>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: 18 }}>
                    <span style={{ fontSize: 15, fontWeight: 500, marginBottom: 7, color: "#2c3e50" }}>Full Name</span>
                    <Input style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }}
                        value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: 18 }}>
                    <span style={{ fontSize: 15, fontWeight: 500, marginBottom: 7, color: "#2c3e50" }}>Email</span>
                    <Input style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }}
                        value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: 18 }}>
                    <span style={{ fontSize: 15, fontWeight: 500, marginBottom: 7, color: "#2c3e50" }}>Password</span>
                    <Input type="password" style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }}
                        value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: 18 }}>
                    <span style={{ fontSize: 15, fontWeight: 500, marginBottom: 7, color: "#2c3e50" }}>Phone Number</span>
                    <Input style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }}
                        value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </div>

                <div>
                    <Button type="primary"
                        onClick={handleClickButton}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;