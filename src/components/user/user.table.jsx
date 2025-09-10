import { Space, Table } from 'antd';
import { fetchAllUserByApi } from '../../services/api.service';
import { useState, useEffect } from 'react';

const UserTable = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Edit {record.fullName}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const loadUser = async () => {
        setLoading(true);
        try {
            const response = await fetchAllUserByApi();
            console.log("Fetched users:", response);

            if (response && response.data) {
                // Thêm key cho mỗi item để Ant Design Table hoạt động đúng
                const usersWithKey = response.data.map(user => ({
                    ...user,
                    key: user._id // Sử dụng _id làm key nếu có
                }));
                setDataSource(usersWithKey);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={{
                    pageSize: 5,
                    showTotal: (total) => `Total ${total} users`
                }}
            />
        </div>
    )
}

export default UserTable;