import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useState, useEffect } from 'react';
import { fetchAllUserByApi } from '../services/api.service';


const UserPage = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);



    useEffect(() => {
        loadUser();
    }, [currentPage, pageSize]);


    const loadUser = async () => {
        setLoading(true);
        try {
            const response = await fetchAllUserByApi(currentPage, pageSize);
            console.log("Fetched users:", response);

            if (response && response.data) {
                // Thêm key cho mỗi item để Ant Design Table hoạt động đúng
                const usersWithKey = response.data.result.map(user => ({
                    ...user,
                    key: user._id // Sử dụng _id làm key nếu có
                }));
                setDataSource(usersWithKey);
                setCurrentPage(response.data.meta.current);
                setPageSize(response.data.meta.pageSize);
                setTotal(response.data.meta.total);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }

    console.log("check currentPage:", currentPage);

    // lift up state : “Lift up state” trong React nghĩa là nâng state lên một component cha
    // để nhiều component con có thể dùng chung dữ liệu đó.
    return (
        <div>
            <UserForm loadUser={loadUser} />
            <UserTable dataSource={dataSource}
                loading={loading}
                loadUser={loadUser}
                currentPage={currentPage}
                pageSize={pageSize}
                total={total}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
            //setTotal={setTotal}
            />
        </div>

    )
}

export default UserPage;