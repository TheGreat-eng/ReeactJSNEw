import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useState, useEffect } from 'react';
import { fetchAllUserByApi } from '../services/api.service';


const UserPage = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        setLoading(true);
        try {
            const response = await fetchAllUserByApi();
            console.log("Fetched users:", response);

            if (response && response.data) {
                // Thêm key cho mỗi item để Ant Design Table hoạt động đúng
                const usersWithKey = response.data.map(user => ({
                    ...user,
                    key: user._id // Sử dụng _id làm key nếu có
                }));
                setDataSource(usersWithKey);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }

    // lift up state : “Lift up state” trong React nghĩa là nâng state lên một component cha 
    // để nhiều component con có thể dùng chung dữ liệu đó.
    return (
        <div>
            <UserForm loadUser={loadUser} />
            <UserTable dataSource={dataSource} loading={loading} loadUser={loadUser} />
        </div>

    )
}

export default UserPage;