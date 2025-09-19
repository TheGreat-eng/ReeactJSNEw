import { Button, notification, Form, Modal, Input } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {
    const { loadUser } = props;
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm(); // ✅ Sử dụng Form hook

    const onFinish = async (values) => { // ✅ Dùng onFinish như RegisterPage
        setLoading(true);
        try {
            await createUserAPI(values.fullName, values.email, values.password, values.phone);

            api.success({
                message: "🎉 Success!",
                description: `User "${values.fullName}" has been created successfully!`,
                placement: 'topRight',
                duration: 5
            });

            resetAndCloseModal();
            await loadUser();
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
        form.resetFields(); // ✅ Form tự reset
        setOpen(false);
    }

    return (
        <>
            {contextHolder}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "32px 0 16px 0",
                width: "100%",
                maxWidth: 800,
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                <h3>Table Users</h3>
                <Button type="dashed" onClick={() => setOpen(true)}>
                    Create User
                </Button>
            </div>

            <Modal
                title="Create User"
                open={open}
                onCancel={resetAndCloseModal}
                confirmLoading={loading}
                maskClosable={false}
                footer={null} // ✅ Tự quản lý footer
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish} // ✅ Giống RegisterPage
                >
                    <Form.Item
                        label="Full Name"
                        name="fullName" // ✅ Dùng name thay vì value
                        rules={[{ required: true, message: 'Please input full name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input email!' },
                            { type: 'email', message: 'Please enter valid email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please input phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Button onClick={resetAndCloseModal} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserForm;