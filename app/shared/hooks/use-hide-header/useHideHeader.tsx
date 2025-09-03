import { useEffect, useState } from 'react';

export function useHideHeader(threshold = 0.1) {
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const footerEl = document.getElementById('footer');
    if (!footerEl) return;

    const handleScroll = () => {
      const footerTop = footerEl.getBoundingClientRect().top;
      setHideHeader(footerTop <= window.innerHeight * (1 - threshold));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return hideHeader;
}
