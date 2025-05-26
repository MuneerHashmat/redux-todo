import "./Todos.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, removeTodo } from "../actions/todoActions";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import TodoCard from "./TodoCard";
import DeleteModal from "./modals/DeleteModal";
import TodoContentModal from "./modals/TodoContentModal";
import { tabs } from "../utility/constants";
import { filterTodos } from "../utility/filterTodos";

const Todos = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state);
  const [currId, setCurrId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currTodo, setCurrTodo] = useState(null);
  const [currTab, setCurrTab] = useState(tabs[0].name);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  let filteredTodos = filterTodos(todos, currTab);

  filteredTodos.sort((a, b) => {
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const setTodo = (todo) => {
    setCurrTodo(todo);
  };

  const setId = (id) => {
    setCurrId(id);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  const deleteTodo = (id) => {
    dispatch(removeTodo(id));
  };

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
    <>
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            className={`tab-btn ${tab.name === currTab && "tab-active"}`}
            onClick={() => setCurrTab(tab.name)}
            key={tab.name}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="todo-container">
        {filteredTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            setId={setId}
            toggleDeleteModal={toggleDeleteModal}
            setTodo={setTodo}
            openModal={openModal}
          />
        ))}
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          currId={currId}
          deleteTodo={deleteTodo}
          toggleDeleteModal={toggleDeleteModal}
        />
        <TodoContentModal
          type="edit"
          todo={currTodo}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

export default Todos;
