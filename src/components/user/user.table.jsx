import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Button } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useEffect, useState } from 'react'; ``

const UserTable = (props) => {
    const { dataSource, loading, loadUser } = props;
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);



    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'id',
            render: (_, record) => {
                return (
                    <a href='#'>{record._id}</a>
                )
            }
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
                    <EditOutlined onClick={() => {
                        setDataUpdate(record);
                        setIsUpdateOpen(true);
                    }}
                        style={{ color: 'blue', fontSize: 18, cursor: 'pointer' }}
                    />
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
            <UpdateUserModal
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
        </>
    )
}

export default UserTable;