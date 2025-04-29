// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import Masonry from 'react-masonry-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface GalleryItem {
    id: number;
    title: string;
    image_url: string;
    width: number;
    height: number;
    isVip?: boolean;
}

function getModalDimensions(imageWidth: number, imageHeight: number, isSmallScreen: boolean) {
    if (typeof window === 'undefined') return { width: 0, height: 0, shouldRotate: false };

    const maxWidth = window.innerWidth * 0.9 - 32; // 90% of viewport width minus padding
    const maxHeight = window.innerHeight * 0.9 - 32; // 90% of viewport height minus padding

    // For landscape images on small screens, rotate the image
    if (isSmallScreen && imageWidth > imageHeight) {
        // Swap image dimensions to account for rotation
        const rotatedWidth = imageHeight;
        const rotatedHeight = imageWidth;
        const rotatedAspectRatio = rotatedWidth / rotatedHeight;

        let width = rotatedWidth;
        let height = rotatedHeight;

        // Scale down if rotated image is larger than viewport
        if (width > maxWidth || height > maxHeight) {
            if (maxWidth / maxHeight > rotatedAspectRatio) {
                // Height is the limiting factor
                height = maxHeight;
                width = height * rotatedAspectRatio;
            } else {
                // Width is the limiting factor
                width = maxWidth;
                height = width / rotatedAspectRatio;
            }
        }

        return { width, height, shouldRotate: true };
    }

    // For portrait images or non-small screens, handle normally
    const aspectRatio = imageWidth / imageHeight;

    let width = imageWidth;
    let height = imageHeight;

    // Scale down if image is larger than viewport
    if (width > maxWidth || height > maxHeight) {
        if (maxWidth / maxHeight > aspectRatio) {
            // Height is the limiting factor
            height = maxHeight;
            width = height * aspectRatio;
        } else {
            // Width is the limiting factor
            width = maxWidth;
            height = width / aspectRatio;
        }
    }

    // default to not rotate
    return { width, height, shouldRotate: false };
}

export default function Gallery() {
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Add ESC key handler
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedItem(null);
            }
        };

        // Add screen size check
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768); // 768px is typical mobile breakpoint
        };

        // Initial check
        handleResize();

        // Add event listeners
        window.addEventListener('keydown', handleEscKey);
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleEscKey);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Notes to my future self: If I want to add more images, I can add them here
    const galleryItems: GalleryItem[] = [
        { id: 1, title: "Pepper (colour pencil)", image_url: "/gallery/drpepper.jpg", width: 4108, height: 3081 },
        { id: 2, title: "Woman Sitting (charcoal)", image_url: "/gallery/woman_sitting.jpg", width: 3012, height: 2259, isVip: true },
        { id: 5, title: "KC Printing (printing)", image_url: "/gallery/kc_printing.jpg", width: 3903, height: 2672 },
        { id: 4, title: "Spaghetti (digital)", image_url: "/gallery/spaghetti.jpg", width: 1568, height: 1568 },
        { id: 3, title: "三目 (Python & Cairo)", image_url: "/gallery/three_eyes.jpg", width: 359, height: 359 },
    ];

    // Add this useEffect to handle image loading
    useEffect(() => {
        // Preload images to ensure they're available
        const preloadImages = async () => {
            try {
                const promises = galleryItems.map(item => {
                    return new Promise((resolve, reject) => {
                        const img = new window.Image();
                        img.src = item.image_url;
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                });

                await Promise.all(promises);
                setImagesLoaded(true);
            } catch (error) {
                console.error("Failed to load images:", error);
                // Still set to true to allow rendering even if some images fail
                setImagesLoaded(true);
            }
        };

        preloadImages();
    }, [galleryItems]);

    const breakpointColumns = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-12">
            <div className="flex flex-col items-center mb-8">
                <h1 className="title-boss text-center">
                    <span className="text-primary">&gt;</span> <span className="font-mono">Gallery</span>
                </h1>
                <p className="body-medium text-muted-foreground mt-2 text-center max-w-2xl">
                    A set of visual explorations and digital creations
                </p>
            </div>

            {!imagesLoaded ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-muted-foreground">Loading gallery...</div>
                </div>
            ) : (
                <Masonry
                    breakpointCols={breakpointColumns}
                    className="masonry-grid"
                    columnClassName="masonry-grid-column"
                >
                    {galleryItems.map((item) => (
                        <div
                            key={item.id}
                            className="mb-4 overflow-hidden rounded-md border border-border bg-card hover:shadow-md transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="gallery-image-container">
                                <NextImage
                                    src={item.image_url}
                                    alt={item.title}
                                    width={500}
                                    height={500 * (item.height / item.width)}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                                    <div className="p-4 w-full">
                                        <h3 className="text-white font-medium truncate">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Masonry>
            )}

            {selectedItem && (
                <div
                    className="modal"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            width: 'auto',
                            height: 'auto',
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="close-button absolute top-2 right-2"
                            aria-label="Close modal"
                        >
                            <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-foreground" />
                        </button>

                        <div
                            // if not relative then size of image is not correct
                            className="relative"
                            style={{
                                width: getModalDimensions(selectedItem.width, selectedItem.height, isSmallScreen).width,
                                height: getModalDimensions(selectedItem.width, selectedItem.height, isSmallScreen).height,
                            }}
                        >
                            <NextImage
                                src={selectedItem.image_url}
                                alt={selectedItem.title}
                                fill
                                className="image object-contain"
                                priority
                                unoptimized={true}
                                style={{
                                    // shouldRotate the image if it is landscape on a small screen
                                    transform: getModalDimensions(selectedItem.width, selectedItem.height, isSmallScreen).shouldRotate
                                        // rotate then zoom in if landscape
                                        ? `rotate(-90deg) scale(${selectedItem.width / selectedItem.height})`
                                        // do nothing if portrait
                                        : 'none',
                                    transformOrigin: 'center center',
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
