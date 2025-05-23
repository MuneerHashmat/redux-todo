import { useState } from "react";
import "./TodoCard.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  toggleDone,
  toggleUpdate,
  updateTodo,
} from "../actions/todoActions";
import {
  Circle,
  CircleCheck,
  FilePenLine,
  Pencil,
  Save,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

const TodoCard = ({ todo, setId, toggleDeleteModal }) => {
  const dispatch = useDispatch();
  const [editedText, setEditedText] = useState(todo.text);

  const handleSave = () => {
    let text = editedText.trim();
    if (text === "") {
      toast.error("Can't save empty todo");
      return;
    }

    dispatch(updateTodo(todo.id, text));
    dispatch(toggleUpdate(todo.id));
  };


  const handleDelete=()=>{
    setId(todo.id)
    toggleDeleteModal();
  }
  return (
    <div className="todo-card">
      <div className="todo-main">
        <button
          onClick={() => dispatch(toggleDone(todo.id))}
          disabled={todo.editTodo}
          className={`btn-primary toggle-done ${
            todo.editTodo && "disabled-btn"
          }`}
        >
          {!todo.isComplete ? (
            <Circle color={!todo.editTodo ? "#FF8303" : "#945b21"} />
          ) : (
            <CircleCheck
              style={{ backgroundColor: "#FF8303", borderRadius: "50%" }}
            />
          )}
        </button>

        {!todo.editTodo ? (
          <div className="todo-content">
            <p
              style={{
                textDecoration: todo.isComplete ? "line-through" : "none",
                color: todo.isComplete ? "#948f85" : "#F0E3CA",
              }}
            >
              {todo.text}
            </p>
            <p style={{ fontSize: "10px" }}>
              <FilePenLine size={17} style={{ paddingTop: "5px" }} />{" "}
              {todo.date}
            </p>
          </div>
        ) : (
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            type="text"
            className="todo-edit-input"
          />
        )}
      </div>

      <div className="todo-buttons">
        {!todo.editTodo ? (
          <button
            onClick={() => dispatch(toggleUpdate(todo.id))}
            disabled={todo.isComplete}
            className={`btn-primary edit-btn ${
              todo.isComplete && "disabled-btn"
            }`}
          >
            <Pencil color={!todo.isComplete ? "#FF8303" : "#945b21"} />
          </button>
        ) : (
          <button onClick={handleSave} className="btn-primary save-btn">
            <Save color="#FF8303" />
          </button>
        )}

        <button
          onClick={handleDelete}
          className="btn-primary delete-btn"
        >
          <Trash2 color="#FF8303" />
        </button>
      </div>
    </div>
  );
};

TodoCard.propTypes = {
  todo: PropTypes.object,
  setId: PropTypes.func,
  toggleDeleteModal: PropTypes.func
};

export default TodoCard;
