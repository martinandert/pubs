import * as React from "react";
import "./Sender.css";
import { sendMessage } from "./messaging";

export default function Sender() {
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    sendMessage(message);
    setMessage("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="Sender">
      <h2>Send a message</h2>

      <div>
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />

        <button
          type="submit"
          disabled={message.length === 0}
        >
          Send
        </button>
      </div>
    </form>
  );
}
