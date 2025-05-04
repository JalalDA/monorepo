'use client';

import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isAuthPage = pathname.startsWith('/auth');

      if (user && isAuthPage) {
        router.replace('/'); 
      } else if (!user && !isAuthPage) {
        router.replace('/auth'); 
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
