// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import { useEffect, useState } from 'react';
import ContentPreview from '@/src/components/ContentPreview';
import Masonry from 'react-masonry-css';
import { fetchProjects } from '../api/content';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProjects() {
            try {
                const projectData = await fetchProjects();
                setProjects(projectData);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

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
                        const links = [];

                        // Only add GitHub link if a GitHub url is provided
                        if (eachProj.githubUrl) {
                            links.push({
                                type: 'github',
                                url: eachProj.githubUrl,
                                label: 'GitHub',
                                className: eachProj.isVip ? 'preview_link_accent' : 'preview_link'
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
        </div>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
