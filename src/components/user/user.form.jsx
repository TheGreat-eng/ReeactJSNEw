import { Button, Input, notification, Form } from "antd";
import React, { useState, useEffect } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = () => {
    const [api, contextHolder] = notification.useNotification();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClickButton = async () => {
        // Validation đơn giản
        if (!fullName || !email || !password || !phone) {
            api.warning({
                message: "Validation Error",
                description: "Please fill in all fields",
                placement: 'topRight',
                duration: 3
            });
            return;
        }

        setLoading(true);

        try {
            const response = await createUserAPI(fullName, email, password, phone);

            console.log("Full API Response:", response);
            console.log("Response status:", response?.status);
            console.log("Response data:", response?.data);

            // Sử dụng api instance thay vì notification global
            api.success({
                message: "🎉 Success!",
                description: `User "${fullName}" has been created successfully!`,
                placement: 'topRight',
                duration: 5
            });

            // Reset form
            // setFullName("");
            // setEmail("");
            // setPassword("");
            // setPhone("");
        } catch (error) {
            console.error("API Error:", error);
            api.error({
                message: "❌ Create user failed",
                description: error.response?.data?.message || error.message || "Something went wrong!",
                placement: 'topRight',
                duration: 5
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {contextHolder}
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
                <Form layout="vertical">
                    <Form.Item label="Full Name">
                        <Input
                            style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }}
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Email">
                        <Input
                            type="email"
                            style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Password">
                        <Input.Password
                            style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Phone Number">
                        <Input
                            style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }}
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={handleClickButton}
                            style={{ width: '100%' }}
                        >
                            {loading ? 'Creating...' : 'Submit'}
                        </Button>

                        {/* Button test để kiểm tra notification */}
                        <Button
                            onClick={() => api.success({
                                message: "Test",
                                description: "Test notification works!",
                                placement: 'topRight'
                            })}
                            style={{ width: '100%', marginTop: 10 }}
                        >
                            Test Notification
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default UserForm;