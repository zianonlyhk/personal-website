// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

// define different types of content
type ContentType = 'blogs' | 'project';

// ----------------------------------------------------------------------------------------------
// ---------------------- used by blogs/page.tsx and projects/page.tsx -------------------------
// ----------------------------------------------------------------------------------------------

const blogPostDirectory = path.join(process.cwd(), 'content/blogs');
const projectDirectory = path.join(process.cwd(), 'content/projects');

// Helper function to get the appropriate directory
function getContentDirectory(contentType: ContentType) {
    return contentType === 'blogs' ? blogPostDirectory : projectDirectory;
}

// Unified function to get content list
export async function getContentList(contentType: ContentType, page: number = 1, pageSize: number = 6) {
    // based on the contentType, get the appropriate directory
    const directory = getContentDirectory(contentType);
    const fileNames = fs.readdirSync(directory);

    const allContentData = fileNames.map((fileName) => {
        // get the slug and path from the file name
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(directory, fileName);

        // read and parse the file contents
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        // when previewing the blog/project page, fit in as much information as possible
        return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            thumbnailUrl: data.thumbnailUrl,
            githubUrl: data.githubUrl,
            isVip: data.isVip || false,
        };
    });

    const sortedData = allContentData.sort((a, b) => (a.date < b.date ? 1 : -1));
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
}

// ----------------------------------------------------------------------------------------------
// ---------------------- used by [slug]/page.tsx -----------------------------------------------
// ----------------------------------------------------------------------------------------------

// Custom plugin to wrap images
function remarkWrapImages() {
    return (tree: any) => {
        visit(tree, 'image', (node, index, parent) => {
            if (parent && index !== null) {
                // Parse potential width and height from title field
                // Format: ![alt](src "width=500 height=300")
                let width, height;
                if (node.title) {
                    const params = node.title.split(' ');
                    params.forEach((param: string) => {
                        const [key, value] = param.split('=');
                        if (key === 'width') width = value;
                        if (key === 'height') height = value;
                    });
                }

                const wrapper = {
                    type: 'div',
                    data: {
                        hName: 'div',
                        hProperties: {
                            className: ['relative', 'w-full', width && height ? '' : 'aspect-[2/1]', 'mb-8', 'image-container']
                        }
                    },
                    children: [{
                        type: 'element',
                        data: {
                            hName: 'img',
                            hProperties: {
                                src: node.url,
                                alt: node.alt || '',
                                width: width || '100%',
                                height: height || 'auto',
                                className: ['image', 'rounded-md', 'shadow-md', 'mx-auto']
                            }
                        }
                    }]
                };
                parent.children.splice(index, 1, wrapper);
            }
        });
    };
}

// Used by [slug]/page.tsx for blog posts and projects
// Modified getContentPage function to handle both types
export async function getContentPage(slug: string, contentType: ContentType) {
    try {
        // based on the contentType, get the appropriate directory
        const directory = getContentDirectory(contentType);
        const fullPath = path.join(directory, `${slug}.md`);

        // read and parse the file contents
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // process the content into html
        const processedContent = await remark()
            .use(remarkMath)
            .use(remarkWrapImages)
            .use(remarkRehype)
            .use(rehypeKatex)
            .use(rehypeStringify)
            .process(content);
        const contentHtml = processedContent.toString();

        // inside the blog/project page, only care about the title, date, and content
        return {
            slug,
            title: data.title,
            date: data.date,
            content: contentHtml,
            githubUrl: data.githubUrl,
        };
    } catch {
        return null;
    }
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
