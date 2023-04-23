import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";

import packageJson from "./package.json" assert { type: "json" };
// eslint-disable-next-line
export default [
    {
        input: "src/index.ts",
        external: ["react-dom"],
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            terser(),
            typescript({
                tsconfig: "./tsconfig.json",
                exclude: ["**/stories", "**/*.stories.tsx"],
            }),
            postcss({ extensions: [".css"] }),
            peerDepsExternal(),
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts.default()],
        external: [/\.(css|less|scss)$/],
    },
];
