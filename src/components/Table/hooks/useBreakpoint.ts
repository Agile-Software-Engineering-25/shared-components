import { useState, useEffect } from 'react';

interface UseBreakpointReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
  width: number;
}

const useBreakpoint = (
  mobileBreakpoint = 768,
  tabletBreakpoint = 1024
): UseBreakpointReturn => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isMobile = windowWidth < mobileBreakpoint;
  const isTablet = windowWidth >= mobileBreakpoint && windowWidth < tabletBreakpoint;
  const isDesktop = windowWidth >= tabletBreakpoint;

  const breakpoint: 'mobile' | 'tablet' | 'desktop' = 
    isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  return {
    isMobile,
    isTablet,
    isDesktop,
    breakpoint,
    width: windowWidth,
  };
};

export default useBreakpoint;