import { useEffect, useState } from 'react';

export function useAutoHideMessage(condition: boolean, timeout: number = 3000) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (condition) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, timeout);
      return () => clearTimeout(timer);
    } else {
      setShowMessage(false);
    }
  }, [condition, timeout]);

  return showMessage;
}
