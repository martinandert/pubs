import { create, createWithNext } from "../src/index";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("create", () => {
  it("works", () => {
    const result: any[] = [];

    const [pub, sub] = create<number>();

    sub((data) => result.push(["A", data]));

    const unsub = sub((data) => result.push(["B", data]));

    pub(42);

    expect(result).toEqual([
      ["A", 42],
      ["B", 42],
    ]);

    sub((data) => result.push(["C", data]));

    unsub();

    result.length = 0;

    pub(123);

    expect(result).toEqual([
      ["A", 123],
      ["C", 123],
    ]);
  });
});

describe("createWithNext", () => {
  // eslint-disable-next-line jest/expect-expect
  it("works without subscribers", (done) => {
    const [pub] = createWithNext<void>();

    pub(done);
  });

  it("works with subscribers", (done) => {
    const result: any[] = [];

    const [pub, sub] = createWithNext<number>();

    sub(async (next, data) => {
      await sleep(1);
      result.push(["A", data]);
      next();
    });

    const unsub = sub(async (next, data) => {
      result.push(["B", data]);
      await sleep(1);
      next();
    });

    const callback1 = () => {
      expect(result).toEqual([
        ["A", 42],
        ["B", 42],
      ]);

      result.length = 0;

      const callback2 = () => {
        expect(result).toEqual([
          ["A", 123],
          ["C", 123],
        ]);

        done();
      };

      sub((next, data) => {
        result.push(["C", data]);
        next();
      });

      unsub();

      pub(callback2, 123);
    };

    pub(callback1, 42);
  });
});
