import { useState } from "react";
import "./CreateTodo.css";
import TodoContentModal from "./modals/TodoContentModal";

const CreateTodo = () => {
  const [isOpen, setIsOpen]=useState(false)

  const closeModal=()=>{
    setIsOpen(false);
  }

  return (
    <div className="create-todo-container">
      <div className="header">
        <img src="/logo.png" alt="logo" width={30} />
        <h2>todo</h2>
      </div>
        <button 
        onClick={()=>setIsOpen(true)}
        type="submit" className="btn-primary btn-submit">
          <img src="/plus.png" alt="plus" width={20}/>
          <span>Create New Todo</span>
        </button>
        <TodoContentModal type="create" isOpen={isOpen} closeModal={closeModal}/>
    </div>
  );
};

export default CreateTodo;
