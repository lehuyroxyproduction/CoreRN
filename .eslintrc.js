module.exports = {
  extends: ['plugin:prettier/recommended'],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 10,
    sourceType: 'module'
  },
  parser: 'babel-eslint', // Support ES7 syntax
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    "prettier/prettier": "error",
    'no-console': 'off',
    // No semicolons
    'no-extra-semi': 'error',
    semi: ['error', 'never'],
    // Use single quotes for strings
    quotes: ['warn', 'single'],
    // No unused variables
    'no-unused-vars': [
      'warn',
      {vars: 'all', args: 'none', ignoreRestSiblings: true}
    ],
    // Add a space after keywords
    'keyword-spacing': ['error', {before: true, after: true}],
    // No space before a function declaration's parentheses
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    // Always use triple equals instead of double
    eqeqeq: ['error', 'always', {null: 'ignore'}],
    // Space infix operators
    'space-infix-ops': 'warn',
    // Space after commas
    'comma-spacing': ['warn', {before: false, after: true}],
    // Keep else statements on the same line as theire curly braces
    'brace-style': ['error', '1tbs', {allowSingleLine: true}],
    // Always use curly brace for if statements
    curly: ['warn', 'all'], // options: all || multi-line
    // Always hanlde err function parameter
    'handle-callback-err': ['error', '^(err|error)$'],
    // No multiple blank lines
    'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 0}],
    // Place ? : for ternary operator
    'operator-linebreak': [
      'error',
      'after',
      {overrides: {'?': 'before', ':': 'before'}}
    ],
    // No var
    'no-var': ['error'],
    // Add space inside single line blocks
    'block-spacing': ['warn', 'always'],
    // Place commas at the end of the line in an object
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ],
    // Dot should be on the same line as peoperty
    'dot-location': ['warn', 'property'],
    // No space between function indetifiers and their invocations
    'func-call-spacing': ['error', 'never'],
    // Add space between colon and value in key value pairs
    'key-spacing': ['warn', {beforeColon: false, afterColon: true}],
    // Constructor name must begin with a capital letter
    'new-cap': ['warn', {newIsCap: true, capIsNew: false}],
    // Constructors of derived classes must call super
    'constructor-super': 'error',
    // Avoid modifying variables declared using const
    'no-const-assign': 'error',
    // No duplicate arguments
    'no-dupe-args': 'error',
    // Use a single import statement per modules
    'no-duplicate-imports': 'error',
    // Use break in switch case
    'no-fallthrough': 'error',
    // No unnecessary nested blocks
    'no-lone-blocks': 'error',
    // No mixed spaces and tabs
    'no-mixed-spaces-and-tabs': 'error',
    // No multiple spaces
    'no-multi-spaces': 'error',
    // No octal literals
    'no-octal': 'error',
    // No tabs
    'no-tabs': 'error',
    // Super must be called before using this
    'no-this-before-super': 'error',
    // No ternary operators when simpler alternatives exist
    'no-unneeded-ternary': ['warn', {defaultAssignment: false}],
    // No unreachable code
    'no-unreachable': 'error',
    // No whitespace before property
    'no-whitespace-before-property': 'error',
    // No padding within blocks
    'padded-blocks': [
      'error',
      {blocks: 'never', switches: 'never', classes: 'never'}
    ],
    // Add space before blocks
    'space-before-blocks': ['error', 'always'],
    // No spaces inside parentheses
    'space-in-parens': ['error', 'never'],
    // Add space after unary operators
    'space-unary-ops': ['error', {words: true, nonwords: false}],
    // Add space before a comment
    'spaced-comment': [
      'error',
      'always',
      {
        line: {markers: ['*package', '!', '/', ',', '=']},
        block: {
          balanced: true,
          markers: ['*package', '!', ',', ':', '::', 'flow-include'],
          exceptions: ['*']
        }
      }
    ],
    // typeof must be compared to a valid string
    'valid-typeof': ['error', {requireStringLiterals: true}],
    // Add space after yield star
    'yield-star-spacing': ['warn', {before: false, after: true}],
    // Use 2 spaces
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: {parameters: 1, body: 1},
        FunctionExpression: {parameters: 1, body: 1},
        CallExpression: {arguments: 1},
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false
      }
    ],
    // Use double quotes for JSX
    'jsx-quotes': ['error', 'prefer-double'],
    // Avoid missing key prop
    'react/jsx-key': 'warn',
    // No normal comment in JSX
    'react/jsx-no-comment-textnodes': 'error',
    // Avoid duplicate properties in JSX
    'react/jsx-no-duplicate-props': 'error',
    // No undeclared varibales in JSX
    'react/jsx-no-undef': 'error',
    // No unused react import
    'react/jsx-uses-react': 'warn',
    // No direct mutation of this.state
    'react/no-direct-mutation-state': 'error',
    // No invalid characters in JSX
    'react/no-unescaped-entities': 'error',
    // No unknown property (className instead of class)
    'react/no-unknown-property': 'error',
    // Avoid missing return in render function
    'react/require-render-return': 'error',
    // Avoid default props do not match prop types
    'react/default-props-match-prop-types': 'error',

    'react/jsx-uses-vars': 2,
    'react/no-unused-state': 1,
    'react/jsx-max-props-per-line': [0, {maximum: 4, when: 'always'}],
    'react/boolean-prop-naming': [1, {rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+'}],
    'react/jsx-tag-spacing': [
      2,
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'allow'
      }
    ],
    'react/jsx-props-no-multi-spaces': 2,
    'react/jsx-pascal-case': 2,
    // 'react/jsx-one-expression-per-line': 2,
    'react/jsx-indent-props': [2, 2],
    'react/jsx-indent': [2, 2],
    'react/jsx-equals-spacing': [2, 'never'],
    'react/jsx-curly-spacing': [2, 'never'],
    'react/jsx-closing-tag-location': 2
  }
}
