// Author: Zian Huang
// Date Created: 2025-07-03
// ----------------------------------------

import { useState, useEffect, useCallback } from 'react';

interface ModalImage {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export const useImageModal = () => {
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

    return {
        selectedImage,
        isSmallScreen,
        closeModal
    };
};

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.