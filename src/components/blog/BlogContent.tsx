// Author: Zian Huang
// Date Created: 2025-07-03
// ----------------------------------------

import React from 'react';

interface BlogContentProps {
    content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
    return (
        <div
            className="content_content prose prose-headings:font-sans prose-h1:title-large prose-h2:title-medium prose-h3:title-small prose-p:body-medium prose-ul:unordered-list prose-ol:ordered-list max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
                overflowX: 'auto',
                padding: '0.5rem 0'
            }}
        />
    );
};

export default BlogContent;

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.