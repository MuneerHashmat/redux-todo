import { v4 as uuidv4 } from "uuid";
import getDate from "../utility/date";

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
    dispatch(fetchTodosRequest());
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );
      const data = await response.json();
      const initialTodos = data.map((todo) => {
        const currDate = getDate();
        return {
          id: uuidv4(),
          text: todo.title,
          editTodo: false,
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
