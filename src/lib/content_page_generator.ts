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
                const wrapper = {
                    type: 'div',
                    data: {
                        hName: 'div',
                        hProperties: {
                            // HTML image container class
                            className: ['relative', 'w-full', 'aspect-[2/1]', 'mb-8']
                        }
                    },
                    children: [{
                        type: 'element',
                        data: {
                            hName: 'img',
                            // HTML image properties
                            hProperties: {
                                alt: node.alt || 'This is an image giving insight into the content above and below',
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