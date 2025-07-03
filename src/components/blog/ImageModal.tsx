// Author: Zian Huang
// Date Created: 2025-07-03
// ----------------------------------------

import React from 'react';
import NextImage from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalImage {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface ImageModalProps {
    image: ModalImage;
    isSmallScreen: boolean;
    onClose: () => void;
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

const ImageModal: React.FC<ImageModalProps> = ({ image, isSmallScreen, onClose }) => {
    const modalDimensions = getModalDimensions(image.width, image.height, isSmallScreen);

    return (
        <div className="modal" onClick={onClose}>
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
                    onClick={onClose}
                    className="close-button absolute top-2 right-2"
                    aria-label="Close modal"
                >
                    <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-foreground" />
                </button>

                <div
                    className="relative"
                    style={{
                        width: modalDimensions.width,
                        height: modalDimensions.height,
                    }}
                >
                    <NextImage
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="image object-contain"
                        priority
                        unoptimized={true}
                        style={{
                            transform: modalDimensions.shouldRotate
                                ? `rotate(-90deg) scale(${image.width / image.height})`
                                : 'none',
                            transformOrigin: 'center center',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageModal;

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.