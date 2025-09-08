import React, { useState } from "react";


const TodoNew = (props) => {
    // const valueInput = "eric";
    const [valueInput, setValueInput] = useState("eric");
    // console.log(">>> Check valueInput: ", valueInput);

    const { addNewTodo } = props;


    const handleAddClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }


    const handleOnChange = (name) => {
        setValueInput(name);
    }

    return (
        <div className="todo-new">
            <input type="text"
                onChange={(event) => handleOnChange(event.target.value)}
                value={valueInput}
            />


            <button style={{ cursor: 'pointer' }}
                onClick={handleAddClick}>Add</button>

            <div>My text input is: {valueInput}</div>
        </div>
    )
}
export default TodoNew;