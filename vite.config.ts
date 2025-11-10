import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { glob } from 'glob'
import dts from 'vite-plugin-dts'

// Get all entry points for granular imports
const entryPoints = {
  index: resolve(__dirname, 'src/index.ts'),
  'components/index': resolve(__dirname, 'src/components/index.ts'),
  'components/ui/index': resolve(__dirname, 'src/components/ui/index.ts'),
  'components/responsive/index': resolve(__dirname, 'src/components/responsive/index.ts'),
  'components/loading/index': resolve(__dirname, 'src/components/loading/index.ts'),
  'lib/index': resolve(__dirname, 'src/lib/index.ts'),
  'hooks/index': resolve(__dirname, 'src/hooks/index.ts'),
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
      outDir: 'dist',
      rollupTypes: false,
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: entryPoints,
      formats: ['es'],
      fileName: (format, entryName) => {
        return `${entryName}.js`
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-hook-form',
        '@hookform/resolvers/zod',
        'zod',
        'lucide-react',
        'sonner',
        'date-fns',
        'recharts',
        'cmdk',
        'vaul',
        'embla-carousel-react',
        'input-otp',
        'react-day-picker',
        'react-resizable-panels',
      ],
      output: {
        preserveModules: false,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})

