import { Button, Input, notification, Form, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { createUserAPI, updateUserAPI } from "../../services/api.service";


const UpdateUserModal = (props) => {

    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const { isUpdateOpen, setIsUpdateOpen,
        dataUpdate, setDataUpdate, loadUser } = props;
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        console.log('Data update in modal: ', dataUpdate);
        if (dataUpdate) {
            setId(dataUpdate._id || "");
            setFullName(dataUpdate.fullName || "");
            setPhone(dataUpdate.phone || "");
        }
    }, [dataUpdate])

    const handleSubmit = async () => {
        // Validation đơn giản
        if (!fullName || !phone) {
            api.warning({
                message: "Validation Error",
                description: "Please fill in all fields",
                placement: 'topRight',
                duration: 3
            });
            return;
        }

        setLoading(true);

        try {
            await updateUserAPI(id, fullName, phone);

            api.success({
                message: "🎉 Success!",
                description: `User "${fullName}" has been updated successfully!`,
                placement: 'topRight',
                duration: 5
            });

            resetAndCloseModal();
            await loadUser();
        } catch (error) {
            api.error({
                message: "❌ Create user failed",
                description: error.response?.data?.message || error.message || "Something went wrong!",
                placement: 'topRight',
                duration: 5
            });
        } finally {
            setLoading(false);
        }
    };


    const resetAndCloseModal = () => {
        // Reset form
        setFullName("");
        setPhone("");
        setId("");
        setIsUpdateOpen(false);
        setDataUpdate(null);
    }


    return (
        <>
            {contextHolder}
            <Modal
                title="Update a User"
                open={isUpdateOpen}
                onOk={handleSubmit}
                onCancel={() => resetAndCloseModal()}
                confirmLoading={loading}
                maskClosable={false}
                okText="Save"
            >
                <Form layout="vertical">

                    <Form.Item label="Id">
                        <Input
                            type="text"
                            style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }}
                            value={id}
                            disabled
                        />
                    </Form.Item>

                    <Form.Item label="Full Name">
                        <Input
                            style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }}
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Phone Number">
                        <Input
                            style={{ borderRadius: 6, border: "1px solid #e0e6ed", fontSize: 15, padding: "9px 12px" }}
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateUserModal;