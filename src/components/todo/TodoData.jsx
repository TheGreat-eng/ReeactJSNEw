const TodoData = (props) => {

    const { name, age, data } = props;


    return (
        <div className="todo-data">
            <div>Learning React</div>
            <div>Watching Youtube</div>
            <div>Name: {name}</div>
            <div>Age: {age}</div>
            <div>City: {data.city}</div>
            <div>Country: {data.country}</div>
        </div>
    )
}

export default TodoData;