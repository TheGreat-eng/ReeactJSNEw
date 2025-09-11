import { Modal } from "antd";


const ViewUserModal = (props) => {

    const { viewData, setViewData } = props;


    return (
        <>
            <Modal
                title="User Details"
                open={!!viewData}
                onCancel={() => setViewData(null)}
                footer={null}
            >
                {viewData && (
                    <div className="user-detail-table">
                        <p><strong>ID:</strong> {viewData._id}</p>
                        <p><strong>Full Name:</strong> {viewData.fullName}</p>
                        <p><strong>Email:</strong> {viewData.email}</p>
                        <p><strong>Phone:</strong> {viewData.phone}</p>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default ViewUserModal;