const TodoData = (props) => {

    const { todoList } = props;


    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                console.log(">>> Check map: ", item, index);
                return (<div className="todo-item">
                    <div >{item.id} - { }
                        {item.name}
                    </div>
                    <button>Delete X</button>
                </div >)
            })}
        </div >
    )
}

export default TodoData;