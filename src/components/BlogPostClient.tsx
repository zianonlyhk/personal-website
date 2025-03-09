'use client';

import { useState, useEffect, useCallback } from 'react';
import NextImage from 'next/image';
import ReturnButton from '@/src/components/ReturnButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    content: string;
    githubUrl?: string;
}

interface ModalImage {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface BlogPostClientProps {
    post: BlogPost | null;
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

export default function BlogPostClient({ post }: BlogPostClientProps) {
    const [selectedImage, setSelectedImage] = useState<ModalImage | null>(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // Create a memoized handler function for image clicks
    const handleImageClick = useCallback((e: MouseEvent) => {
        e.preventDefault();
        const imgElement = e.target as HTMLImageElement;

        // Create a new image to get the natural dimensions
        const tempImg = new Image();
        tempImg.src = imgElement.src;

        tempImg.onload = () => {
            setSelectedImage({
                src: imgElement.src,
                alt: imgElement.alt || 'Blog image',
                width: tempImg.naturalWidth,
                height: tempImg.naturalHeight
            });
        };

        // In case the image fails to load, use fallback dimensions
        tempImg.onerror = () => {
            setSelectedImage({
                src: imgElement.src,
                alt: imgElement.alt || 'Blog image',
                width: 800,
                height: 600
            });
        };
    }, []);

    // Function to add click handlers to all images
    const addImageClickHandlers = useCallback(() => {
        const contentDiv = document.querySelector('.content_content');
        if (contentDiv) {
            const images = contentDiv.querySelectorAll('img');
            images.forEach(img => {
                // Remove any existing handlers first to prevent duplicates
                img.removeEventListener('click', handleImageClick);

                // Add the click handler and styling
                img.style.cursor = 'pointer';
                img.addEventListener('click', handleImageClick);
            });
        }
    }, [handleImageClick]);

    // Close the modal and ensure handlers are reattached
    const closeModal = useCallback(() => {
        setSelectedImage(null);
        // Reattach handlers after modal is closed
        setTimeout(addImageClickHandlers, 50);
    }, [addImageClickHandlers]);

    useEffect(() => {
        // Add click handlers when component mounts
        addImageClickHandlers();

        // Try again after a delay to ensure content is loaded
        const timeoutId = setTimeout(addImageClickHandlers, 500);

        // Add ESC key handler
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
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
            clearTimeout(timeoutId);
            window.removeEventListener('keydown', handleEscKey);
            window.removeEventListener('resize', handleResize);
        };
    }, [addImageClickHandlers, closeModal]);

    if (!post) {
        return (
            <div className="content_container">
                <p>Post not found</p>
            </div>
        );
    }

    return (
        <div className="content_container">
            <ReturnButton />
            <h1 className="title-boss mb-2 md:mb-4">{post.title}</h1>
            <div className="content_date">{post.date}</div>
            <div className="content_content" dangerouslySetInnerHTML={{ __html: post.content }} />

            {selectedImage && (
                <div
                    className="modal"
                    onClick={closeModal}
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
                            onClick={closeModal}
                            className="button absolute -top-4 -left-4"
                            aria-label="Close modal"
                        >
                            <FontAwesomeIcon icon={faXmark} className="button-icon" />
                        </button>

                        <div
                            className="relative"
                            style={{
                                width: getModalDimensions(selectedImage.width, selectedImage.height, isSmallScreen).width,
                                height: getModalDimensions(selectedImage.width, selectedImage.height, isSmallScreen).height,
                            }}
                        >
                            <NextImage
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className="image object-contain"
                                priority
                                unoptimized={true}
                                style={{
                                    transform: getModalDimensions(selectedImage.width, selectedImage.height, isSmallScreen).shouldRotate
                                        ? `rotate(-90deg) scale(${selectedImage.width / selectedImage.height})`
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