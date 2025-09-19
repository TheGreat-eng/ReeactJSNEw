import { Button, Modal, Form, Input, Upload, notification } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react";

import { handleUploadFile, createBookAPI } from "../../services/api.service";

const BookForm = ({ loadBook }) => { // ← Nhận props loadBook từ BookPage
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Notification
    const [api, contextHolder] = notification.useNotification();

    const onFinish = async (values) => {
        console.log("Form Values:", values);

        const fileObj = values.thumbnail?.[0]?.originFileObj;
        if (!fileObj) {
            api.error({
                message: "Thiếu ảnh thumbnail!",
                description: "Bạn cần chọn ảnh trước khi lưu.",
                placement: "topRight"
            });
            return;
        }

        setLoading(true);
        try {
            // Bước 1: Upload ảnh trước
            const uploadResult = await handleUploadFile(fileObj, "book");

            if (uploadResult?.data?.fileUploaded) {
                const thumbnailFilename = uploadResult.data.fileUploaded;

                // Bước 2: Tạo book với tên ảnh đã upload
                const bookResult = await createBookAPI(
                    values.title,      // mainText
                    values.author,
                    Number(values.price),
                    Number(values.quantity),
                    values.category,
                    thumbnailFilename  // thumbnail filename từ upload
                );

                if (bookResult?.data) {
                    api.success({
                        message: "Tạo sách thành công!",
                        description: `Sách "${values.title}" đã được tạo thành công.`,
                        placement: "topRight"
                    });

                    // Reset form và đóng modal
                    form.resetFields();
                    setPreviewUrl(null);
                    setOpen(false);

                    // Reload danh sách sách
                    if (loadBook) {
                        await loadBook();
                    }
                }
            }
        } catch (error) {
            console.error("Error creating book:", error);
            api.error({
                message: "Tạo sách thất bại!",
                description: error.response?.data?.message || error.message || "Đã có lỗi xảy ra.",
                placement: "topRight"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setPreviewUrl(null);
        setOpen(false);
    };

    return (
        <>
            {contextHolder}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "32px 0 16px 0",
                    width: "100%",
                    maxWidth: 800,
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <h3 style={{ margin: 0, flex: 1, textAlign: "left", fontSize: 22 }}>Table Books</h3>
                <Button
                    type="dashed"
                    onClick={() => setOpen(true)}
                    style={{ marginLeft: 16 }}
                >
                    Create Books
                </Button>
            </div>

            <Modal
                title="Create Books"
                open={open}
                onCancel={handleCancel}
                confirmLoading={loading}
                maskClosable={false}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: "Please enter the book title" }]}
                    >
                        <Input placeholder="Enter book title" />
                    </Form.Item>

                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[{ required: true, message: "Please enter the author" }]}
                    >
                        <Input placeholder="Enter author name" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            { required: true, message: "Please enter the price" },
                            { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Please enter a valid price" }
                        ]}
                    >
                        <Input placeholder="Enter price" />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            { required: true, message: "Please enter the quantity" },
                            { pattern: /^[0-9]+$/, message: "Quantity must be a number" }
                        ]}
                    >
                        <Input placeholder="e.g. 10" maxLength={4} />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: "Please enter the category" }]}
                    >
                        <Input placeholder="e.g. Fiction" maxLength={100} />
                    </Form.Item>

                    <Form.Item
                        label="Upload Thumbnail"
                        name="thumbnail"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                        rules={[{ required: true, message: "Please upload a thumbnail" }]}
                    >
                        <Upload
                            accept="image/*"
                            listType="picture"
                            beforeUpload={() => false} // ngăn auto-upload
                            onChange={({ file }) => {
                                const f = file?.originFileObj;
                                if (f) {
                                    setPreviewUrl(URL.createObjectURL(f));
                                }
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Choose Image</Button>
                        </Upload>
                    </Form.Item>

                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            style={{ maxWidth: "100%", marginTop: 16 }}
                        />
                    )}

                    <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{ marginRight: 8 }}
                        >
                            {loading ? "Creating..." : "Save"}
                        </Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default BookForm;
