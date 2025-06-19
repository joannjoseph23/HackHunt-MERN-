// utils/sentryLogger.ts
import * as Sentry from '@sentry/nextjs';

type LogLevel = 'info' | 'warning' | 'error' | 'debug' | 'fatal';

export function logToSentry(message: string, level: LogLevel = 'info', context: Record<string, any> = {}) {
  Sentry.captureMessage(message, {
    level,
    extra: context, // optional key-value data
  });
}
