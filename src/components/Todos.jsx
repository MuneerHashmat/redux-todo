import "./Todos.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../actions/todoActions";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import TodoCard from "./TodoCard";

const Todos = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (error) {
    toast.error("failed to fetch todos");
    console.log(error);
  }

  if (loading) {
    return (
      <div className="todo-container">
        <MoonLoader color="#FF8303" />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="no-todos">
        <hr />
        <h2>No todos</h2>
        <hr />
      </div>
    );
  }

  return (
    <div className="todo-container">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Todos;
