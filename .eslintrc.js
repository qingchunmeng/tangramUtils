const EslintConfig = require('@jiaoyi/config/eslint');

module.exports = {
    ...EslintConfig,
    rules: {
        ...EslintConfig.rules,
        eqeqeq: [1]
    }
};
