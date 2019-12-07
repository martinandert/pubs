import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "./src/index.ts",

  plugins: [
    typescript(),
  ],

  output: [
    {
      format: "es",
      file: pkg.module,
    },

    {
      format: "cjs",
      file: pkg.main,
    },

    {
      format: "umd",
      file: pkg.browser,
      name: "pubs",
    },
  ],
};
