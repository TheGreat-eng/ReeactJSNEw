import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import {
    BookOutlined, HomeOutlined,
    SettingOutlined, UserAddOutlined,
    LogoutOutlined, AliwangwangOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';

import { logoutAPI } from '../../services/api.service.js';



import { AuthContext } from '../context/auth.context.jsx';
const Header = () => {
    const [current, setCurrent] = useState('home'); // Đổi từ 'mail' thành 'home'
    const navigate = useNavigate();

    const { user, setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            const res = await logoutAPI();
            if (res && res.data) {
                localStorage.removeItem('access_token');
                setUser({
                    email: "",
                    fullName: "",
                    phone: "",
                    avatar: "",
                    role: "",
                    id: ""
                });
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Vẫn logout local nếu API fail
            localStorage.removeItem('access_token');
            setUser({
                email: "",
                fullName: "",
                phone: "",
                avatar: "",
                role: "",
                id: ""
            });
            window.location.href = '/';
        }
    }


    const onClick = (e) => {

        setCurrent(e.key);

        // Điều hướng dựa trên key
        switch (e.key) {
            case 'mail':
                navigate('/');
                break;
            case 'users':
                navigate('/users');
                break;
            case 'books':
                navigate('/books');
                break;
            default:
                break;
        }
    };

    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/users">Users</Link>,
            key: 'users',
            icon: <UserAddOutlined />,
        },
        {
            label: <Link to="/books">Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
        {
            key: 'external',
            label: (
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    External Link
                </a>
            ),
        },
        ...(!user.id ? [{  // Đổi từ user.id thành user.id
            label: <Link to="/login">
                Login
            </Link>,
            key: 'login',
            icon: <SettingOutlined />,
        }] : []),

        ...(user.id ? [{  // Đổi từ user.id thành user.id
            label: 'Welcome, ' + (user && user.fullName ? user.fullName : 'Guest'),
            key: 'logout',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={() => handleLogout(

                    )}>Log out</span>,
                    key: 'logout-action',
                    icon: <LogoutOutlined />,
                }
            ]
        }] : []),


    ];

    return (
        <>
            <style>
                {`
                    .menu-setting-right {
                        margin-left: auto !important;
                    }
                    .ant-menu-horizontal > .menu-setting-right {
                        float: right;
                    }
                `}
            </style>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                style={{
                    backgroundColor: '#7640ffff',
                    color: '#fff',
                    fontWeight: 'bold'
                }}
                theme="dark"
            />
        </>
    );
};

export default Header;