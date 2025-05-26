import "./TodoCard.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleDone } from "../actions/todoActions";
import {
  Circle,
  CircleCheck,
  Clock,
  FilePenLine,
  Pencil,
  SquareChevronRight,
  Trash2,
} from "lucide-react";
import { colors } from "../utility/constants";

const TodoCard = ({ todo, setId, toggleDeleteModal, setTodo, openModal }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    setTodo(todo);
    openModal();
  };

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
          <div>
            <p
              style={{
                textDecoration: todo.isComplete ? "line-through" : "none",
                color: todo.isComplete ? "#948f85" : "#F0E3CA",
              }}
            >
              {todo.title}
            </p>
            <p style={{ fontSize: "13px" }}>{todo.description}</p>
          </div>
          <div className="todo-desc">
            <div className="todo-info">
              <div
                className="todo-info-item"
                style={{ fontSize: "11px", color: `${colors[todo.priority]}` }}
              >
                <SquareChevronRight size={13} />
                <p>{todo.priority}</p>
              </div>

              {todo.deadline && !todo.isComplete && (
                <div
                  className="todo-info-item"
                  style={{ fontSize: "11px", color: "#5295f2" }}
                >
                  <Clock size={13} />
                  <p>{todo.deadline.split("-").reverse().join("-")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="todo-buttons">
        <button
          disabled={todo.isComplete}
          onClick={handleEdit}
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
  setTodo: PropTypes.func,
  openModal: PropTypes.func,
};

export default TodoCard;
