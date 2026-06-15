import ThankYouClient from '@/components/ThankYouClient';

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ request_id?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestId = Array.isArray(params.request_id)
    ? params.request_id[0]
    : params.request_id ?? '';

  return <ThankYouClient requestId={requestId} />;
}
