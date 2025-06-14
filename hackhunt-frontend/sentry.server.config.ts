import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://a4f159538b9ed14d320d0e06c051180e@o4509484390350848.ingest.de.sentry.io/4509484416303184',
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
