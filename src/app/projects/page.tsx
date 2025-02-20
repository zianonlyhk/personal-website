/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   page.tsx                                                                 */
/*                                                                            */
/*   By: Zian Huang <zianhuang00@gmail.com>                                   */
/*                                                                            */
/*   Created: 2025/02/17 21:46:51 by Zian Huang                               */
/*   Updated: 2025/02/17 21:46:52 by Zian Huang                               */
/*                                                                            */
/* ************************************************************************** */

import { getContentList } from '@/src/lib/content_page_generator';
import ContentPreview from '@/src/components/ContentPreview';

export default async function Blog() {
    const allMarkdownProjects = await getContentList('project');

    return (
        <div className="content_container items-center">
            <h1 className="title-boss">_projects</h1>
            <div className="project_preview_grid">
                {allMarkdownProjects.map((eachProj) => {
                    const links = [];
                    // Immediately add the Read More link
                    links.push({
                        type: 'internal',
                        url: `/projects/${eachProj.slug}`,
                        label: 'Read More',
                        className: eachProj.isVip ? 'preview_link_accent' : 'preview_link'
                    });

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
                        <ContentPreview
                            key={eachProj.slug}
                            title={eachProj.title}
                            preview={eachProj.excerpt}
                            thumbnailUrl={eachProj.thumbnailUrl}
                            links={links}
                        />
                    );
                })}
            </div>
        </div>
    );
} 