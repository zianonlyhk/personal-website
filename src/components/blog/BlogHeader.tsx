// Author: Zian Huang
// Date Created: 2025-07-03
// ----------------------------------------

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface BlogHeaderProps {
    title: string;
    date?: string;
    githubUrl?: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, date, githubUrl }) => {
    return (
        <div className="blog-header">
            <h1 className="title-boss mb-2 md:mb-4 font-mono">{title}</h1>
            {date && (
                <div className="content_date font-mono">{date}</div>
            )}
            {githubUrl && (
                <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-button inline-flex items-center gap-2 mt-2 mb-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
                >
                    <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
                    View on GitHub
                </a>
            )}
        </div>
    );
};

export default BlogHeader;

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.