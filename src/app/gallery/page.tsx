'use client';
import { useState } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

interface GalleryItem {
    id: number;
    title: string;
    image_url: string;
    width: number;
    height: number;
    isVip?: boolean;
}

function calculateDimensions(imageWidth: number, imageHeight: number) {
    if (typeof window === 'undefined') return { width: 0, height: 0 };

    const maxWidth = window.innerWidth * 0.95 - 32; // 95% of viewport width minus padding
    const maxHeight = window.innerHeight * 0.95 - 32; // 95% of viewport height minus padding

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

    return { width, height };
}

export default function Gallery() {
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    // Notes to my future self: If I want to add more images, I can add them here
    const galleryItems: GalleryItem[] = [
        { id: 1, title: "Pepper (colour pencil)", image_url: "/gallery/drpepper.jpg", width: 5184, height: 3081 },
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

            {/* Modal */}
            {selectedItem && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="bg-card rounded-lg p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '95vw',
                            maxHeight: '95vh',
                            width: 'auto',
                            height: 'auto'
                        }}
                    >
                        <div className="relative" style={{
                            width: calculateDimensions(selectedItem.width, selectedItem.height).width,
                            height: calculateDimensions(selectedItem.width, selectedItem.height).height,
                        }}>
                            <Image
                                src={selectedItem.image_url}
                                alt={selectedItem.title}
                                fill
                                className="image object-contain"
                                sizes="95vw"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 