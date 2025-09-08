import './components/todo/todo.css'
import TodoNew from './components/todo/TodoNew.jsx'
import TodoData from './components/todo/TodoData.jsx'
import reactLogo from './assets/react.svg'
const App = () => {

  const hoidantit = "Eric";
  const age = 22;
  const data = {
    age: 22,
    city: "New York",
    country: "USA"
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew />

      <TodoData
        name={hoidantit}
        age={age}
        data={data}
      />
      <div className="todo-image">
        <img src={reactLogo} className='logo' />
      </div>
    </div>
  )
}

export default App
