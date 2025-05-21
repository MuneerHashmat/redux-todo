import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import getDate from "../utility/date";
import { addTodo } from "../actions/todoActions";

const CreateTodos = () => {
  const dispatch = useDispatch();
  const [todoContent, setTodoContent] = useState("");
  const handleCreateTodo = () => {
    if (todoContent.trim() === "") {
      alert("Todo must not be empty");
      return;
    }
    const currDate = getDate();
    const newTodo = {
      id: uuidv4(),
      text: todoContent.trim(),
      editTodo: false,
      isComplete: false,
      date: currDate,
    };

    dispatch(addTodo(newTodo));
    setTodoContent("");
  };
  return (
    <div className="flex gap-5 items-center">
      <input
        type="text"
        value={todoContent}
        onChange={(e) => setTodoContent(e.target.value)}
        className="w-[600px] outline-none border-2 border-gray-400 p-2 text-xl rounded-lg"
      />

      <button
        onClick={handleCreateTodo}
        className=" px-5 py-2 bg-red-400 rounded-lg text-xl font-bold font-mono hover:scale-105 transition-all"
      >
        Add
      </button>
    </div>
  );
};

export default CreateTodos;
