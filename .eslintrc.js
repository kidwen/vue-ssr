const path = require('path');

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        indent: ['error', 4],
        'no-param-reassign': [2, { props: false }],
        'vue/no-multiple-template-root': 0,
        'import/extensions': ['error', 'always',
            { ts: 'never' },
        ],
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', path.resolve(__dirname, 'src')]],
                extensions: ['.js', '.vue', 'ts'],
            },
            node: {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx',
                ],
            },
        },
        'import/parses': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
};
