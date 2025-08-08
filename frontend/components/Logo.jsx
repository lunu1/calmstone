'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Logo() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Change logo based on page
  const useLightLogo = pathname === '/aboutus' || pathname === '/contact';
  const logoSrc = useLightLogo ? '/logo.png' : '/logo.png';

  const handleClick = () => {
    router.push('/');
  };

  // ✅ Wait for full page load
  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsPageLoaded(true);
    } else {
      const handleLoad = () => setIsPageLoaded(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isPageLoaded) return null; // ✅ Don't render until page is fully loaded

  return (
    <motion.div
      onClick={handleClick}
      role="button"
      aria-label="Go to homepage"
      className="absolute top-4 left-4 z-50 cursor-pointer select-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src={logoSrc}
        alt="Company Logo"
        width={180}
        height={100}
        priority
        className="object-contain"
      />
    </motion.div>
  );
}
