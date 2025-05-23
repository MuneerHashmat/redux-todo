import "./TodoCard.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleDone } from "../actions/todoActions";
import {
  Circle,
  CircleCheck,
  FilePenLine,
  Pencil,
  Save,
  Trash2,
} from "lucide-react";

const TodoCard = ({ todo, setId, toggleDeleteModal }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    setId(todo.id);
    toggleDeleteModal();
  };
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

        <div className="todo-content">
          <p
            style={{
              textDecoration: todo.isComplete ? "line-through" : "none",
              color: todo.isComplete ? "#948f85" : "#F0E3CA",
            }}
          >
            {todo.title}
          </p>
          <p style={{ fontSize: "10px" }}>
            <FilePenLine size={17} style={{ paddingTop: "5px" }} /> {todo.date}
          </p>
        </div>
      </div>

      <div className="todo-buttons">
        <button
          disabled={todo.isComplete}
          className={`btn-primary edit-btn ${
            todo.isComplete && "disabled-btn"
          }`}
        >
          <Pencil color={!todo.isComplete ? "#FF8303" : "#945b21"} />
        </button>

        <button onClick={handleDelete} className="btn-primary delete-btn">
          <Trash2 color="#FF8303" />
        </button>
      </div>
    </div>
  );
};

TodoCard.propTypes = {
  todo: PropTypes.object,
  setId: PropTypes.func,
  toggleDeleteModal: PropTypes.func,
};

export default TodoCard;
