import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Button } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react'; ``
import ViewUserModal from './view.user.detail/';
import './user.table.css';

import DeleteUser from './delete.user';

const UserTable = (props) => {
    const { dataSource, loading, loadUser,
        currentPage, pageSize, total,
        setCurrentPage, setPageSize, //setTotal
    } = props;
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [viewData, setViewData] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [idDelete, setIdDelete] = useState(null);

    const onChange = (pagination, filters, sorter, extra) => {
        // thay đổi trang
        if (pagination && pagination.current) {
            if (+pagination.current !== +currentPage) {
                setCurrentPage(+pagination.current);
            }
        }
        // thay đổi số item trên 1 trang
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
                setCurrentPage(1); // reset current page ve 1
            }
        }

        //console.log('params', { pagination, filters, sorter, extra });
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_, __, index) => (index + 1) + (currentPage - 1) * pageSize,
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'id',
            render: (_, record) => {
                return (
                    <a onClick={() => {
                        setViewData(record);
                    }}>{record._id}</a>
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
                    <DeleteOutlined
                        onClick={() => {
                            setIsDeleteOpen(true);
                            setIdDelete(record._id);
                        }}
                        style={{ color: 'red', fontSize: 18, cursor: 'pointer' }} />
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
                    pagination={
                        { // phân trang
                            // pageSize: 5,
                            // showTotal: (total) => `Total ${total} users`
                            current: currentPage,
                            pageSize: pageSize,
                            total: total,
                            showSizeChanger: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            // onChange: (page, pageSize) => {
                            //     setCurrent(page);
                            //     setPageSize(pageSize);
                            // }
                        }
                    }
                    onChange={onChange}
                />
            </div>
            <UpdateUserModal
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserModal
                viewData={viewData}
                setViewData={setViewData}
                loadUser={loadUser}
            />
            <DeleteUser
                isDeleteOpen={isDeleteOpen}
                setIsDeleteOpen={setIsDeleteOpen}
                idDelete={idDelete}
                setIdDelete={setIdDelete}
                loadUser={loadUser}
            />
        </>
    )
}

export default UserTable;