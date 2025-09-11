import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppstoreOutlined, BookOutlined, HomeOutlined, MailOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const Header = () => {
    const [current, setCurrent] = useState('mail');
    const navigate = useNavigate();

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
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{
                backgroundColor: '#40a9ff', // Xanh dương nhạt, sáng hơn
                color: '#fff',
                fontWeight: 'bold'
            }}
            theme="dark"
        />
    );
};

export default Header;