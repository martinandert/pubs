import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { receiveMessage, sendMessage } from "./messaging";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

(window as any).sendMessage = sendMessage;

receiveMessage((message) => {
  console.log("Message received:", message);
});
