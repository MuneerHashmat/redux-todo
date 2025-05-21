import { useEffect } from "react";
import { EditNoteRounded, DeleteForeverRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTodo,
  toggleDone,
  toggleUpdate,
  fetchTodos,
} from "../actions/todoActions";
import EditTodo from "./EditTodo";

const Todos = () => {
  const { todos, loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleTodoCompleted = (id) => {
    dispatch(toggleDone(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleEditTodo = (id) => {
    dispatch(toggleUpdate(id));
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="mt-4 flex flex-col gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center px-5 py-2 text-xl rounded-lg bg-gray-300 w-[750px]"
          >
            <div className="text-xl flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => handleTodoCompleted(todo.id)}
                className="w-4 h-4"
              />
              {todo.editTodo ? (
                <EditTodo key={todo.id} todo={todo} />
              ) : (
                <p
                  style={{
                    textDecoration: todo.isComplete ? "line-through" : "none",
                    fontSize: "24px",
                  }}
                >
                  {todo.text}
                </p>
              )}
            </div>

            <div className="flex gap-5 items-center">
              <div>
                {todo.editTodo ? null : (
                  <span className="text-[16px] font-bold">
                    <EditNoteRounded sx={{ paddingBottom: "2px" }} />
                    {todo.date}
                  </span>
                )}
              </div>
              <div>
                {todo.editTodo ? null : (
                  <button
                    onClick={() => handleEditTodo(todo.id)}
                    className="bg-red-400 rounded-full px-1 pb-[3px] hover:scale-105 transition-all"
                  >
                    <EditNoteRounded />
                  </button>
                )}
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="bg-red-400 rounded-full px-[5px] pb-[4px] hover:scale-105 transition-all"
              >
                <DeleteForeverRounded />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
