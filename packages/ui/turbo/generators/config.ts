import type { PlopTypes } from '@turbo/gen';

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator('react-component', {
    actions: [
      {
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.tsx',
        templateFile: 'templates/component.hbs',
        type: 'add',
      },
      {
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.react-server.tsx',
        templateFile: 'templates/rsc.hbs',
        type: 'add',
      },
      {
        path: 'package.json',
        pattern: /"exports": {(?<insertion>)/g,
        template: `
        "./{{kebabCase name}}": {
          "production": {
            "types": "./dist/{{kebabCase name}}/{{kebabCase name}}.d.ts",
            "react-server": "./dist/{{kebabCase name}}/{{kebabCase name}}.react-server.js",
            "default": "./dist/{{kebabCase name}}/{{kebabCase name}}.js",
          },
          "react-server": "./src/{{kebabCase name}}/{{kebabCase name}}.react-server.tsx",
          "default": "./src/{{kebabCase name}}/{{kebabCase name}}.tsx"
        },`,
        type: 'append',
      },
    ],
    description: 'Adds a new react component',
    prompts: [
      {
        message: 'What is the name of the component?',
        name: 'name',
        type: 'input',
      },
    ],
  });

  plop.setGenerator('react-hook', {
    actions: [
      {
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.ts',
        templateFile: 'templates/hook.hbs',
        type: 'add',
      },
      {
        path: 'package.json',
        pattern: /"exports": {(?<insertion>)/g,
        template: `
        "./{{kebabCase name}}": {
          "production": {
            "types": "./dist/{{kebabCase name}}/{{kebabCase name}}.d.ts",
            "default": "./dist/{{kebabCase name}}/{{kebabCase name}}.js",
          },
          "default": "./src/{{kebabCase name}}/{{kebabCase name}}.ts"
        },`,
        type: 'append',
      },
    ],
    description: 'Adds a new react hook',
    prompts: [
      {
        message: 'What is the name of the hook?',
        name: 'name',
        type: 'input',
      },
    ],
  });
}
