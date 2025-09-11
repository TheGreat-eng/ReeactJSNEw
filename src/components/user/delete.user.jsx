import { deleteUserById } from '../../services/api.service';
import { Modal, notification } from 'antd';


const DeleteUser = (props) => {

    const { isDeleteOpen, setIsDeleteOpen, idDelete, setIdDelete, loadUser } = props;
    const [api, contextHolder] = notification.useNotification();

    const handleOK = async () => {
        // Call delete API here
        await deleteUserById(idDelete);
        setIsDeleteOpen(false);
        setIdDelete(null);
        loadUser();
        api.success({
            message: "Delete Successful",
            description: "User account has been deleted.",
            placement: 'topRight',
            duration: 3
        });
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Delete User"
                open={isDeleteOpen}
                onOk={handleOK}
                onCancel={() => {
                    setIsDeleteOpen(false);
                    setIdDelete(null);
                }}
            >
                <p>Are you sure you want to delete user with ID: {idDelete}?</p>
            </Modal>
        </>
    )
}

export default DeleteUser;