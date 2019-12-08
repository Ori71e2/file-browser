module.exports = {
  root: true,
  /**
   * 在使用自定义解析器时，为了让 ESLint 在处理非 ECMAScript 5 特性时正常工作，配置属性 parserOptions 仍然是必须的。
   * 解析器会被传入 parserOptions，但是不一定会使用它们来决定功能特性的开关。
   */
  parserOptions: {
    /**
     * ESLint 默认使用Espree作为其解析器
     */ 
    /**
     * <https://vuejs.github.io/eslint-plugin-vue/user-guide/#faq>
     * What is the "Use the latest vue-eslint-parser" error?
     * The most rules of eslint-plugin-vue require vue-eslint-parser to check <template> ASTs.
     * Make sure you have one of the following settings in your .eslintrc:
     * "extends": ["plugin:vue/recommended"]
     * "extends": ["plugin:vue/base"]
     * If you already use other parser (e.g. "parser": "babel-eslint"), please move it into parserOptions,
     * so it doesn't collide with the vue-eslint-parser used by this plugin's configuration:
     */
    parser: '@typescript-eslint/parser', // 定义ESLint的解析器
    // parser: 'babel-eslint', // 一个对Babel解析器的包装，使其能够与 ESLint 兼容。
    "ecmaVersion": 2019,
    "sourceType": 'module'
  },
  env: {
    browser: true,
    node: true
  },
  // extends: 'standard',
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  globals: {
    __static: true
  },
  plugins: [
    'html',
    '@typescript-eslint' //定义了该eslint文件所依赖的插件
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "space-before-function-paren": 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // "keyword-spacing": [2, {"overrides": {
    //   "if": {"after": false},
    //   "for": {"after": false},
    //   "while": {"after": false}
    // }}]
  }
}
