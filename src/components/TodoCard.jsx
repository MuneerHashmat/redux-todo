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
    <div className="w-full border border-[var(--brown-primary)] rounded-[10px] bg-[var(--dark-bg)] pt-[10px] pb-[7px] px-[10px] flex justify-between items-center">
      <div className="flex w-[80%] items-center gap-[20px] text-lg">
        <button
          onClick={() => dispatch(toggleDone(todo.id))}
          className="btn-primary border-none pt-[5px] hover:scale-100"
        >
          {!todo.isComplete ? (
            <Circle color="#FF8303" />
          ) : (
            <CircleCheck className="text-black bg-[#FF8303] rounded-[50%]" />
          )}
        </button>

        <div className="flex flex-col gap-[15px]">
          <div>
            <p
              className={
                todo.isComplete
                  ? "text-[#948f85] line-through"
                  : "text-[#F0E3CA]"
              }
            >
              {todo.title}
            </p>
            <p
              className={`text-[13px] ${!todo.description && "text-[#948f85]"}`}
            >
              {todo.description ? todo.description : "No description"}
            </p>
          </div>

          <div className="flex gap-[10px] sm:gap-[70px] items-center flex-wrap">
            <div
              className={`flex gap-[3px] items-center text-[11px]`}
              style={{ color: `${colors[todo.priority]}` }}
            >
              <SquareChevronRight size={13} />
              <p className="w-[45px]">{todo.priority}</p>
            </div>

            {!todo.isComplete ? (
              <div
                className={`flex gap-[3px] items-center text-[11px] ${
                  todo.deadline ? "text-[#5295f2]" : "text-[#3361a1]"
                }`}
              >
                <Clock size={13} />
                <p>
                  {todo.deadline
                    ? todo.deadline.split("-").reverse().join("-")
                    : "no deadline"}
                </p>
              </div>
            ) : (
              <div className="flex gap-[3px] items-center text-[11px] text-[#6cc23e]">
                <CircleCheckBig size={13} />
                <p>Completed</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[17px]">
        <div className="flex gap-[10px] items-center">
          <button
            disabled={todo.isComplete}
            onClick={handleEdit}
            className={`btn-primary p-[5px] rounded-[5px] ${
              todo.isComplete && "cursor-not-allowed hover:scale-100"
            }`}
          >
            <Pencil color={!todo.isComplete ? "#FF8303" : "#945b21"} />
          </button>

          <button onClick={handleDelete} className="btn-primary p-[5px] rounded-[5px]">
            <Trash2 color="#FF8303" />
          </button>
        </div>
        <div
          className="flex gap-[3px] items-center text-[10px] text-[#8c8577]"
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
