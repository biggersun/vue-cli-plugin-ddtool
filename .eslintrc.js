module.exports = {
    extends: ['eslint-config-airbnb-base', 'prettier'],
    plugins: ['prettier'],
    rules: {
        semi: ['error'],
        'max-len': ['error', 200],
        'no-const-assign': 'error',
        indent: ['error', 4],
        'no-new': ['off'],
        'prettier/prettier': 'error',
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
                ignoreReadBeforeAssign: false,
            },
        ],
    },
};
