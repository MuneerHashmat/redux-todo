export const filterTodos = (todos, currTab) => {
  switch (currTab) {
    case "All":
      return todos;

    case "Pending":
      return todos.filter((todo) => {
        return todo.isComplete === false;
      });

    case "Completed":
      return todos.filter((todo) => {
        return todo.isComplete === true;
      });
  }
};
