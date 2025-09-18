import React from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const onFinish = async (values) => {
        //console.log('Login values:', values);

        try {
            // TODO: Thay thế bằng API call thực tế
            // const res = await loginAPI(values.username, values.password);

            // Giả lập login thành công
            api.success({
                message: 'Login Successful!',
                description: `Welcome back, ${values.username}!`,
                placement: 'topRight',
                duration: 3,
            });

            // Redirect sau khi login thành công
            setTimeout(() => {
                navigate('/dashboard'); // hoặc trang chính của bạn
            }, 1500);

        } catch (error) {
            api.error({
                message: 'Login Failed',
                description: 'Invalid username or password. Please try again.',
                placement: 'topRight',
                duration: 4,
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        //console.log('Login failed:', errorInfo);
    };

    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
    };

    const formStyle = {
        background: '#fff',
        padding: '3rem 2.5rem',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #e8e8e8',
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#2d3748',
        fontWeight: '700',
    };

    const buttonStyle = {
        width: '100%',
        height: '45px',
        fontSize: '16px',
        fontWeight: '600',
        borderRadius: '8px',
    };

    const inputStyle = {
        height: '45px',
        borderRadius: '8px',
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
                    name="login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={formStyle}
                >
                    <Title level={2} style={titleStyle}>
                        Welcome Back
                    </Title>

                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your username!' },
                            { min: 3, message: 'Username must be at least 3 characters!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            style={inputStyle}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                            style={inputStyle}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={buttonStyle}
                        >
                            Sign In
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
                            onClick={() => navigate('/register')}
                        >
                            Sign up here
                        </span>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default LoginPage;