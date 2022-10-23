import "./App.css";
import TaskList from "./containers/TaskList";
import ReactQueryProvider from "./components/ReactQueryProvider";
import SelectionContextProvider from "./components/SelectionContext";

function App() {
  return (
    <ReactQueryProvider>
      <SelectionContextProvider>
        <TaskList />
      </SelectionContextProvider>
    </ReactQueryProvider>
  );
}

export default App;
