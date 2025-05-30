import { useState, useEffect } from 'react';

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mobile = /Mobi|Android/i.test(navigator.userAgent);
            setIsMobile(mobile);
        }
    }, []);

    return isMobile;
}