
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
    priority: "Low",
    deadline: "",
  };

  const [inputFields, setInputFields] = useState(initialState);
  useEffect(() => {
    if (todo) {
      setInputFields({
        title: todo.title,
        description: todo.description,
        priority: todo.priority || "Low",
        deadline: todo.deadline ? todo.deadline : "",
      });
    } else {
      setInputFields({
        title: "",
        description: "",
        priority: "Low",
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
    if (!inputFields.title) {
      toast.error("Title is required");
      return;
    }

    if (inputFields.title.length > 45) {
      toast.error("Title can't be more than 45 characters");
      return;
    }

    if (inputFields.description.length > 150) {
      toast.error("Description can't be more than 150 characters");
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
        deadline: inputFields.deadline,
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
        deadline: inputFields.deadline,
      };
      dispatch(updateTodo(newTodo));
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
    <div className={`modal-container ${!isOpen && "hidden"}`}>
      <div className="bg-[var(--dark-bg)] px-[10px] sm:px-[50px] py-[30px] w-[90vw] md:w-[70vw] lg:w-[40vw] xl:w-[30vw] border-t-3 border-[var(--brown-light)]">
        <h2 className="text-[24px] text-center mb-[20px] font-semibold">{type == "create" ? "Create a new Todo" : "Edit Todo"}</h2>
        <form onSubmit={handleOnSave} className="flex flex-col gap-[15px]">
          <input
            type="text"
            value={inputFields.title}
            onChange={(e) => handleOnChange("title", e.target.value)}
            placeholder="Title*"
            className="text-input text-lg"
          />
          <textarea
            rows={4}
            placeholder="Description"
            className="text-input resize-none"
            value={inputFields.description}
            onChange={(e) => handleOnChange("description", e.target.value)}
          ></textarea>

          <div className="flex gap-[10px] items-center">
            <p>Priority*</p>
            <select
              value={inputFields.priority}
              onChange={(e) => handleOnChange("priority", e.target.value)}
              className="text-input text-md"
            >
              {priorities.map((item) => (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-[10px] items-center">
            <p>Deadline</p>
            <input
              type="date"
              className="text-input text-sm" 
              value={inputFields.deadline}
              onChange={(e) => handleOnChange("deadline", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="w-full flex gap-[30px] justify-center items-center mt-[25px]">
            <button type="submit" className="btn-primary rounded-[5px] w-[80px] py-[5px]">
              Save
            </button>
            <button onClick={handleClose} type="button" className="btn-primary rounded-[5px] w-[80px] py-[5px]">
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
