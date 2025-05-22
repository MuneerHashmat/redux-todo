import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "react-hot-toast";


console.log(store)

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster />
    <App />
  </Provider>
);
