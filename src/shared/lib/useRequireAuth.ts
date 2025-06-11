import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect on login page
    if (pathname === '/login') return;
    // Check for token in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) {
      router.replace('/login');
    }
  }, [router, pathname]);
}
