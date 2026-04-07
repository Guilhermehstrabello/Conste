import AuthCallbackClient from './AuthCallbackClient';

export default async function AuthCallback({ searchParams }: { searchParams: Promise<{ redirectTo?: string | string[] }> }) {
  const params = await searchParams;
  const redirectTo = typeof params.redirectTo === 'string' ? params.redirectTo : Array.isArray(params.redirectTo) ? params.redirectTo[0] : undefined;

  return <AuthCallbackClient redirectTo={redirectTo} />;
}
