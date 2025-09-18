import Header from './components/layout/header.jsx'
import Footer from './components/layout/footer.jsx'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd';

import { getAccountAPI } from './services/api.service.js';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from './components/context/auth.context.jsx';

const App = () => {

  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfor();
  }, []);

  const fetchUserInfor = async () => {
    try {
      // Kiểm tra xem có access_token trong localStorage không
      const token = localStorage.getItem('access_token');

      // if (!token) {
      //   // Nếu không có token, set loading = false và không gọi API
      //   setIsAppLoading(false);
      //   return;
      // }

      // Chỉ gọi API khi có token
      const res = await getAccountAPI();
      if (res && res.data) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      // Nếu có lỗi (token hết hạn, server lỗi), xóa token và reset user
      localStorage.removeItem('access_token');
      setUser({
        email: "",
        fullName: "",
        phone: "",
        avatar: "",
        role: "",
        _id: ""
      });
    } finally {
      // Luôn set loading = false ở cuối
      setIsAppLoading(false);
    }
  }

  return (
    <>
      {isAppLoading === true ? (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 9999,
        }}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;