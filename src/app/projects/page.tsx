import ProjectPreview from '@/src/components/ProjectPreview';
import { getContentList } from '@/src/lib/content_page_generator';

export default async function Blog() {
    const allMarkdownProjects = await getContentList('project');

    return (
        <div className="content_container items-center">
            <h1 className="title-boss">Projects</h1>
            <div className="projects_grid">
                {allMarkdownProjects.map((eachProj) => (
                    <ProjectPreview
                        key={eachProj.slug}
                        title={eachProj.title}
                        preview={eachProj.excerpt}
                        date={eachProj.date}
                        githubUrl={eachProj.githubUrl}
                        thumbnailUrl={eachProj.thumbnailUrl}
                        href={`/projects/${eachProj.slug}`}
                    />
                ))}
            </div>
        </div>
    );
} 