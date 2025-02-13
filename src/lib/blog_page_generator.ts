import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getListOfBlogPosts() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            ...data,
        };
    });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
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

export async function getBlogPost(slug: string) {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
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

        return {
            slug,
            content: contentHtml,
            title: data.title,
            date: data.date,
            ...data,
        };
    } catch {
        return null;
    }
} 