import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const failures = [];

function requireFile(file) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing file: ${file}`);
}

function requireText(file, text) {
  const content = read(file);
  if (!content.includes(text)) failures.push(`${file} missing: ${text}`);
}

function forbidText(file, text) {
  const content = read(file);
  if (content.includes(text)) failures.push(`${file} contains forbidden text: ${text}`);
}

[
  'app/carlon-analytics/commercial-underwriting/page.tsx',
  'app/carlon-analytics/commercial-underwriting/CommercialUnderwritingIntakeClient.tsx',
  'app/carlon-analytics/commercial-underwriting/thank-you/page.tsx',
  'app/api/carlon-analytics/intake/route.ts',
  'types/carlonAnalytics.ts',
].forEach(requireFile);

requireText('components/Header.tsx', 'Carlon Investment Group');
requireText('app/results/page.tsx', 'Request full underwriting');
requireText('app/sample-commercial-viability-file/page.tsx', 'Request full underwriting');
requireText('app/commercial-viability-file/[id]/page.tsx', 'Request full underwriting');
requireText('app/api/carlon-analytics/intake/route.ts', "requested_report_type: 'carlon_analytics_underwriting'");
requireText('app/api/carlon-analytics/intake/route.ts', "payment_status: 'not_required'");
requireText('app/carlon-analytics/commercial-underwriting/page.tsx', 'index: false');
requireText('app/admin/reports/page.tsx', "selectedRequest.requestedReportType === 'carlon_analytics_underwriting'");
requireText('app/admin/reports/page.tsx', 'isStandardPaidProduct');
requireText('app/privacy/page.tsx', 'Carlon Analytics');
requireText('app/terms/page.tsx', 'Carlon Analytics requests');
requireText('scripts/smoke-test-routes.mjs', '/carlon-analytics/commercial-underwriting');

// The £49 Stripe route must remain explicitly limited to the existing Standard product types.
requireText('app/api/report-payment/create-checkout-session/route.ts', "new Set(['standard_pdf', 'standard_viability_file'])");
forbidText('app/api/report-payment/create-checkout-session/route.ts', "'carlon_analytics_underwriting'");

// Private-site data is checked separately before packaging so this public repository does not carry private identifiers in its own verification rules.

if (failures.length) {
  console.error('Carlon Analytics bridge verification: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Carlon Analytics bridge verification: PASS');
