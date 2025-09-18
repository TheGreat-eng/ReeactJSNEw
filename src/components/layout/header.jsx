import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppstoreOutlined, BookOutlined, HomeOutlined, MailOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';




import { AuthContext } from '../context/auth.context.jsx';
const Header = () => {
    const [current, setCurrent] = useState('mail');
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    console.log('Current user in Header:', user);

    const onClick = (e) => {
        console.log('click ', e);
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
        {
            label: 'Setting',
            key: 'setting',
            icon: <SettingOutlined />,
            className: 'menu-setting-right', // Thêm dòng này
            children: [
                {
                    label: <Link to="/login">Login</Link>,
                    key: 'login',
                },
                {
                    label: <Link to="/register">Register</Link>,
                    key: 'register',
                },
            ],
        },

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