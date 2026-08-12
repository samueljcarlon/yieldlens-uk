const DEFAULT_BASE_URL = 'https://yieldlens.co.uk';
const BASE_URL = (process.env.BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
const TIMEOUT_MS = 10000;

const routes = [
  { path: '/', required: true },
  { path: '/check?mode=commercial', required: true },
  { path: '/compare', required: true },
  { path: '/viability-file', required: true },
  { path: '/sample-commercial-viability-file', required: true },
  { path: '/carlon-analytics/commercial-underwriting', required: true },
  { path: '/commercial-lease-viability-check', required: true },
  { path: '/commercial-rent-affordability-calculator', required: true },
  { path: '/restaurant-lease-viability-check', required: true },
  { path: '/salon-lease-viability-check', required: true },
  { path: '/how-much-rent-can-a-cafe-afford', required: true },
  { path: '/how-much-rent-can-a-coffee-shop-afford', required: true },
  { path: '/how-much-rent-can-a-nail-salon-afford', required: true },
  { path: '/how-much-rent-can-a-gym-afford', required: true },
  { path: '/how-much-rent-can-a-shop-afford', required: true },
  { path: '/how-much-rent-can-a-takeaway-afford', required: true },
  { path: '/how-much-rent-can-a-barber-shop-afford', required: true },
  { path: '/commercial-lease-checklist-before-signing', required: true },
  { path: '/commercial-lease-costs-before-signing', required: true },
  { path: '/commercial-heads-of-terms-before-signing', required: true },
  { path: '/commercial-rent-free-period-before-signing', required: true },
  { path: '/commercial-lease-deposit-before-signing', required: true },
  { path: '/commercial-service-charge-before-signing', required: true },
  { path: '/commercial-fit-out-costs-before-signing', required: true },
  { path: '/commercial-business-rates-before-signing', required: true },
  { path: '/commercial-rent-review-before-signing', required: true },
  { path: '/commercial-break-clause-before-signing', required: true },
  { path: '/commercial-repairing-obligations-before-signing', required: true },
  { path: '/commercial-permitted-use-before-signing', required: true },
  { path: '/commercial-lease-length-before-signing', required: true },
  { path: '/commercial-assignment-subletting-before-signing', required: true },
  { path: '/commercial-personal-guarantee-before-signing', required: true },
  { path: '/how-it-works', required: true },
  { path: '/about', required: true },
  { path: '/contact', required: true },
  { path: '/terms', required: true },
  { path: '/privacy', required: true },
  { path: '/sitemap.xml', required: true },
  { path: '/robots.txt', required: true },
];

function makeUrl(path) {
  return new URL(path, `${BASE_URL}/`).toString();
}

function statusClass(status) {
  if (status >= 200 && status < 300) return 'PASS';
  if (status >= 300 && status < 400) return 'WARN';
  return 'FAIL';
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new Error('Request timed out')), TIMEOUT_MS);

  try {
    return await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  if (typeof fetch !== 'function') {
    console.error('Global fetch is not available in this Node runtime.');
    process.exit(1);
  }

  let failed = false;
  console.log(`YieldLens smoke test routes`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Timeout: ${TIMEOUT_MS}ms`);
  console.log('');

  for (const route of routes) {
    const url = makeUrl(route.path);

    try {
      const response = await fetchWithTimeout(url);
      const status = response.status;
      const label = statusClass(status);
      const note = status >= 300 && status < 400 ? 'redirect' : '';

      console.log(`${label} ${status} ${route.path}${note ? ` (${note})` : ''}`);

      if (status >= 400) {
        failed = true;
      }
    } catch (error) {
      failed = true;
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.log(`FAIL network ${route.path} (${message})`);
    }
  }

  console.log('');
  if (failed) {
    console.error('One or more required public routes failed.');
    process.exit(1);
  }

  console.log('All required public routes returned healthy responses.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exit(1);
});
