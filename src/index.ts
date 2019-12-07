const identity = <T extends any[]>(...args: T): T[0] => args[0];

type Callback<T> = (data: T) => void;

export function create<T, A extends any[] = [T]>(
  buildData: (...args: A) => T = identity,
) {
  const subscribers: Callback<T>[] = [];

  function publish(...args: A) {
    const data = buildData(...args);

    for (const callback of subscribers) {
      callback(data);
    }
  }

  function subscribe(callback: Callback<T>) {
    subscribers.push(callback);

    const index = subscribers.length - 1;

    return function unsubscribe() {
      subscribers.splice(index, 1);
    };
  }

  return [publish, subscribe] as const;
}

type Next = () => void;
type CallbackWithNext<T> = (next: Next, data: T) => void;

export function createWithNext<T, A extends any[] = [T]>(
  buildData: (...args: A) => T = identity,
) {
  const subscribers: CallbackWithNext<T>[] = [];

  function publish(done: Next, ...args: A) {
    const data = buildData(...args);

    const run = subscribers.reduceRight<Next>(
      (next, callback) => () => callback(next, data),
      done,
    );

    run();
  }

  function subscribe(callback: CallbackWithNext<T>) {
    subscribers.push(callback);

    const index = subscribers.length - 1;

    return function unsubscribe() {
      subscribers.splice(index, 1);
    };
  }

  return [publish, subscribe] as const;
}
