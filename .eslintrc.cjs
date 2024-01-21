module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    // 配置解析vue文件
    "parser":"vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "globals": {
        __APP_VERSION__: "readonly"
    },
    "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "vue/multi-word-component-names": "off",
        "vue/v-on-event-hyphenation": "off",
        "vue/require-default-prop": "off",
        "no-case-declarations": "off",
        "no-console": "warn"
    }
}
