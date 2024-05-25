import type { Plugin } from 'vite';

import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import browserslist from 'browserslist';
import { readFileSync } from 'fs';
import { browserslistToTargets } from 'lightningcss';
import path from 'path';
import { defineConfig, loadEnv, transformWithEsbuild } from 'vite';
import svgr from 'vite-plugin-svgr';

import project from './package.json';

const jsxInJs = (matchers: RegExp[]): Plugin => ({
  load(id: string) {
    if (matchers.some((matcher) => matcher.test(id)) && id.endsWith('.js')) {
      const file = readFileSync(id, { encoding: 'utf-8' });
      return transformWithEsbuild(file, id, {
        jsx: 'automatic',
        loader: 'jsx',
      });
    }
    return null;
  },
  name: 'jsx-in-js',
});

export default defineConfig((configEnv) => {
  const env = loadEnv(configEnv.mode, __dirname, 'VITE_') as unknown as EnvironmentVariable;
  env.NODE_ENV = configEnv.mode as EnvironmentVariable['NODE_ENV'];
  env.VITE_APP_PREFIX = env.VITE_APP_PREFIX || project.name;

  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      emptyOutDir: true,
      outDir: '../../dist/apps/react-template',
      reportCompressedSize: true,
      rollupOptions: {
        plugins: [jsxInJs([])],
      },
    },
    cacheDir: '../../node_modules/.vite/react-template',
    css: {
      lightningcss: {
        cssModules: {
          pattern: `${env.NODE_ENV}_${env.VITE_APP_PREFIX}_[hash]_[local]`,
        },
        targets: browserslistToTargets(browserslist('>= 0.25%')),
      },
      transformer: 'lightningcss',
    },
    define: {
      'process.env': JSON.stringify(env),
    },
    optimizeDeps: {
      esbuildOptions: {
        jsx: 'automatic',
        loader: { '.js': 'jsx' },
      },
    },
    plugins: [
      svgr({
        esbuildOptions: {
          jsx: 'automatic',
        },
        include: '**/*.svg?react',
        svgrOptions: {
          dimensions: false,
          expandProps: true,
          exportType: 'default',
          memo: true,
          ref: true,
          svgProps: {
            className: '{props.className ?? props.class ?? undefined}',
            color: "{props.color ?? 'currentColor'}",
            fill: "{props.fill ?? 'currentColor'}",
            role: 'img',
          },
        },
      }),
      TanStackRouterVite({
        generatedRouteTree: path.join(__dirname, 'src', 'configs', 'route', 'route-tree.config.ts'),
        routesDirectory: path.join(__dirname, 'src', 'routes'),
      }),
      react({
        tsDecorators: true,
      }),
    ],
    root: __dirname,
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
  };
});
