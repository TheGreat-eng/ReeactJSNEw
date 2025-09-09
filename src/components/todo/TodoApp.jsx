import TodoNew from './TodoNew.jsx'
import TodoData from './TodoData.jsx'
import reactLogo from '../../assets/react.svg'
import { useState } from 'react'
import './todo.css'

const TodoApp = () => {
    const [todoList, setTodoList] = useState([])

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
    )
}

export default TodoApp;