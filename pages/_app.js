import '../styles/globals.css';  // Ensure your global CSS is imported first

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',  // Replace with your Sentry DSN
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
