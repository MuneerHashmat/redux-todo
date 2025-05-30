import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import todoReducer from "./reducers/todoReducer";

const logger = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  let result = next(action);
  console.log("Next state:", store.getState());
  return result;
};

const store = createStore(todoReducer, applyMiddleware(thunk, logger));

store.subscribe(()=>{
  let state=store.getState();
  localStorage.setItem("todos",JSON.stringify(state.todos))
})



export default store;
