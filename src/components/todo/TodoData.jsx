const TodoData = (props) => {

    const { todoList, handleDeleteTodo } = props;



    const handleDeleteClick = (id) => {
        handleDeleteTodo(id);
    }
    // console.log(">>> Check props: ", props);



    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                console.log(">>> Check map: ", item, index);
                return (<div className="todo-item" key={item.id}>
                    <div >{item.id} - { }
                        {item.name}
                    </div>
                    <button style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteClick(item.id)}>Delete X</button>
                </div>)
            })}
        </div>
    )

}
export default TodoData;