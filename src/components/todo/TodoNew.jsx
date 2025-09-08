const TodoNew = (props) => {
    console.log("Props in TodoNew:", props);
    const { addNewTodo } = props;
    addNewTodo("Hello from TodoNew");
    return (
        <div className="todo-new">
            <input type="text" />
            <button >Add</button>
        </div>
    )
}
export default TodoNew;