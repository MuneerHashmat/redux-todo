import "./TodoContentModal.css";
import PropTypes from "prop-types";
import { priorities } from "../../utility/constants";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import getDate from "../../utility/date";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../../actions/todoActions";

const TodoContentModal = ({ isOpen, type, todo, closeModal }) => {
  let initialState = {
    title: "",
    description: "",
    priority: "",
  };


  const [inputFields, setInputFields] = useState(initialState);
  useEffect(() => {
    if (todo) {
      setInputFields({
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
      });
    } else {
      setInputFields({
        title: "",
        description: "",
        priority: "",
      });
    }
  }, [todo, isOpen]);

  console.log(inputFields);
  
  const dispatch = useDispatch();

  const handleOnChange = (key, value) => {
    setInputFields({ ...inputFields, [key]: value });
  };

  const handleOnSave = (e) => {
    e.preventDefault();
    if (
      !inputFields.title ||
      !inputFields.description ||
      !inputFields.priority
    ) {
      toast.error("All fields are required");
      return;
    }

    if (type === "create") {
      let newTodo = {
        id: uuidv4(),
        title: inputFields.title,
        description: inputFields.description,
        priority: inputFields.priority,
        isComplete: false,
        date: getDate(),
      };

      dispatch(addTodo(newTodo));
      toast.success("Todo created");
    } else {
      let newTodo = {
        id: todo.id,
        title: inputFields.title,
        description: inputFields.description,
        priority: inputFields.priority,
        isComplete: false,
        date: getDate(),
      };
      dispatch(updateTodo(newTodo))
    }

    setInputFields({
      title: "",
      description: "",
      priority: "",
    });
    closeModal();
  };

  const handleClose = () => {
    setInputFields({
      title: "",
      description: "",
      priority: "",
    });
    closeModal();
  };

  return (
    <div className={`modal-container ${isOpen && "visible"}`}>
      <div className="content-modal-window">
        <h2>{type == "create" ? "Create a new Todo" : "Edit Todo"}</h2>
        <form onSubmit={handleOnSave} className="content-modal-form">
          <input
            type="text"
            value={inputFields.title}
            onChange={(e) => handleOnChange("title", e.target.value)}
            placeholder="title"
            className="text-input"
          />
          <textarea
            rows={3}
            placeholder="Description"
            className="text-input"
            value={inputFields.description}
            onChange={(e) => handleOnChange("description", e.target.value)}
          ></textarea>

          <select
            value={inputFields.priority}
            onChange={(e) => handleOnChange("priority", e.target.value)}
            className="text-input"
          >
            <option value="">Priority</option>
            {priorities.map((item) => (
              <option key={item.label} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>

          <div className="content-modal-buttons">
            <button type="submit" className="btn-primary">
              Save
            </button>
            <button onClick={handleClose} type="button" className="btn-primary">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

TodoContentModal.propTypes = {
  isOpen: PropTypes.bool,
  type: PropTypes.string,
  todo: PropTypes.object,
  closeModal: PropTypes.func,
};

export default TodoContentModal;
