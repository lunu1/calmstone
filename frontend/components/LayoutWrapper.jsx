// components/LayoutWrapper.jsx
'use client';

import { usePathname } from 'next/navigation';
import Logo from './Logo'; // or Header, Navbar, etc.

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <>
      {!isLandingPage && <Logo />}
      {children}
    </>
  );
}
