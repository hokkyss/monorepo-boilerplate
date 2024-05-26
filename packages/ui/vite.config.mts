/// <reference types='vitest' />

import { globSync } from 'glob';
import path from 'path';
import { defineConfig } from 'vite';
import { coverageConfigDefaults } from 'vitest/config';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig((configEnv) => {
  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      emptyOutDir: true,
      lib: {
        entry: Object.fromEntries(
          globSync('./src/**', {
            nodir: true,
            ignore: ['./src/**/*.{spec,test}.*'],
          }).map((file) => {
            return [
              // This remove `src/` as well as the file extension from each
              // file, so e.g. src/nested/foo.js becomes nested/foo
              path.relative('src', file.slice(0, file.length - path.extname(file).length)),
              // This expands the relative paths to absolute paths, so e.g.
              // src/nested/foo becomes /project/src/nested/foo.js
              path.resolve(__dirname, file),
            ];
          }),
        ),
        formats: ['es', 'cjs'],
        name: pkg.name,
      },
      outDir: 'dist',
      reportCompressedSize: true,
      rollupOptions: {
        // match @tanstack/react-query and @tanstack/react-query/anything, but not @tanstack/react-query-devtools
        external: Object.keys(pkg.peerDependencies).map((key) => new RegExp(`^${key}(/.+)*`)),
      },
      sourcemap: true,
    },
    plugins: [
      dts({
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
        copyDtsFiles: true,
        exclude: ['**/*.{spec,test}.*'],
      }),
      configEnv.command === 'serve' && false /* Use react plugin for development */,
    ],
    root: __dirname,
    test: {
      clearMocks: true,
      coverage: {
        enabled: true,
        exclude: [...coverageConfigDefaults.exclude, 'src/**/*.{story,stories}.{jsx,tsx,js}'],
        provider: 'v8',
        reportsDirectory: 'coverage',
      },
      environment: 'happy-dom',
      globals: true,
      include: ['src/**/*.{spec,test}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      mockReset: true,
      reporters: ['default'],
      watch: false,
    },
  };
});
