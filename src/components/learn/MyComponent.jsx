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
    return (
        <>
            <div className="my-component">My Component</div>
            <div className="child">Additional content</div>
        </>
    );
}

export default MyComponent;