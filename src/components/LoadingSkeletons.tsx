// Author: Zian Huang
// Date Created: 2025-07-03
// ----------------------------------------

import React from 'react';

// Skeleton component for content preview cards
export const ContentPreviewSkeleton = () => (
    <div className="content_preview animate-pulse">
        <div className="content_preview_image">
            <div className="h-48 bg-muted rounded-t-md" />
        </div>
        <div className="content_preview_content">
            <div className="space-y-3">
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-5/6" />
            </div>
            <div className="content_preview_footer">
                <div className="h-4 bg-muted rounded w-1/4" />
                <div className="h-8 bg-muted rounded w-20" />
            </div>
        </div>
    </div>
);

// Skeleton component for gallery images
export const GalleryImageSkeleton = () => (
    <div className="gallery-image-container animate-pulse">
        <div className="aspect-square bg-muted rounded-md" />
    </div>
);

// Skeleton component for blog content
export const BlogContentSkeleton = () => (
    <div className="content_container animate-pulse">
        <div className="space-y-6">
            {/* Title skeleton */}
            <div className="h-12 bg-muted rounded w-2/3 mx-auto" />
            
            {/* Date skeleton */}
            <div className="h-4 bg-muted rounded w-1/4 ml-auto" />
            
            {/* Content skeleton */}
            <div className="space-y-4">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/5" />
                <div className="h-48 bg-muted rounded my-6" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-2/3" />
            </div>
        </div>
    </div>
);

// Skeleton component for project/blog grid
export const ContentGridSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="masonry-grid">
        {Array.from({ length: 3 }, (_, colIndex) => (
            <div key={colIndex} className="masonry-grid-column" style={{ width: '33.33%' }}>
                {Array.from({ length: Math.ceil(count / 3) }, (_, itemIndex) => (
                    colIndex * Math.ceil(count / 3) + itemIndex < count && (
                        <div key={itemIndex} className="mb-4">
                            <ContentPreviewSkeleton />
                        </div>
                    )
                ))}
            </div>
        ))}
    </div>
);

// Skeleton component for gallery grid
export const GalleryGridSkeleton = ({ count = 9 }: { count?: number }) => (
    <div className="masonry-grid">
        {Array.from({ length: 3 }, (_, colIndex) => (
            <div key={colIndex} className="masonry-grid-column" style={{ width: '33.33%' }}>
                {Array.from({ length: Math.ceil(count / 3) }, (_, itemIndex) => (
                    colIndex * Math.ceil(count / 3) + itemIndex < count && (
                        <div key={itemIndex} className="mb-4">
                            <GalleryImageSkeleton />
                        </div>
                    )
                ))}
            </div>
        ))}
    </div>
);

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.