// Author: Zian Huang
// Date Created: 2025-07-03
// ----------------------------------------

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface LazyImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
    sizes?: string;
    onClick?: () => void;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    sizes,
    onClick,
    placeholder = 'empty',
    blurDataURL
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority); // If priority, load immediately
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (priority) return; // Skip intersection observer if priority is true

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px' // Load images 50px before they come into view
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    if (hasError) {
        return (
            <div 
                ref={imgRef}
                className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}
                style={{ width, height }}
            >
                <span className="text-sm">Failed to load image</span>
            </div>
        );
    }

    return (
        <div ref={imgRef} className={`relative ${className}`}>
            {/* Skeleton/placeholder while loading */}
            {!isLoaded && (
                <div 
                    className="absolute inset-0 bg-muted animate-pulse rounded-md"
                    style={{ width, height }}
                />
            )}
            
            {/* Actual image */}
            {isInView && (
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={`transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={handleLoad}
                    onError={handleError}
                    priority={priority}
                    sizes={sizes}
                    placeholder={placeholder}
                    blurDataURL={blurDataURL}
                    onClick={onClick}
                />
            )}
        </div>
    );
};

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.