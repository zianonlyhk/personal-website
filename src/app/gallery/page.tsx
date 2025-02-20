/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   page.tsx                                                                 */
/*                                                                            */
/*   By: Zian Huang <zianhuang00@gmail.com>                                   */
/*                                                                            */
/*   Created: 2025/02/17 21:46:41 by Zian Huang                               */
/*   Updated: 2025/02/19 21:23:55 by Zian Huang                               */
/*                                                                            */
/* ************************************************************************** */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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

    const breakpointColumns = {
        default: 4,
        1536: 3,
        1024: 2,
        768: 2,
        640: 1
    };

    return (
        <div className="content_container">
            <h1 className="title-boss">_gallery</h1>
            <Masonry
                breakpointCols={breakpointColumns}
                className="masonry-grid"
                columnClassName="masonry-grid-column"
            >
                {galleryItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-card rounded-lg overflow-hidden mb-4"
                    >
                        <div
                            className="cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="relative">
                                <Image
                                    src={item.image_url}
                                    alt={item.title}
                                    width={item.width}
                                    height={item.height}
                                    className="image w-full h-auto"
                                />
                            </div>
                        </div>
                        <p className={`text-base p-2 ${item.isVip ? 'text-accent-500' : 'text-foreground'}`}>
                            {item.title}
                        </p>
                    </div>
                ))}
            </Masonry>

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
                            className="button absolute -top-4 -left-4"
                            aria-label="Close modal"
                        >
                            <FontAwesomeIcon icon={faXmark} className="button-icon" />
                        </button>

                        <div
                            // if not relative then size of image is not correct
                            className="relative"
                            style={{
                                width: getModalDimensions(selectedItem.width, selectedItem.height, isSmallScreen).width,
                                height: getModalDimensions(selectedItem.width, selectedItem.height, isSmallScreen).height,
                            }}
                        >
                            <Image
                                src={selectedItem.image_url}
                                alt={selectedItem.title}
                                fill
                                className="image object-contain"
                                priority
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