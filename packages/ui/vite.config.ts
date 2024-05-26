import { globSync } from 'glob';
import path from 'path';
import { defineConfig } from 'vite';

import pkg from './package.json';

export default defineConfig((configEnv) => {
  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      emptyOutDir: false,
      lib: {
        entry: Object.fromEntries(
          globSync('./src/**', { nodir: true }).map((file) => {
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
    plugins: [configEnv.command === 'serve' && false /* Use react plugin for development */],
    root: __dirname,
  };
});
