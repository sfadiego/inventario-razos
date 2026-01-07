import * as Sentry from '@sentry/react';
import 'flatpickr/dist/flatpickr.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'swiper/swiper-bundle.css';
import './index.css';
// datatable
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

// error logging
import './../../instrument';

// app
import { App } from './App';

import ErrorFallback from './components/errors/ErrorFallback';
const container = document.getElementById('root');

const options = {
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn('Uncaught error', error, errorInfo.componentStack);
  }),
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: Sentry.reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: Sentry.reactErrorHandler(),
};

createRoot(container!, options).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>,
);
