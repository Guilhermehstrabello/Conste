import { Suspense } from 'react';
import LoginClient from './LoginClient';

export default function BlogLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-10 h-10 border-4 border-[#310276] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white">Carregando...</p>
          </div>
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
