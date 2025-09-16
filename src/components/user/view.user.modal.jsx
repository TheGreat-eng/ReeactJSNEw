import { Button, Modal, Card, Avatar, Typography, Divider, Space, Tag, message, notification } from "antd";
import { UploadOutlined, UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, CalendarOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import { handleUploadFile, updateUserAvatar } from "../../services/api.service";

const { Title, Text } = Typography;

const ViewUserModal = (props) => {
    const { viewData, setViewData, loadUser } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Lấy api và contextHolder từ notification
    const [api, contextHolder] = notification.useNotification();

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

    const handleUpdateUserAvatar = async () => {
        setUploading(true);
        try {
            const resUpload = await handleUploadFile(selectedFile, 'avatar');
            if (resUpload.data) {
                const newAvatarFilename = resUpload.data.fileUploaded;
                const resUpdateAvatar = await updateUserAvatar(
                    newAvatarFilename,
                    viewData._id,
                    viewData.fullName,
                    viewData.phone
                );
                if (resUpdateAvatar && resUpdateAvatar.data) {
                    setViewData(prev => ({
                        ...prev,
                        avatar: newAvatarFilename
                    }));
                    // Tải lại danh sách người dùng
                    await loadUser();
                    // Dùng api.success thay cho notification.success
                    api.success({
                        message: "Cập nhật avatar thành công!",
                        description: "Ảnh đại diện của bạn đã được cập nhật.",
                        placement: "topRight",
                        duration: 3
                    });
                }
            }
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            api.error({
                message: "Cập nhật avatar thất bại!",
                description: error.message || "Đã có lỗi xảy ra.",
                placement: "topRight"
            });
        } finally {
            setUploading(false);
        }
    };

    const handleCancelUpload = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        const fileInput = document.getElementById('upload-avatar');
        if (fileInput) fileInput.value = '';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'ADMIN': return 'red';
            case 'USER': return 'blue';
            default: return 'default';
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                title={
                    <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
                        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                            <UserOutlined /> User Information
                        </Title>
                    </div>
                }
                open={!!viewData}
                onCancel={() => {
                    setViewData(null);
                    handleCancelUpload();
                }}
                footer={null}
                width={650}
                style={{ top: 20 }}
            >
                {viewData && (
                    <div style={{ padding: '10px 0' }}>
                        {/* Avatar Section */}
                        <Card
                            style={{
                                marginBottom: '24px',
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    {previewUrl ? (
                                        <Avatar
                                            size={120}
                                            src={previewUrl}
                                            style={{
                                                border: '4px solid #1890ff',
                                                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)'
                                            }}
                                        />
                                    ) : (
                                        <Avatar
                                            size={120}
                                            src={viewData.avatar ? `${import.meta.env.VITE_BASE_URL}/images/avatar/${viewData.avatar}` : null}
                                            icon={!viewData.avatar && <UserOutlined />}
                                            style={{
                                                border: '4px solid #d9d9d9',
                                                backgroundColor: '#f0f2f5'
                                            }}
                                        />
                                    )}
                                </div>

                                <div style={{ marginTop: '16px' }}>
                                    <Title level={4} style={{ margin: '8px 0', color: '#262626' }}>
                                        {viewData.fullName}
                                    </Title>
                                    <Tag color={getRoleColor(viewData.role)} style={{ fontSize: '12px', padding: '4px 12px' }}>
                                        {viewData.role}
                                    </Tag>
                                    <div style={{ marginTop: '8px' }}>
                                        <Tag color={viewData.isActive ? 'green' : 'red'}>
                                            {viewData.isActive ? 'Active' : 'Inactive'}
                                        </Tag>
                                    </div>
                                </div>

                                {/* Upload Controls */}
                                {!previewUrl ? (
                                    <div style={{ marginTop: '16px' }}>
                                        <label
                                            htmlFor="upload-avatar"
                                            style={{
                                                cursor: 'pointer',
                                                color: '#1890ff',
                                                padding: '8px 16px',
                                                border: '1px dashed #1890ff',
                                                borderRadius: '6px',
                                                display: 'inline-block',
                                                transition: 'all 0.3s',
                                                backgroundColor: '#f6ffed'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#e6f7ff';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = '#f6ffed';
                                            }}
                                        >
                                            <UploadOutlined /> Change Avatar
                                        </label>
                                        <input
                                            id="upload-avatar"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleUploadAvatar}
                                        />
                                    </div>
                                ) : (
                                    <div style={{ marginTop: '16px' }}>
                                        <Space>
                                            <Button
                                                type="primary"
                                                loading={uploading}
                                                onClick={handleUpdateUserAvatar}
                                                size="middle"
                                            >
                                                {uploading ? 'Uploading...' : 'Save Avatar'}
                                            </Button>
                                            <Button onClick={handleCancelUpload} size="middle">
                                                Cancel
                                            </Button>
                                        </Space>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* User Details Section */}
                        <Card
                            title={<span><IdcardOutlined /> Personal Details</span>}
                            style={{
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div style={{ padding: '8px 0' }}>
                                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                    <IdcardOutlined style={{ color: '#1890ff', marginRight: '12px', fontSize: '16px' }} />
                                    <div>
                                        <Text strong style={{ color: '#595959' }}>User ID:</Text>
                                        <br />
                                        <Text copyable style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                                            {viewData._id}
                                        </Text>
                                    </div>
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                    <UserOutlined style={{ color: '#52c41a', marginRight: '12px', fontSize: '16px' }} />
                                    <div>
                                        <Text strong style={{ color: '#595959' }}>Full Name:</Text>
                                        <br />
                                        <Text style={{ fontSize: '15px', color: '#262626' }}>
                                            {viewData.fullName}
                                        </Text>
                                    </div>
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                    <MailOutlined style={{ color: '#fa8c16', marginRight: '12px', fontSize: '16px' }} />
                                    <div>
                                        <Text strong style={{ color: '#595959' }}>Email:</Text>
                                        <br />
                                        <Text copyable style={{ fontSize: '15px', color: '#262626' }}>
                                            {viewData.email}
                                        </Text>
                                    </div>
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                    <PhoneOutlined style={{ color: '#722ed1', marginRight: '12px', fontSize: '16px' }} />
                                    <div>
                                        <Text strong style={{ color: '#595959' }}>Phone:</Text>
                                        <br />
                                        <Text copyable style={{ fontSize: '15px', color: '#262626' }}>
                                            {viewData.phone}
                                        </Text>
                                    </div>
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ flex: 1, marginRight: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                            <CalendarOutlined style={{ color: '#13c2c2', marginRight: '8px' }} />
                                            <Text strong style={{ color: '#595959', fontSize: '13px' }}>Created:</Text>
                                        </div>
                                        <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
                                            {formatDate(viewData.createdAt)}
                                        </Text>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                            <CalendarOutlined style={{ color: '#eb2f96', marginRight: '8px' }} />
                                            <Text strong style={{ color: '#595959', fontSize: '13px' }}>Updated:</Text>
                                        </div>
                                        <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
                                            {formatDate(viewData.updatedAt)}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Debug Section - Có thể ẩn trong production */}
                        {import.meta.env.VITE_DEBUG === 'true' && (
                            <Card
                                title="Debug Information"
                                size="small"
                                style={{
                                    marginTop: '16px',
                                    borderRadius: '8px',
                                    opacity: 0.8
                                }}
                            >
                                <details>
                                    <summary style={{ cursor: 'pointer', color: '#1890ff' }}>
                                        View Raw Data
                                    </summary>
                                    <pre style={{
                                        background: '#f5f5f5',
                                        padding: '12px',
                                        borderRadius: '4px',
                                        overflow: 'auto',
                                        maxHeight: '200px',
                                        fontSize: '11px',
                                        marginTop: '8px'
                                    }}>
                                        {JSON.stringify(viewData, null, 2)}
                                    </pre>
                                </details>
                            </Card>
                        )}
                    </div>
                )}
            </Modal>
        </>
    )
}

export default ViewUserModal;