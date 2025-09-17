import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { registerUserAPI } from '../services/api.service';
import { useNavigate } from "react-router";


const RegisterPage = () => {

    const navigate = useNavigate();

    // Lấy api và contextHolder từ notification giống như trong view.user.modal.jsx
    const [api, contextHolder] = notification.useNotification();

    const onFinish = async (values) => {
        console.log('Success:', values);

        try {
            console.log('Calling API with:', values);
            const res = await registerUserAPI(values.fullName, values.email, values.password, values.phoneNumber);
            console.log('Registration response:', res);

            if (res && res.data) {
                api.success({
                    message: 'Registration Successful!',
                    description: 'Your account has been created successfully. Redirecting to login page...',
                    placement: 'topRight',
                    duration: 3,
                });
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                api.error({
                    message: 'Registration Failed',
                    description: res?.message || 'Registration failed. Please try again.',
                    placement: 'topRight',
                    duration: 4,
                });
            }
        } catch (error) {
            console.error('Full error object:', error);

            if (error.message.includes('404')) {
                api.error({
                    message: 'Server Error',
                    description: 'Server not found. Please check if backend is running.',
                    placement: 'topRight',
                    duration: 5,
                });
            } else {
                api.error({
                    message: 'Network Error',
                    description: error.message || 'Network error. Please try again.',
                    placement: 'topRight',
                    duration: 4,
                });
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7fafc',
        padding: '20px',
    };

    const formStyle = {
        background: '#fff',
        padding: '3rem 2.5rem',
        borderRadius: '12px',
        boxShadow: '0 5px 30px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '1rem',
        color: '#2d3748',
        fontWeight: '700',
        fontSize: '2rem',
    };

    const buttonStyle = {
        width: '100%',
    };

    const linkStyle = {
        textAlign: 'center',
        marginTop: '1.5rem',
        color: '#667eea',
        cursor: 'pointer',
    };

    return (
        <>
            {contextHolder}
            <div style={containerStyle}>
                <Form
                    name="register"
                    className="register-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={formStyle}
                >
                    <h2 style={titleStyle}>Register</h2>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input placeholder="Full Name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[
                            {
                                //required: true,
                                //type: 'regexp',
                                pattern: new RegExp(/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/),
                                message: 'Please enter a valid phone number!'
                            },
                        ]}
                    >
                        <Input placeholder="Phone Number" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary"
                            htmlType="submit" style={buttonStyle}
                        >
                            Register
                        </Button>
                    </Form.Item>
                    <div style={linkStyle}>
                        Don't have an account?
                        <span
                            style={{
                                color: '#667eea',
                                fontWeight: '600',
                                marginLeft: '5px',
                                textDecoration: 'underline'
                            }}
                            onClick={() => navigate('/login')}
                        >
                            Sign in here
                        </span>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default RegisterPage;
