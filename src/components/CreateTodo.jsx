import { useState } from "react";
import "./CreateTodo.css";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todoActions";
import { v4 as uuidv4 } from "uuid";
import getDate from "../utility/date";

const CreateTodo = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let text = textInput.trim();
    if (text === "") {
      toast.error("Todo can't be empty");
      return;
    }

    const currDate = getDate();
    const newTodo = {
      id: uuidv4(),
      text: text,
      editTodo: false,
      date: currDate,
    };

    dispatch(addTodo(newTodo));
    toast.success("todo created");
    setTextInput("");
  };

  return (
    <div className="create-todo-container">
      <div className="header">
        <img src="/logo.png" alt="logo" width={30} />
        <h2>todo</h2>
      </div>

      <form onSubmit={handleOnSubmit} className="form-container">
        <input
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          type="text"
          className="text-input"
          placeholder="Enter your todo here"
        />
        <button type="submit" className="btn-primary btn-submit">
          <Plus color="#FF8303" size={35} />
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
