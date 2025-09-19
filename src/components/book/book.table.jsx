import { Table, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from "antd";
import { Space, Button } from 'antd';
import { useEffect, useState } from "react";
import { fetchAllBooksByApi } from "../../services/api.service";
import ViewBookDetail from './view.book.detail';


import CreateBook from './create.book';
const BookTable = () => {




    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(dataBook.length);

    const [dataDetail, setDataDetail] = useState({});
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(
        () => {
            loadBook();
        }, [current, pageSize] // ← Chạy lại khi current hoặc pageSize thay đổi
    )

    const loadBook = async () => {
        const response = await fetchAllBooksByApi(current, pageSize);
        console.log("Fetched books:", response);
        if (response && response.data) {
            setDataBook(response.data.result);
            setTotal(response.data.meta.total);
            setCurrent(response.data.meta.current);
            setPageSize(response.data.meta.pageSize);
        }
    }

    const handleDelete = (id) => {
        // Xử lý logic xóa
        console.log("Delete book with id:", id);
        // Sau khi xóa thành công, tải lại danh sách sách
        loadBook();
    }

    const onChange = (pagination, filters, sorter, extra) => {
        // Chuyển trang
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);  // ← Cập nhật trang hiện tại
            }
        }

        // Thay đổi số item trên 1 trang  
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);  // ← Cập nhật pageSize
                setCurrent(1);                      // ← Reset về trang 1
            }
        }

        //console.log('params', { pagination, filters, sorter, extra });
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
                        onClick={
                            () => {
                                setDataUpdate(record);
                                setIsUpdateModalOpen(true);
                            }
                        }
                        style={{ color: '#faad14' }}
                        size="small"
                    />
                    <Popconfirm
                        title="Are you sure to delete this book?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
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
            <div>
                <Table
                    columns={columns}
                    dataSource={dataBook}
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

            {/* Thêm Modal Edit */}
            <Modal
                title="Edit Book"
                open={isUpdateModalOpen}
                onCancel={() => {
                    setIsUpdateModalOpen(false);
                    setDataUpdate({});
                }}
                onOk={() => {
                    // Xử lý logic update
                    console.log("Update book:", dataUpdate);
                    setIsUpdateModalOpen(false);
                }}
            >
                <Form layout="vertical">
                    <Form.Item label="Title">
                        <Input
                            value={dataUpdate.mainText}
                            onChange={(e) => setDataUpdate({ ...dataUpdate, mainText: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Author">
                        <Input
                            value={dataUpdate.author}
                            onChange={(e) => setDataUpdate({ ...dataUpdate, author: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Price">
                        <Input
                            value={dataUpdate.price}
                            onChange={(e) => setDataUpdate({ ...dataUpdate, price: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Quantity">
                        <Input
                            value={dataUpdate.quantity}
                            onChange={(e) => setDataUpdate({ ...dataUpdate, quantity: e.target.value })}
                        />
                    </Form.Item>
                </Form>
            </Modal>



            <ViewBookDetail
                dataDetail={dataDetail}
                isDetailModalOpen={isDetailModalOpen}
                setIsDetailModalOpen={setIsDetailModalOpen}
            />

            <CreateBook />


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