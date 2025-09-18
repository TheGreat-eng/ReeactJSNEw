import Header from './components/layout/header.jsx'
import Footer from './components/layout/footer.jsx'
import { Outlet } from 'react-router-dom'
import { App as AntApp } from 'antd'



import { Spin } from 'antd';

import { getAccountAPI } from './services/api.service.js';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from './components/context/auth.context.jsx';


const App = () => {

  const { setUser, isAppLoading,
    setIsAppLoading
  } = useContext(AuthContext);




  useEffect(() => {
    fetchUserInfor();
  }, []);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


  const fetchUserInfor = async () => {
    const res = await getAccountAPI();
    await delay(2000);
    if (res.data) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
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
      ) : <>
        <Header />
        <Outlet />
        <Footer />
      </>
      }


    </>
  );
}

export default App;