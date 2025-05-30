import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="w-[95vw] md:w-[80vw] lg:w-[65vw] xl:w-[50vw] mx-auto text-[var(--light-primary)]">
      <CreateTodo />
      <Todos />
    </div>
  );
}

export default App;
