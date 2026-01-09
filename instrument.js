import * as Sentry from '@sentry/react';

const environment = import.meta.env.VITE_APP_ENV || '';
Sentry.init({
  dsn: environment !== 'local' ? 'https://70406f5e6365e3aaee9309956cefdfb2@o4510659108077568.ingest.us.sentry.io/4510659108929536' : '',
  // dsn: 'https://70406f5e6365e3aaee9309956cefdfb2@o4510659108077568.ingest.us.sentry.io/4510659108929536',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost'],
  // Enable logs to be sent to Sentry
  enableLogs: true,
});
