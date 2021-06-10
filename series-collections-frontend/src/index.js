import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, compose, createStore } from "redux";
import App from "./components/App/App";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const auth = JSON.parse(localStorage.getItem("user"));
const store = createStore(
  rootReducer,
  { auth },
  compose(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
