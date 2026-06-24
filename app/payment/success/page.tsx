import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function getSingleQueryValue(value?: string | string[]): string {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ request_id?: string | string[]; token?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestId = getSingleQueryValue(params.request_id);
  const token = getSingleQueryValue(params.token);

  const supabase = getSupabaseAdmin();

  const { data: request } = requestId
    ? await supabase
        .from('report_requests')
        .select('id, mode, payment_status, customer_access_token')
        .eq('id', requestId)
        .maybeSingle()
    : { data: null };

  const tokenMatches =
    !!request && typeof token === 'string' && token !== '' && request.customer_access_token === token;
  const isCommercial = request?.mode === 'commercial';
  const isPaid = request?.payment_status === 'paid';
  const isReady = tokenMatches && isPaid && isCommercial;
  const fileHref = isReady
    ? `/commercial-viability-file/${encodeURIComponent(requestId)}/unlock?token=${encodeURIComponent(token)}`
    : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-3">
          Checkout completed
        </p>

        <h1 className="text-3xl font-bold text-stone-900 mb-4">
          {isReady ? 'Your commercial viability file is ready.' : 'Payment received. Your file is being unlocked.'}
        </h1>

        <p className="text-sm text-stone-600 leading-7 max-w-2xl mx-auto">
          {isReady
            ? 'Your payment has been confirmed and the file is ready to open.'
            : 'Payment received. Your file may take a few seconds to unlock. Refresh this page shortly.'}
        </p>

        <p className="text-sm text-stone-500 leading-7 max-w-2xl mx-auto mt-4">
          YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, or a substitute for professional due diligence.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          {fileHref ? (
            <Link
              href={fileHref}
              className="bg-green-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-green-800"
            >
              View your viability file
            </Link>
          ) : (
            <span className="inline-flex items-center justify-center bg-green-700 text-white px-5 py-2.5 rounded text-sm font-medium opacity-70">
              View your viability file
            </span>
          )}

          <Link
            href="/check?mode=commercial"
            className="bg-white text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
          >
            Run another commercial check
          </Link>

          <Link
            href="/"
            className="bg-white text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
