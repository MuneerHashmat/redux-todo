import getDate from "../utility/date";
import { isPresentInStorage } from "../utility/localStorage";
import { descriptions,priorities } from "../utility/constants";

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOGGLE_UPDATE = "TOGGLE_UPDATE";
export const UPDATE_TODO = "UPDATE_TODO";
export const TOGGLE_DONE = "TOGGLE_DONE";
export const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id },
});

export const toggleUpdate = (id) => ({
  type: TOGGLE_UPDATE,
  payload: { id },
});

export const updateTodo = (id, text) => ({
  type: UPDATE_TODO,
  payload: { id, text },
});

export const toggleDone = (id) => ({
  type: TOGGLE_DONE,
  payload: { id },
});

const fetchTodosRequest = () => ({ type: FETCH_TODOS_REQUEST });

const fetchTodosSuccess = (data) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: data,
});

const fetchTodosFailure = (error) => ({
  type: FETCH_TODOS_FAILURE,
  error: error.message,
});

export const fetchTodos = () => {
  return async (dispatch) => {
    if (
      isPresentInStorage("2") ||
      isPresentInStorage("3") ||
      isPresentInStorage("4")
    ) {
      return;
    }
    dispatch(fetchTodosRequest());
    try {
      const response = await fetch(
        "https://dummyjson.com/todos?limit=3&skip=1"
      );
      const data = await response.json();
      const initialTodos = data.todos.map((item,idx) => {
        const currDate = getDate();
        return {
          id: item.id.toString(),
          title: item.todo,
          description: descriptions[idx].desc,
          priority: priorities[idx].label,
          isComplete: false,
          date: currDate,
        };
      });
      dispatch(fetchTodosSuccess(initialTodos));
    } catch (error) {
      dispatch(fetchTodosFailure(error));
    }
  };
};
