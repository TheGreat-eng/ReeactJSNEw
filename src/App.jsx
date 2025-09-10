import Header from './components/layout/header.jsx'
import Footer from './components/layout/footer.jsx'
import { Outlet } from 'react-router-dom'
import { App as AntApp } from 'antd'

const App = () => {
  return (
    <AntApp>
      <Header />
      <Outlet />
      <Footer />
    </AntApp>
  )
}

export default App;