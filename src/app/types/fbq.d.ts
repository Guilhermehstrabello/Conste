// types/fbq.d.ts
interface Window {
  fbq: (
    action: string,
    event: string,
    params?: Record<string, unknown>,
    options?: Record<string, unknown>
  ) => void
}