import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    react({
      exclude: /\.stories\.(t|j)sx?$/,
    }),
    tsConfigPaths(),
    typescript({ tsconfig: 'tsconfig.build.json' }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs', 'es'],
      fileName: (format) =>
        format === 'cjs'
          ? 'index.cjs'
          : format === 'es'
          ? 'index.mjs'
          : `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.devDependencies),
        ...Object.keys(pkg.peerDependencies),
      ],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})
