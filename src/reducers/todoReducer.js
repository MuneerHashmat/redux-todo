import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  TOGGLE_DONE,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} from "../actions/todoActions";


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

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo.id === action.payload.id
            ? action.payload
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
