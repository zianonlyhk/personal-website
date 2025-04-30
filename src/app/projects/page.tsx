// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import { useEffect, useState } from 'react';
import ContentPreview from '@/src/components/ContentPreview';

type Project = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    thumbnailUrl: string;
    githubUrl?: string;
    isVip: boolean;
};

type LinkType = {
    type: 'github' | 'external' | 'internal';
    url: string;
    label: string;
    className: string;
};
import Masonry from 'react-masonry-css';
import { fetchProjects } from '../../lib/content_api';

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function loadProjects() {
            try {
                const allProjects = await fetchProjects(1, 9999); // Get all to calculate total pages
                const projectData = await fetchProjects(currentPage);
                setProjects(projectData);
                setTotalPages(Math.ceil(allProjects.length / 9));
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, [currentPage]);

    const breakpointColumns = {
        default: 3,
        1100: 2,
        700: 1,
        500: 1
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-12">
            <div className="flex flex-col items-center mb-8">
                <h1 className="title-boss text-center">
                    <span className="text-primary">&gt;</span> <span className="font-mono">Projects</span>
                </h1>
                <p className="body-medium text-muted-foreground mt-2 text-center max-w-2xl">
                    A set of my academic and technical work
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-muted-foreground">Loading projects...</div>
                </div>
            ) : (
                <Masonry
                    breakpointCols={breakpointColumns}
                    className="masonry-grid"
                    columnClassName="masonry-grid-column"
                >
                    {projects.map((eachProj) => {
                        const links: LinkType[] = [];

                        // Only add GitHub link if a GitHub url is provided
                        if (eachProj.githubUrl) {
                            links.push({
                                type: 'github',
                                url: eachProj.githubUrl,
                                label: 'GitHub',
                                className: 'preview_link'
                            });
                        }

                        return (
                            <div key={eachProj.slug} className="mb-4">
                                <ContentPreview
                                    title={eachProj.title}
                                    preview={eachProj.excerpt}
                                    thumbnailUrl={eachProj.thumbnailUrl}
                                    links={links}
                                    titleUrl={`/projects/${eachProj.slug}`}
                                    isVip={eachProj.isVip}
                                />
                            </div>
                        );
                    })}
                </Masonry>
            )}

            {!loading && totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md bg-background/80 hover:bg-muted disabled:hover:bg-transparent disabled:opacity-50 text-foreground transition-colors"
                    >
                        Previous
                    </button>
                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-md transition-colors ${currentPage === page
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-background/80 hover:bg-muted text-foreground'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-md bg-background/80 hover:bg-muted disabled:hover:bg-transparent disabled:opacity-50 text-foreground transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
