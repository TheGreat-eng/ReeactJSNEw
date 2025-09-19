import { Modal, Avatar, Card, Typography, Divider, Tag } from 'antd';
import { BookOutlined, EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ViewBookDetail = (props) => {
    const { dataDetail, isDetailModalOpen, setIsDetailModalOpen } = props;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <>
            <Modal
                title={
                    <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
                        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                            <BookOutlined /> Book Information
                        </Title>
                    </div>
                }
                open={isDetailModalOpen}
                onCancel={() => setIsDetailModalOpen(false)}
                footer={null}
                width={650}
                style={{ top: 20 }}
            >
                {dataDetail && (
                    <div style={{ padding: '10px 0' }}>
                        {/* Book Cover Section */}
                        <Card
                            style={{
                                marginBottom: '24px',
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <Avatar
                                        size={120}
                                        src={dataDetail.thumbnail ? `${import.meta.env.VITE_BASE_URL}/images/book/${dataDetail.thumbnail}` : null}
                                        icon={!dataDetail.thumbnail && <BookOutlined />}
                                        style={{
                                            border: '4px solid #1890ff',
                                            backgroundColor: '#f0f2f5',
                                            boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)'
                                        }}
                                        shape="square"
                                    />
                                </div>

                                <div style={{ marginTop: '16px' }}>
                                    <Title level={4} style={{ margin: '8px 0', color: '#262626' }}>
                                        {dataDetail.mainText}
                                    </Title>
                                    <Text style={{ fontSize: '16px', color: '#666', fontStyle: 'italic' }}>
                                        by {dataDetail.author}
                                    </Text>
                                    <div style={{ marginTop: '8px' }}>
                                        <Tag color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>
                                            {formatPrice(dataDetail.price)}
                                        </Tag>
                                    </div>
                                    <div style={{ marginTop: '8px' }}>
                                        <Tag color={dataDetail.quantity > 0 ? 'green' : 'red'}>
                                            {dataDetail.quantity > 0 ? `In Stock (${dataDetail.quantity})` : 'Out of Stock'}
                                        </Tag>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Book Details Section */}
                        <Card
                            title={<span><BookOutlined /> Book Details</span>}
                            style={{
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div style={{ padding: '8px 0' }}>
                                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                    <BookOutlined style={{ color: '#1890ff', marginRight: '12px', fontSize: '16px' }} />
                                    <div>
                                        <Text strong style={{ color: '#595959' }}>Book ID:</Text>
                                        <br />
                                        <Text copyable style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                                            {dataDetail._id}
                                        </Text>
                                    </div>
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                    <BookOutlined style={{ color: '#52c41a', marginRight: '12px', fontSize: '16px' }} />
                                    <div>
                                        <Text strong style={{ color: '#595959' }}>Title:</Text>
                                        <br />
                                        <Text style={{ fontSize: '15px', color: '#262626' }}>
                                            {dataDetail.mainText}
                                        </Text>
                                    </div>
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                    <EditOutlined style={{ color: '#fa8c16', marginRight: '12px', fontSize: '16px' }} />
                                    <div>
                                        <Text strong style={{ color: '#595959' }}>Author:</Text>
                                        <br />
                                        <Text style={{ fontSize: '15px', color: '#262626' }}>
                                            {dataDetail.author}
                                        </Text>
                                    </div>
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#722ed1', marginRight: '12px', fontSize: '16px' }}>💰</span>
                                    <div>
                                        <Text strong style={{ color: '#595959' }}>Price:</Text>
                                        <br />
                                        <Text style={{ fontSize: '15px', color: '#262626', fontWeight: 'bold' }}>
                                            {formatPrice(dataDetail.price)}
                                        </Text>
                                    </div>
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#13c2c2', marginRight: '12px', fontSize: '16px' }}>📦</span>
                                    <div>
                                        <Text strong style={{ color: '#595959' }}>Quantity:</Text>
                                        <br />
                                        <Text style={{ fontSize: '15px', color: '#262626' }}>
                                            {dataDetail.quantity} units
                                        </Text>
                                    </div>
                                </div>

                                {/* Thumbnail Information */}
                                {dataDetail.thumbnail && (
                                    <>
                                        <Divider style={{ margin: '12px 0' }} />
                                        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                            <span style={{ color: '#eb2f96', marginRight: '12px', fontSize: '16px' }}>🖼️</span>
                                            <div>
                                                <Text strong style={{ color: '#595959' }}>Thumbnail:</Text>
                                                <br />
                                                <Text style={{ fontSize: '13px', color: '#8c8c8c' }}>
                                                    {dataDetail.thumbnail}
                                                </Text>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Timestamp Section */}
                                {(dataDetail.createdAt || dataDetail.updatedAt) && (
                                    <>
                                        <Divider style={{ margin: '12px 0' }} />
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {dataDetail.createdAt && (
                                                <div style={{ flex: 1, marginRight: '16px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                        <span style={{ color: '#13c2c2', marginRight: '8px' }}>📅</span>
                                                        <Text strong style={{ color: '#595959', fontSize: '13px' }}>Created:</Text>
                                                    </div>
                                                    <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
                                                        {formatDate(dataDetail.createdAt)}
                                                    </Text>
                                                </div>
                                            )}
                                            {dataDetail.updatedAt && (
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                        <span style={{ color: '#eb2f96', marginRight: '8px' }}>🔄</span>
                                                        <Text strong style={{ color: '#595959', fontSize: '13px' }}>Updated:</Text>
                                                    </div>
                                                    <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
                                                        {formatDate(dataDetail.updatedAt)}
                                                    </Text>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </Card>

                        {/* Debug Section - Optional */}
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
                                        {JSON.stringify(dataDetail, null, 2)}
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

export default ViewBookDetail