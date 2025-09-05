import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// () => {}  arrow function
// component = html + css + js
// component = function + return (html + css + js)
// component = function + return (jsx)  => reactjs
// component = function + return (tsx)  => reactjs + typescript

// function MyComponent() {
//   return <div>My Component</div>;
// }

const MyComponent = () => {
  return (
    <>
      <div>My Component</div>
      <div>Additional content</div>
    </>
  );
}

const App = () => {
  const [count, setCount] = useState(0)

  // function myFunction() {
  //   console.log("Hello from myFunction!");
  // }

  const myFunction = () => {
    console.log(">>> RUN My arrow function!");
  }

  myFunction();


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello World !!!</h1>
      <MyComponent></MyComponent>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
