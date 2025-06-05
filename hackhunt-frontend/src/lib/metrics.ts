// src/lib/metrics.ts

const requestCounters: Record<string, number> = {};

export function incrementRequestCount(method: string) {
  requestCounters[method] = (requestCounters[method] || 0) + 1;
}

export function getMetrics() {
  let result = `# HELP app_requests_total Total number of HTTP requests by method\n# TYPE app_requests_total counter\n`;
  for (const [method, count] of Object.entries(requestCounters)) {
    result += `app_requests_total{method="${method}"} ${count}\n`;
  }
  return result;
}
