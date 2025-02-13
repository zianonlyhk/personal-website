import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

const blogPostDirectory = path.join(process.cwd(), 'content/blog');
const projectDirectory = path.join(process.cwd(), 'content/projects');

// First, let's define a type for the content type
type ContentType = 'blog' | 'project';

// Add these interfaces near the top of the file, after the ContentType definition
interface BaseContentData {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
}

interface ProjectData extends BaseContentData {
    githubUrl: string;
    thumbnailUrl: string;
}

interface BlogData extends BaseContentData {
    // Add any blog-specific fields here
}

// Helper function to get the appropriate directory
function getContentDirectory(contentType: ContentType) {
    return contentType === 'blog' ? blogPostDirectory : projectDirectory;
}

// Unified function to get content list
export async function getContentList(contentType: ContentType): Promise<ProjectData[] | BlogData[]> {
    const directory = getContentDirectory(contentType);
    const fileNames = fs.readdirSync(directory);

    const allContentData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(directory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        const baseData = {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            ...data,
        };

        // Add type assertion here
        if (contentType === 'project') {
            return {
                ...baseData,
                githubUrl: data.githubUrl,
                thumbnailUrl: data.thumbnailUrl,
            } as ProjectData;
        }

        return baseData as BlogData;
    });

    return allContentData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Custom plugin to wrap images
function remarkWrapImages() {
    return (tree) => {
        visit(tree, 'image', (node, index, parent) => {
            if (parent && index !== null) {
                const wrapper = {
                    type: 'div',
                    data: {
                        hName: 'div',
                        hProperties: {
                            className: ['relative', 'w-full', 'aspect-[2/1]', 'mb-8']
                        }
                    },
                    children: [{
                        type: 'element',
                        data: {
                            hName: 'img',
                            hProperties: {
                                alt: node.alt || '',
                                decoding: 'async',
                                className: ['rounded-lg', 'object-cover'],
                                style: ['position:absolute', 'height:100%', 'width:100%', 'left:0', 'top:0', 'right:0', 'bottom:0', 'color:transparent'],
                                sizes: "100vw",
                                fill: true,
                                src: node.url,
                            }
                        }
                    }]
                };
                parent.children.splice(index, 1, wrapper);
            }
        });
    };
}

// Modified getContentPage function to handle both types
export async function getContentPage(slug: string, contentType: ContentType) {
    try {
        const directory = getContentDirectory(contentType);
        const fullPath = path.join(directory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const processedContent = await remark()
            .use(remarkMath)
            .use(remarkWrapImages)
            .use(remarkRehype)
            .use(rehypeKatex)
            .use(rehypeStringify)
            .process(content);
        const contentHtml = processedContent.toString();

        const baseData = {
            slug,
            content: contentHtml,
            title: data.title,
            date: data.date,
            ...data,
        };

        // Add project-specific fields if it's a project
        if (contentType === 'project') {
            return {
                ...baseData,
                githubUrl: data.githubUrl,
                thumbnailUrl: data.thumbnailUrl,
            };
        }

        return baseData;
    } catch {
        return null;
    }
} 