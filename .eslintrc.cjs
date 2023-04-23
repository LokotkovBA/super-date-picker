// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
    overrides: [
        {
            extends: [
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "prettier",
            ],
            files: ["*.ts", "*.tsx"],
            parserOptions: {
                project: path.join(__dirname, "tsconfig.json"),
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
    },
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
        "react-app",
        "plugin:@typescript-eslint/recommended",
        "plugin:storybook/recommended",
    ],
    rules: {
        "@typescript-eslint/consistent-type-imports": [
            "warn",
            {
                prefer: "type-imports",
                fixStyle: "inline-type-imports",
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                argsIgnorePattern: "^_",
            },
        ],
        semi: "warn",
        quotes: [
            "warn",
            "double",
            {
                allowTemplateLiterals: true,
            },
        ],
        "jsx-quotes": ["warn", "prefer-double"],
    },
};
module.exports = config;
