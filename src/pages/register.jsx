import React from 'react';
import { Form, Input, Button } from 'antd';

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
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

    return (
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
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
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
                    <Button type="primary" htmlType="submit" style={buttonStyle}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterPage;
