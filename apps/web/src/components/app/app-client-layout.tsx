'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useWallet } from '@/components/wallet/wallet-provider';
import { Onboarding } from '@/components/app/onboarding';
import { AppShell } from '@/components/app/app-shell';

/**
 * /app segment layout — the onboarding gate. No profile yet → the create-profile flow
 * (no dashboard chrome). Once a profile exists, every /app/* route renders inside the
 * shared shell (identity + stats + sub-nav).
 */
export function AppClientLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useWallet();
  if (!profile) {
    return (
      <Suspense fallback={<Onboarding />}>
        <OnboardingFromSearchParams />
      </Suspense>
    );
  }
  return <AppShell>{children}</AppShell>;
}

function OnboardingFromSearchParams() {
  const initialHandle = useSearchParams().get('handle') ?? undefined;
  return <Onboarding initialHandle={initialHandle} />;
}
