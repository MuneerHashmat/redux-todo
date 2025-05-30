import { useState } from "react";
import TodoContentModal from "./modals/TodoContentModal";
import LiveClock from "./LiveClock";

const CreateTodo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-[20px]">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <img src="/logo.png" alt="logo" width={35} />
          <h2 className="text-2xl text-[var(--brown-light)] font-bold">todo</h2>
        </div>
        <LiveClock />
      </div>
      <button
        onClick={() => setIsOpen(true)}
        type="submit"
        className="btn-primary text-xl flex gap-[10px] items-center p-[10px]"
      >
        <img src="/plus.png" alt="plus" width={20} />
        <span>Create New Todo</span>
      </button>
      <TodoContentModal type="create" isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default CreateTodo;
