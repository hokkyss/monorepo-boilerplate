import './styles.css';

import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import envConfig from './configs/env/env.config';
import router from './configs/route/route.config';
import reportAccessibility from './reports/accessibility/accessibility.report';
import reportWebVitals from './reports/web-vitals/web-vitals.report';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement, {
    identifierPrefix: envConfig.appPrefix,
  });

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );

  reportAccessibility();
  // NOTE: report web vitals is DEV only
  // eslint-disable-next-line no-console
  reportWebVitals(console.debug);
}
