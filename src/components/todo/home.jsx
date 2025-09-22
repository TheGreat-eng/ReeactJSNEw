import React from "react";
import { Button, Card, Typography, Input, List, Avatar } from "antd";
import { PlusOutlined, SmileOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const demoTodos = [
    { id: 1, text: "Read a book", icon: "📚" },
    { id: 2, text: "Go for a walk", icon: "🚶‍♂️" },
    { id: 3, text: "Learn React", icon: "⚛️" },
];

const Home = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "48px 16px",
            }}
        >
            <Card
                style={{
                    maxWidth: 500,
                    width: "100%",
                    borderRadius: 16,
                    boxShadow: "0 8px 32px rgba(60,60,120,0.08)",
                    marginBottom: 32,
                    background: "rgba(255,255,255,0.95)",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <SmileOutlined style={{ fontSize: 40, color: "#6366f1" }} />
                    <Title level={2} style={{ margin: "16px 0 0 0", color: "#3730a3" }}>
                        Welcome Home!
                    </Title>
                    <Paragraph style={{ color: "#6366f1" }}>
                        Organize your day with style and simplicity.
                    </Paragraph>
                </div>
                <Input.Search
                    placeholder="What do you want to do today?"
                    enterButton={<Button type="primary" icon={<PlusOutlined />}>Add</Button>}
                    size="large"
                    style={{ marginBottom: 24 }}
                />
                <List
                    itemLayout="horizontal"
                    dataSource={demoTodos}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        style={{
                                            background: "#6366f1",
                                            fontSize: 20,
                                        }}
                                    >
                                        {item.icon}
                                    </Avatar>
                                }
                                title={<span style={{ fontSize: 18 }}>{item.text}</span>}
                            />
                        </List.Item>
                    )}
                />
            </Card>
            <Paragraph style={{ color: "#64748b", marginTop: 24 }}>
                Made with <span style={{ color: "#f59e42" }}>❤</span> by you.
            </Paragraph>
        </div>
    );
};

export default Home;