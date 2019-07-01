module.exports = {
    extends: ['eslint-config-airbnb-base'],
    rules: {
        semi: ['error'],
        'max-len': ['error', 120],
        'no-const-assign': 'error',
        indent: ['error', 4],
        'no-new': ['off']
    },
};