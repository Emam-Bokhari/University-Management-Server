## Step 1 - Set Up Your Project Environment

Here’s how you can set up your Node.js project with the required dependencies:

**1. Initialize the Project:**

Create a `package.json` file for managing your project dependencies.

```bash
npm init -y
```

**2. Install Required Packages:**

Add essential libraries and tools for your application:

```bash
npm install express       # Web framework for building APIs
npm install cors          # Enables Cross-Origin Resource Sharing
npm install dotenv        # Manages environment variables
npm install mongoose      # MongoDB object modeling tool
```

**3. Add TypeScript Support:**

Install TypeScript type definitions for the above libraries:

```bash
npm install @types/express @types/node @types/cors --save-dev
```

**4. Install Development Tools:**

Add `nodemon` for automatic server restarts during development:

```bash
npm install -D nodemon
```

## Step 2 — Adding TypeScript

We need to add a typescript package in our project, so that we can use the TypeScript compiler and other related tools.

```bash
npm i -D typescript
```

This command will add typescript package as a dev-dependency in our project.

Now, we need to add typescript config file, for that we will use the below given command.

```bash
tsc --init
```

This will create a **tsconfig.json file**, with the default compiler configurations shown in the image below.

In the **tsconfig.json file**, remove the comments on the **rootDir** option and modify it, to set **src** as root directory for typescript.

`"rootDir": "./src"`,

Similarly, do this for **outDir** option as well

`"outDir": "./dist"`,

All .js files will be created in this **build** folder after compiling the .ts files which are inside the src folder.

## Step 3 — Adding Eslint

For adding eslint, we will install the required packages given below.

```bash
npm i -D eslint@9.14.0 @eslint/js @types/eslint__js typescript typescript-eslint
```

Now make a eslint.config.mjs file in the root of the project director.

```bash
npx eslint --init
```

At this point you may see that your version of `eslint: "^9.14.0"` has been changed to eslint: `"^9.15.0"`

if that happens remove the eslint : `npm remove eslint`
Then re-install: `npm i -D eslint@9.14.0`

Now add the following code inside it.

```js
{
    ignores: ["node_modules", "dist"],
    rules: {
      "no-unused-vars": "error",
    },
  },
```

```js
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['node_modules', 'dist'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-undef': 'error',
      'no-console': 'warn',
    },
  },
];
```

Now in the terminal, you can run npm eslint . You can see that eslint is working.

We can also add scripts for eslint in the **package.json** file.

```js
"scripts": {
"lint": "eslint src/**/\*.ts",
"lint:fix": "eslint src/**/\*.ts --fix"
},
```

## Step 4 — Adding Prettier

Add the prettier package in your project.

```bash
npm i -D --exact prettier
```

Now create `.prettierrc` and `.prettierignore` file in the root of your project.

Include basic configurations for prettier in the `.prettierrc` file.

```js
{
  "semi": true,
  "singleQuote": true
}
```

Also, we need to tell prettier which files to not format So inside .prettierignore include the following.

```js
dist;
```

Finally we can add scripts for prettier as well in the **package.json** file.

`"format": "prettier . --write"`

## Step 5 — Adding Ts-Node-Dev

`ts-node-dev` Installation and Usage

**Why install and use** `ts-node-dev`?

**Installation:**

- `ts-node-dev` is a development dependency for TypeScript projects.

**Install it using:**

```bash
npm i ts-node-dev --save-dev
```

**Usage:**

- It runs TypeScript files directly, so you don’t need to manually compile them using tsc.

- It automatically restarts the server when file changes are detected, making development faster.

- Command to start your server:

```bash
npx ts-node-dev --transpile-only src/server.ts
```

## Project Scripts Overview

```
"scripts": {
  "build": "tsc",                                                   # Compiles TypeScript files to JavaScript
  "start:dev": "npx ts-node-dev --transpile-only src/server.ts",    # Runs the server in development mode with hot-reloading
  "start:prod": "node ./dist/server.js",                            # Starts the server in production mode
  "start": "nodemon ./dist/server.js",                              # Runs the production build with automatic restarts
  "lint": "eslint src/**/*.ts",                                     # Checks code style and errors using ESLint
  "lint:fix": "eslint src/**/*.ts --fix",                           # Fixes code style issues automatically
  "format": "prettier . --write"                                    # Formats code consistently with Prettier
}

```
