export const getInitialTodos=()=>{
    const todos=JSON.parse(localStorage.getItem("todos"));
    if(todos){
        return todos
    }
    return undefined
}

export const isPresentInStorage=(id)=>{
    const todos=getInitialTodos();
    if(!todos){
        return false;
    }
    const val=todos.find((todo)=>{
        return todo.id===id
    })
    if(val){
        return true;
    }
    return false
}