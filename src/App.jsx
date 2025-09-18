import Header from './components/layout/header.jsx'
import Footer from './components/layout/footer.jsx'
import { Outlet } from 'react-router-dom'
import { App as AntApp } from 'antd'





const ParentComponent = (props) => {
  console.log('Props in ParentComponent:', props);
  return (
    <div>
      <div>Parent Component</div>
      {props.children}
    </div>
  )
}

const ChildrenComponent = (props) => {
  return (
    <div>
      Children Component
    </div>
  )
}


const App = () => {
  return (
    <>
      {/* <ParentComponent >
        <ChildrenComponent />
      </ParentComponent> */}
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App;