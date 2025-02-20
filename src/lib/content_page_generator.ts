/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   content_page_generator.ts                                                */
/*                                                                            */
/*   By: Zian Huang <zianhuang00@gmail.com>                                   */
/*                                                                            */
/*   Created: 2025/02/17 21:45:32 by Zian Huang                               */
/*   Updated: 2025/02/19 16:40:58 by Zian Huang                               */
/*                                                                            */
/* ************************************************************************** */

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
export async function getContentList(contentType: ContentType) {

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

    return allContentData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ----------------------------------------------------------------------------------------------
// ---------------------- used by [slug]/page.tsx -----------------------------------------------
// ----------------------------------------------------------------------------------------------

// Custom plugin to wrap images
function remarkWrapImages() {
    return (tree) => {
        visit(tree, 'image', (node, index, parent) => {
            if (parent && index !== null) {
                // Parse potential width and height from title field
                // Format: ![alt](src "width=500 height=300")
                let width, height;
                if (node.title) {
                    const params = node.title.split(' ');
                    params.forEach(param => {
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
                            className: ['relative', 'w-full', width && height ? '' : 'aspect-[2/1]', 'mb-8']
                        }
                    },
                    children: [{
                        type: 'element',
                        data: {
                            hName: 'img',
                            hProperties: {
                                alt: node.alt || 'This is an image giving insight into the content above and below',
                                decoding: 'async',
                                className: ['rounded-lg', 'object-cover'],
                                style: width && height ?
                                    [`width:${width}px`, `height:${height}px`] :
                                    ['position:absolute', 'height:100%', 'width:100%', 'left:0', 'top:0', 'right:0', 'bottom:0', 'color:transparent'],
                                sizes: "100vw",
                                src: node.url,
                                ...(width && height ? { width, height } : { fill: true }),
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