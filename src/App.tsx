import "./index.css";
import { Provider } from "./Context";
import Tree from "./Tree";

function App() {
  return (
    <Provider>
      <Tree />
    </Provider>
  );
}

export default App;
