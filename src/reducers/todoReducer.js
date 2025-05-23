import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_UPDATE,
  UPDATE_TODO,
  TOGGLE_DONE,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} from "../actions/todoActions";

import getDate from "../utility/date";
import { getInitialTodos } from "../utility/localStorage";

const initialTodos = getInitialTodos();

const initialState = {
  todos: initialTodos || [],
  loading: false,
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo.id !== action.payload.id;
        }),
      };

    case TOGGLE_UPDATE:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, editTodo: !todo.editTodo }
            : todo;
        }),
      };

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, text: action.payload.text, date: getDate() }
            : todo;
        }),
      };

    case TOGGLE_DONE:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, isComplete: !todo.isComplete }
            : todo;
        }),
      };

    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading:false,
        todos: [...state.todos, ...action.payload],
      };

    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default todoReducer;
