import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
    { ignores: ["dist/**"] },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ["src/**/*.ts"],
        rules: {
            "@typescript-eslint/explicit-member-accessibility": [
                "error",
                { accessibility: "explicit", overrides: { constructors: "no-public" } },
            ],
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/member-ordering": [
                "error",
                {
                    default: [
                        "static-field",
                        "instance-field",
                        "constructor",
                        ["get", "set"],
                        "public-instance-method",
                        "private-instance-method",
                        "public-static-method",
                        "private-static-method",
                    ],
                },
            ],
            "@typescript-eslint/naming-convention": [
                "error",
                { selector: "typeLike", format: ["PascalCase"] },
                { selector: ["classProperty", "classMethod", "accessor"], format: ["camelCase"] },
                {
                    selector: "classProperty",
                    modifiers: ["private"],
                    format: ["camelCase"],
                    leadingUnderscore: "allow",
                },
                { selector: "variableLike", format: ["camelCase"] },
            ],
        },
    },
    eslintConfigPrettier,
);
