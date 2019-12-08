import * as React from "react";
import "./Receiver.css";
import { useReceivedMessage } from "./messaging";

export default function Receiver() {
  const [messages, setMessages] = React.useState<string[]>([]);

  useReceivedMessage((message) => {
    setMessages((messages) => [...messages, message]);
  });

  return (
    <div className="Receiver">
      <h2>Received messages</h2>

      {messages.length > 0
        ? (
          <ol>
            {messages.map((message, index) => (
              <li key={index}>
                {message}
              </li>
            ))}
          </ol>
        )
        : <p>No message received yet.</p>
      }
    </div>
  )
}
