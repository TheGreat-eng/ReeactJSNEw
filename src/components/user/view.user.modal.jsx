import { Button, Modal } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from "react";


const ViewUserModal = (props) => {
    const { viewData, setViewData } = props;

    // Debug để xem cấu trúc dữ liệu
    console.log("ViewData structure:", viewData);

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleUploadAvatar = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreviewUrl(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    console.log("Selected file:", selectedFile);
    console.log("Preview URL:", previewUrl);
    return (
        <>
            <Modal
                title="User Details"
                open={!!viewData}
                onCancel={() => setViewData(null)}
                footer={null}
                width={600}
            >
                {viewData && (
                    <div className="user-detail-table">
                        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                            {/* Kiểm tra các trường có thể chứa avatar */}
                            {viewData.avatar && (
                                <img
                                    src={`${import.meta.env.VITE_BASE_URL}/images/avatar/${viewData.avatar}`}
                                    alt="User Avatar"
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid #d9d9d9'
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            )}
                            {/* Nút Upload Avatar căn giữa ngay dưới hình */}
                            <div style={{ marginTop: '16px' }}>
                                {/* <Button type="primary" icon={<UploadOutlined />}>Upload Avatar</Button> */}

                                <label htmlFor="upload-avatar" style={{ cursor: 'pointer' }}>
                                    <UploadOutlined /> Upload Avatar
                                </label>
                                <input
                                    id="upload-avatar"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleUploadAvatar}
                                />

                            </div>
                            {previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt="User Avatar"
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid #d9d9d9'
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />)}
                        </div>
                        <div style={{ lineHeight: '2' }}>
                            <p><strong>ID:</strong> {viewData._id}</p>
                            <p><strong>Full Name:</strong> {viewData.fullName}</p>
                            <p><strong>Email:</strong> {viewData.email}</p>
                            <p><strong>Phone:</strong> {viewData.phone}</p>

                            {/* Debug info - xóa sau khi test xong */}
                            <details style={{ marginTop: '20px', fontSize: '12px' }}>
                                <summary>Debug Info (click to expand)</summary>
                                <pre style={{
                                    background: '#f5f5f5',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    overflow: 'auto',
                                    maxHeight: '200px'
                                }}>
                                    {JSON.stringify(viewData, null, 2)}
                                </pre>
                            </details>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default ViewUserModal;