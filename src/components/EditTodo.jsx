import PropTypes from "prop-types";
import { useState } from "react";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { useDispatch } from "react-redux";
import { toggleUpdate, updateTodo } from "../actions/todoActions";

const EditTodo = ({ todo }) => {
  const dispatch = useDispatch();

  const [editedContent, setEditedContent] = useState(todo.text);

  const handleSaveTodo = (todoId) => {
    dispatch(updateTodo(todoId, editedContent));
    dispatch(toggleUpdate(todoId));
  };

  return (
    <div className="flex gap-5">
      <input
        type="text"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="text-xl px-2 py-1 outline-none rounded-lg border border-gray-400 w-[450px]"
      />

      <button
        onClick={() => handleSaveTodo(todo.id)}
        className="hover:scale-105 transition-all"
      >
        <CloudDoneIcon
          sx={{
            backgroundColor: "#f87171",
            borderRadius: "50%",
            padding: "2px 5px",
            fontSize: "35px",
          }}
        />
      </button>
    </div>
  );
};

EditTodo.propTypes = {
  todo: PropTypes.object,
};

export default EditTodo;
