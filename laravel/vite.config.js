import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';

export default defineConfig(() => {
  const envFilePath = path.resolve(__dirname, './env/phpenv');
  const env = dotenv.config({ path: envFilePath });
  dotenvExpand.expand(env);

  return {
    define: {
      'process.env': env,
    },
    plugins: [
      laravel({
        input: 'resources/js/app.jsx',
        ssr: 'resources/js/ssr.jsx',
        refresh: true,
      }),
      react(),
    ],
  };
});
