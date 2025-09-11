import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Button } from 'antd';
import UpdateUserModal from './update.user.modal';

const UserTable = (props) => {
    const { dataSource, loading } = props;

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
                    <EditOutlined style={{ color: 'blue', fontSize: 18, cursor: 'pointer' }} />
                    <DeleteOutlined style={{ color: 'red', fontSize: 18, cursor: 'pointer' }} />
                </Space>
            ),
        },
    ];







    return (
        <>
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
            <UpdateUserModal />
        </>
    )
}

export default UserTable;