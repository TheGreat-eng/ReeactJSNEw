import { Button, Input } from "antd";

const UserForm = () => {
    return (
        <div
            className="user-form"
            style={{
                marginTop: 32,
                maxWidth: 400,
                background: "#fff",
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
                    <Input style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: 18 }}>
                    <span style={{ fontSize: 15, fontWeight: 500, marginBottom: 7, color: "#2c3e50" }}>Email</span>
                    <Input style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: 18 }}>
                    <span style={{ fontSize: 15, fontWeight: 500, marginBottom: 7, color: "#2c3e50" }}>Password</span>
                    <Input type="password" style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: 18 }}>
                    <span style={{ fontSize: 15, fontWeight: 500, marginBottom: 7, color: "#2c3e50" }}>Phone Number</span>
                    <Input style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }} />
                </div>

                <div>
                    <Button type="primary">Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;