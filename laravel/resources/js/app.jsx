import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

const appName = 'AI家計簿';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <StrictMode>
        <NextUIProvider>
          <App {...props} />
        </NextUIProvider>
      </StrictMode>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
