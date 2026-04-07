"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type SearchParamsClientProps = {
  children: (redirectTo: string) => React.ReactNode;
};

function SearchParamsContent({ children }: SearchParamsClientProps) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  return <>{children(redirectTo)}</>;
}

export function SearchParamsWrapper({ children }: SearchParamsClientProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsContent children={children} />
    </Suspense>
  );
}
