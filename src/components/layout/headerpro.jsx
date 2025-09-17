import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AppstoreOutlined, BookOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, notification } from 'antd';

const Header = () => {
    const [current, setCurrent] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    // Kiểm tra trạng thái đăng nhập khi component mount
    useEffect(() => {
        // Kiểm tra localStorage hoặc sessionStorage để xem user đã đăng nhập chưa
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (userData && token) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);

        // Điều hướng dựa trên key
        switch (e.key) {
            case 'home':
                navigate('/');
                break;
            case 'users':
                navigate('/users');
                break;
            case 'books':
                navigate('/books');
                break;
            case 'login':
                navigate('/login');
                break;
            case 'register':
                navigate('/register');
                break;
            case 'logout':
                handleLogout();
                break;
            default:
                break;
        }
    };

    const handleLogout = () => {
        // Xóa thông tin user khỏi storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');

        // Cập nhật state
        setIsLoggedIn(false);
        setUser(null);
        setCurrent('home');

        // Hiển thị thông báo
        api.success({
            message: 'Logout Successful',
            description: 'You have been logged out successfully.',
            placement: 'topRight',
            duration: 3,
        });

        // Điều hướng về trang chủ
        navigate('/');
    };

    // Tạo items dựa trên trạng thái đăng nhập
    const getMenuItems = () => {
        const baseItems = [
            {
                label: <Link to="/">Home</Link>,
                key: 'home',
                icon: <HomeOutlined />,
            },
        ];

        // Nếu đã đăng nhập, hiển thị menu đầy đủ
        if (isLoggedIn) {
            baseItems.push(
                {
                    label: <Link to="/users">Users</Link>,
                    key: 'users',
                    icon: <UserAddOutlined />,
                },
                {
                    label: <Link to="/books">Books</Link>,
                    key: 'books',
                    icon: <BookOutlined />,
                }
            );
        }

        // Thêm external link
        baseItems.push({
            key: 'external',
            label: (
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    External Link
                </a>
            ),
        });

        // Thêm auth items ở cuối
        const authItems = isLoggedIn ? [
            {
                label: `Welcome, ${user?.fullName || user?.username || 'User'}`,
                key: 'userInfo',
                icon: <UserOutlined />,
                style: { marginLeft: 'auto', cursor: 'default' },
                disabled: true,
            },
            {
                label: 'Logout',
                key: 'logout',
                icon: <LogoutOutlined />,
                style: { color: '#ff4d4f' },
            }
        ] : [
            {
                label: <Link to="/login">Login</Link>,
                key: 'login',
                icon: <LoginOutlined />,
                style: { marginLeft: 'auto' },
            },
            {
                label: <Link to="/register">Register</Link>,
                key: 'register',
                icon: <UserAddOutlined />,
            }
        ];

        return [...baseItems, ...authItems];
    };

    return (
        <>
            {contextHolder}
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={getMenuItems()}
                style={{
                    backgroundColor: '#40a9ff',
                    color: '#fff',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
                theme="dark"
            />
        </>
    );
};

export default Header;