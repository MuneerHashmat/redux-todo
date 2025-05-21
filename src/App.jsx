import CreateTodos from "./components/createTodos";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Todos from "./components/Todos";

function App() {
  return (
    <div>
      <h1 className="text-center bg-green-400 fixed w-screen text-3xl py-1">
        <ListAltIcon sx={{ fontSize: "40px", paddingBottom: "7px" }} />
        TODO LIST
      </h1>
      <div className="mx-auto pt-24 flex flex-col items-center">
        <CreateTodos />
        <Todos />
      </div>
    </div>
  );
}

export default App;
