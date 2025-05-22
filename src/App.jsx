import "./App.css"
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="main-container">
      <CreateTodo />
      <Todos />
    </div>
  );
}

export default App;
