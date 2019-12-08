import * as React from "react";
import { create } from "pubs";

const [sendMessage, receiveMessage] = create<string>();

export {
  sendMessage,
  receiveMessage,
};

export function useReceivedMessage(callback: (message: string) => void) {
  React.useEffect(() => receiveMessage(callback), [callback]);

  // The above is semantically the same as writing it
  // in a more verbose way:
  /*
   *   React.useEffect(
   *     () => {
   *       const unsubscribe = receiveMessage(callback);
   *
   *       return () => {
   *         unsubscribe();
   *       };
   *     },
   *     [callback]
   *   );
   */
}
