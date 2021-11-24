import { Provider } from "react-redux";
import { AppRouter } from "./config/AppRouter";
import { store } from "./store/store";

import "./App.css";
function App() {
  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  );
}

export default App;
