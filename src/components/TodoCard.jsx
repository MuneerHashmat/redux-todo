import "./TodoCard.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleDone } from "../actions/todoActions";
import {
  Circle,
  CircleCheck,
  CircleCheckBig,
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
            <p
              style={{ fontSize: "13px", color: !todo.description && "#948f85" }}
            >
              {todo.description ? todo.description : "No description"}
            </p>
          </div>
          <div className="todo-desc">
            <div className="todo-info">
              <div
                className="todo-info-item"
                style={{ fontSize: "11px", color: `${colors[todo.priority]}` }}
              >
                <SquareChevronRight size={13} />
                <p style={{ width: "45px" }}>{todo.priority}</p>
              </div>

              {!todo.isComplete ? (
                <div
                  className="todo-info-item"
                  style={{
                    fontSize: "11px",
                    color: todo.deadline ? "#5295f2" : "#3361a1",
                  }}
                >
                  <Clock size={13} />
                  <p>
                    {todo.deadline
                      ? todo.deadline.split("-").reverse().join("-")
                      : "no deadline"}
                  </p>
                </div>
              ) : (
                <div
                  className="todo-info-item"
                  style={{
                    fontSize: "11px",
                    color: "#6cc23e",
                  }}
                >
                  <CircleCheckBig size={13} />
                  <p>Completed</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="todo-data">
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
        <div
          className="todo-info-item"
          style={{ fontSize: "10px", color: "#8c8577" }}
        >
          <FilePenLine size={11} /> <p>{todo.date}</p>
        </div>
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
