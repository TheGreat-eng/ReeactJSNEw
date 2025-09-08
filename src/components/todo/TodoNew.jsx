
const TodoNew = (props) => {
    console.log("Props in TodoNew:", props);
    const { addNewTodo } = props;

    const handleAddClick = () => {
        alert('New Todo Added');
    }


    const handleOnChange = (event) => {
        console.log(">>> Change", event.target.value);
    }

    return (
        <div className="todo-new">
            <input type="text"
                onChange={(event) => handleOnChange(event)} />
            <button style={{ cursor: 'pointer' }}
                onClick={handleAddClick}>Add</button>
        </div>
    )
}
export default TodoNew;