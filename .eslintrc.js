module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true
    },
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html', 'vuefix'
    ],
    // add your custom rules here
    rules: {
        "space-before-function-paren": [0, "always"], //函数定义时括号前面要不要有空格
        "quotes": [0, "single"],//引号类型 `` "" ''
        "no-extend-native": 'off'
    },
    globals: {}
}
