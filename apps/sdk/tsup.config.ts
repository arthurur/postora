import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  // tsup 8 always passes a baseUrl to the declaration build (default '.',
  // which is apps/sdk). Point it at the repo root so the path aliases
  // from tsconfig.base.json still resolve. TypeScript 6 deprecates baseUrl,
  // so the declaration build also needs ignoreDeprecations.
  dts: {
    compilerOptions: {
      baseUrl: '../..',
      ignoreDeprecations: '6.0',
    },
  },
  minify: true,
  clean: true,
  outDir: 'dist',
});