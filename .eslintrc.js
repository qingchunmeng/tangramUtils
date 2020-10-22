const EslintConfig = require('@jiaoyi/config/eslint');

module.exports = {
    ...EslintConfig,
    rules: {
        ...EslintConfig.rules,
        eqeqeq: [1],
        'no-param-reassign': [1],
        'no-restricted-syntax': [1],
        'guard-for-in': [1]
    }
};
