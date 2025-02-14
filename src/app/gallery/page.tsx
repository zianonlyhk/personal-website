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
        { id: 1, title: "My first cat", image_url: "/gallery/cat1.png", width: 775, height: 607 },
        { id: 2, title: "My second cat", image_url: "/gallery/cat2.png", width: 360, height: 500 },
        { id: 3, title: "My third cat", image_url: "/gallery/cat3.jpeg", width: 3000, height: 4500 },
        { id: 4, title: "My fourth cat", image_url: "/gallery/cat4.jpg", width: 5403, height: 3602 },
        { id: 5, title: "My fifth cat", image_url: "/gallery/cat5.jpg", width: 2303, height: 3012 },
        { id: 6, title: "My sixth cat", image_url: "/gallery/cat4.jpg", width: 5403, height: 3602 },
        { id: 7, title: "My seventh cat", image_url: "/gallery/cat4.jpg", width: 5403, height: 3602 },
    ];

    const breakpointColumns = {
        default: 4,
        1536: 3,
        1024: 2,
        640: 1
    };

    return (
        <div className="content_container">
            <h1 className="title-boss">Gallery</h1>
            <Masonry
                breakpointCols={breakpointColumns}
                className="masonry-grid"
                columnClassName="masonry-grid-column"
            >
                {galleryItems.map((item) => (
                    <div
                        key={item.id}
                        className="masonry-item bg-card rounded-lg overflow-hidden mb-4"
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
                        <p className="body-medium p-3">{item.title}</p>
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