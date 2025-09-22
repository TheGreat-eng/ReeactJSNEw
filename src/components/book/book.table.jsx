import { Table, Modal, Form, Input, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from "antd";
import { Space, Button } from 'antd';
import { useState } from "react";
import ViewBookDetail from './view.book.detail';
import UpdateBookModal from './update.book.modal';
import { deleteBookAPI } from '../../services/api.service'; // ✅ Import deleteBookAPI

const BookTable = (props) => {
    const {
        dataBook,
        current,
        pageSize,
        total,
        loading,
        onPaginationChange,
        loadBook
    } = props;

    const [dataDetail, setDataDetail] = useState({});
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // ✅ Thêm notification cho delete
    const [api, contextHolder] = notification.useNotification();

    // ✅ Implement delete function hoàn chỉnh
    const handleDelete = async (id) => {
        try {
            const response = await deleteBookAPI(id);
            if (response?.data) {
                api.success({
                    message: "Xóa sách thành công!",
                    description: "Sách đã được xóa khỏi hệ thống.",
                    placement: "topRight"
                });

                // Reload danh sách sách
                await loadBook();
            }
        } catch (error) {
            console.error("Error deleting book:", error);
            api.error({
                message: "Xóa sách thất bại!",
                description: error.response?.data?.message || error.message || "Đã có lỗi xảy ra.",
                placement: "topRight"
            });
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && onPaginationChange) {
            onPaginationChange(pagination.current, pagination.pageSize);
        }
    }

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => (index + 1) + (current - 1) * pageSize,
            width: 80,
            align: 'center'
        },
        {
            title: 'Id',
            dataIndex: 'id',
            render: (_, record) => {
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setDataDetail(record);
                            setIsDetailModalOpen(true);
                        }}
                    >
                        {record._id}
                    </a>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            render: (text, record, index, action) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text);
            },
            width: 120,
            align: 'right'
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            align: 'center'
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
            width: 200
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setDataUpdate(record);
                            setIsUpdateModalOpen(true);
                        }}
                        style={{ color: '#faad14' }}
                        size="small"
                    />
                    <Popconfirm
                        title="Are you sure to delete this book?"
                        description="This action cannot be undone."
                        onConfirm={() => handleDelete(record._id)} // ✅ Sử dụng async function
                        okText="Yes"
                        cancelText="No"
                        okType="danger"
                    >
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            style={{ color: '#ff4d4f' }}
                            size="small"
                        />
                    </Popconfirm>
                </Space>
            )
        }
    ]


    return (
        <>
            {contextHolder} {/* ✅ Thêm contextHolder cho notification */}
            <div>
                <Table
                    columns={columns}
                    dataSource={dataBook}
                    loading={loading}
                    pagination={{
                        current: current,
                        pageSize: pageSize,
                        total: total,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    onChange={onChange}
                />
            </div>

            <UpdateBookModal
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                loadBook={loadBook}
            />

            <ViewBookDetail
                dataDetail={dataDetail}
                isDetailModalOpen={isDetailModalOpen}
                setIsDetailModalOpen={setIsDetailModalOpen}
            />
        </>
    )
}

export default BookTable;



/*
Trong file book.table.jsx, biến record xuất hiện trong các hàm
render của cột table. Đây là tham số tự động được Ant Design
Table cung cấp.

record là gì?
record đại diện cho dữ liệu của từng hàng trong table. Khi Ant
Design render từng dòng, nó sẽ truyền dữ liệu của dòng đó vào hàm
render dưới dạng tham số record.

render: (text, record, index) => {
    // text: giá trị của field hiện tại
    // record: object chứa toàn bộ dữ liệu của dòng
    // index: chỉ số của dòng (bắt đầu từ 0)
}

Ví dụ trong code của bạn:
{
    title: 'STT',
    render: (_, record, index) => (index + 1) +
    (current - 1) * pageSize,
}
_: bỏ qua text (không dùng)
record: dữ liệu của dòng (không dùng trong trường hợp này)
index: chỉ số dòng để tính STT


Flow hoạt động khi chuyển trang:

1. User click số trang hoặc Next/Previous
   ↓
2. onChange() được trigger
   ↓
3. setCurrent(newPage) cập nhật state
   ↓
4. useEffect detect current thay đổi
   ↓
5. loadBook() gọi API với trang mới
   ↓
6. setDataBook() cập nhật dữ liệu
   ↓
7. Table re-render với data mới
*/