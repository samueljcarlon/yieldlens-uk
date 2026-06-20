import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

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

function getAccessCookieName(id: string) {
  return `yieldlens_paid_file_${id}`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = request.nextUrl.searchParams.get('token')?.trim() ?? '';

  if (!id || !token) {
    return NextResponse.redirect(new URL(`/commercial-viability-file/${encodeURIComponent(id)}`, request.url));
  }

  const supabase = getSupabaseAdmin();

  const { data: reportRequest, error } = await supabase
    .from('report_requests')
    .select('id, mode, payment_status, customer_access_token')
    .eq('id', id)
    .maybeSingle();

  if (error || !reportRequest) {
    return NextResponse.redirect(new URL(`/commercial-viability-file/${encodeURIComponent(id)}`, request.url));
  }

  const isValid =
    reportRequest.mode === 'commercial' &&
    reportRequest.payment_status === 'paid' &&
    reportRequest.customer_access_token === token;

  if (!isValid) {
    return NextResponse.redirect(new URL(`/commercial-viability-file/${encodeURIComponent(id)}`, request.url));
  }

  const response = NextResponse.redirect(new URL(`/commercial-viability-file/${encodeURIComponent(id)}`, request.url));
  response.cookies.set({
    name: getAccessCookieName(id),
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: `/commercial-viability-file/${id}`,
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
