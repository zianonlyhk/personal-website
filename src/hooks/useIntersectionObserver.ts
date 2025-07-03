// Author: Zian Huang
// Date Created: 2025-07-03
// ----------------------------------------

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export const useIntersectionObserver = (
    options: UseIntersectionObserverOptions = {}
) => {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true
    } = options;

    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isVisible = entry.isIntersecting;
                
                if (isVisible && (!hasTriggered || !triggerOnce)) {
                    setIsIntersecting(true);
                    setHasTriggered(true);
                } else if (!triggerOnce) {
                    setIsIntersecting(isVisible);
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, triggerOnce, hasTriggered]);

    return {
        ref: elementRef,
        isIntersecting,
        hasTriggered
    };
};

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.