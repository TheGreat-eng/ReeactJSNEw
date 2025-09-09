import './components/todo/todo.css'
import TodoNew from './components/todo/TodoNew.jsx'
import TodoData from './components/todo/TodoData.jsx'
import reactLogo from './assets/react.svg'
import { useState } from 'react'
import Header from './components/layout/header.jsx'

import Footer from './components/layout/footer.jsx'
import { Outlet } from 'react-router-dom'
const App = () => {

  const [todoList, setTodoList] = useState([

  ])

  // console.log(">>> Check todos: ", todos);

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(3, 1000),
      name: name
    }

    setTodoList([...todoList, newTodo]);
  }

  const handleDeleteTodo = (id) => {
    setTodoList(todoList.filter(item => item.id !== id));
  }

  const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <>
      <Header />


      <div className="todo-container">
        <div className="todo-title">Todo List</div>
        <TodoNew
          addNewTodo={addNewTodo} />

        {todoList.length > 0 ? (
          <TodoData
            todoList={todoList}
            handleDeleteTodo={handleDeleteTodo}
          />
        ) : (
          <div className="todo-image">
            <img src={reactLogo} className='logo' />
          </div>
        )}
      </div>
      <Outlet />
      <Footer />

    </>
  )
}

export default App;