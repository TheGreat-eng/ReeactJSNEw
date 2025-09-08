// () => {}  arrow function
// component = html + css + js
// component = function + return (html + css + js)
// component = function + return (jsx)  => reactjs
// component = function + return (tsx)  => reactjs + typescript

// function MyComponent() {
//   return <div>My Component</div>;
// }
import './style.css'
const MyComponent = () => {
    const name = {
        "name": "peter",
        "age": 22,
        "city": "New York"
    }; // object
    return (
        <>
            <div className="my-component">My Component</div>
            <div className="child">Additional content</div>
            <div className="name">Name: {name.name}</div>
            <div className="age">Age: {name.age}</div>
            <div className="city">City: {name.city}</div>
            <div className='object'>Object : {JSON.stringify(name)}</div>
        </>
    );
}

export default MyComponent;