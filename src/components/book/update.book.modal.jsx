import { Modal, Form, Input, Select, Upload, Button, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookModal = (props) => {
    const {
        dataUpdate,
        setDataUpdate,
        isUpdateModalOpen,
        setIsUpdateModalOpen,
        loadBook
    } = props;

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [api, contextHolder] = notification.useNotification();

    const CATEGORY_OPTIONS = [
        "Arts",
        "Business",
        "Comics",
        "Cooking",
        "Entertainment",
        "History",
        "Music",
        "Sports",
        "Travel"
    ];

    // ✅ Populate form khi dataUpdate thay đổi
    useEffect(() => {
        if (dataUpdate && Object.keys(dataUpdate).length > 0) {
            form.setFieldsValue({
                title: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category,
            });

            // Hiển thị ảnh hiện tại nếu có
            if (dataUpdate.thumbnail) {
                setPreviewUrl(`${import.meta.env.VITE_BASE_URL}/images/book/${dataUpdate.thumbnail}`);
            }
        }
    }, [dataUpdate, form]);

    const onFinish = async (values) => {
        console.log("Form Values:", values);
        setLoading(true);

        try {
            let thumbnailFilename = dataUpdate.thumbnail; // Giữ ảnh cũ mặc định

            // Kiểm tra xem có upload ảnh mới không
            const fileObj = values.thumbnail?.[0]?.originFileObj;
            if (fileObj) {
                // Upload ảnh mới
                const uploadResult = await handleUploadFile(fileObj, "book");
                if (uploadResult?.data?.fileUploaded) {
                    thumbnailFilename = uploadResult.data.fileUploaded;
                }
            }

            // ✅ Gọi API update book với cách mới (ID đã được truyền vào URL)
            const bookResult = await updateBookAPI(
                dataUpdate._id,        // ID của book cần update
                values.title,          // mainText
                values.author,
                Number(values.price),
                Number(values.quantity),
                values.category,
                thumbnailFilename      // thumbnail filename
            );

            if (bookResult?.data) {
                api.success({
                    message: "Cập nhật sách thành công!",
                    description: `Sách "${values.title}" đã được cập nhật thành công.`,
                    placement: "topRight"
                });

                handleCancel();
                await loadBook(); // Reload danh sách sách
            }
        } catch (error) {
            console.error("Error updating book:", error);
            api.error({
                message: "Cập nhật sách thất bại!",
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
        setIsUpdateModalOpen(false);
        setDataUpdate({});
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Edit Book"
                open={isUpdateModalOpen}
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
                        rules={[{ required: true, message: "Please select a category" }]}
                    >
                        <Select
                            placeholder="Select a category"
                            options={CATEGORY_OPTIONS.map(c => ({ value: c, label: c }))}
                            showSearch
                            filterOption={(input, option) =>
                                option.label.toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Upload Thumbnail"
                        name="thumbnail"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                        extra="Leave empty to keep current image"
                    >
                        <Upload
                            accept="image/*"
                            listType="picture"
                            beforeUpload={() => false}
                            onChange={({ file }) => {
                                const f = file?.originFileObj;
                                if (f) {
                                    setPreviewUrl(URL.createObjectURL(f));
                                }
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Choose New Image</Button>
                        </Upload>
                    </Form.Item>

                    {/* Hiển thị ảnh xem trước */}
                    {previewUrl && (
                        <div style={{ marginBottom: 16 }}>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "200px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    border: "1px solid #d9d9d9"
                                }}
                            />
                        </div>
                    )}

                    <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
                        <Button
                            onClick={handleCancel}
                            style={{ marginRight: 8 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateBookModal;