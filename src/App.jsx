import './components/todo/todo.css'
import TodoNew from './components/todo/TodoNew.jsx'
import TodoData from './components/todo/TodoData.jsx'
import reactLogo from './assets/react.svg'
import { useState } from 'react'
const App = () => {

  const [todoList, setTodoList] = useState([
    { id: 1, name: "Lean ReactJS" },
    { id: 2, name: "Watching Youtube" },

  ])
  // console.log(">>> Check todos: ", todos);

  const hoidantit = "Eric";
  const age = 22;
  const data = {
    age: 22,
    city: "New York",
    country: "USA"
  }

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(3, 1000),
      name: name
    }

    setTodoList([...todoList, newTodo]);
  }

  const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo} />

      <TodoData
        name={hoidantit}
        age={age}
        data={data}
        todoList={todoList}
      />
      <div className="todo-image">
        <img src={reactLogo} className='logo' />
      </div>
    </div>
  )
}

export default App
