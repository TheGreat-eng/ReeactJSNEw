import { Button, Input, notification, Form, Modal } from "antd";
import React, { useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UpdateUserModal = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);


    const handleSubmit = async () => {
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
            await createUserAPI(fullName, email, password, phone);

            api.success({
                message: "🎉 Success!",
                description: `User "${fullName}" has been created successfully!`,
                placement: 'topRight',
                duration: 5
            });

            resetAndCloseModal();
            // await loadUser();
        } catch (error) {
            api.error({
                message: "❌ Create user failed",
                description: error.response?.data?.message || error.message || "Something went wrong!",
                placement: 'topRight',
                duration: 5
            });
        } finally {
            setLoading(false);
        }
    };


    const resetAndCloseModal = () => {
        // Reset form
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setOpen(false);
    }

    return (
        < Modal
            title="Create User"
            open={open}
            onOk={handleSubmit}
            onCancel={() => resetAndCloseModal()}
            confirmLoading={loading}
            maskClosable={false}
            okText="Submit"
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
            </Form>
        </Modal >

    )
}

export default UpdateUserModal;