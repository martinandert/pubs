import * as React from "react";
import "./App.css";
import Sender from "./Sender";
import Receiver from "./Receiver";

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>Pubs Usage Example</h1>
        <a href="https://github.com/martinandert/pubs/tree/master/example/src">GitHub</a>
      </header>

      <main>
        <Sender />
        <Receiver />
      </main>

      <p>
        All received messages get logged to the console, too. You can also
        send messages by issuing <code>sendMessage("my message")</code> in
        the console.
      </p>
    </div>
  );
}
