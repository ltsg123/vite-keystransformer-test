import { defineConfig } from 'vite'
// import preact from '@preact/preset-vite'
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import keysTransformer from 'ts-transformer-keys/transformer';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // preact(),
    // @ts-ignore
    resolve(),
    // @ts-ignore
    typescript({
      transformers: [service => {
        return {
          before: [keysTransformer(service.getProgram())],
          after: []
        }
      }]
    })],

  build: {
    outDir: path.resolve(`./dist/`),
    assetsDir: '',
    cssCodeSplit: true,
    lib: {
      entry: path.resolve('./src/main.ts'),
      name: 'vite-keystransformer',
      fileName: (format) => `vite-keystransformer.js`
    },
    rollupOptions: {
      input: {
        main: path.resolve('./src/main.ts')
      },
      output: [
        {
          format: 'cjs',
        }
      ]
    }
  },
})
