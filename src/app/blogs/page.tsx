import { getContentList } from '@/src/lib/content_page_generator';
import ContentPreview from '@/src/components/ContentPreview';

export default async function Blog() {
    const allMarkdownBlogPosts = await getContentList('blogs');

    return (
        <div className="content_container items-center">
            <h1 className="title-boss">_blogPosts</h1>
            <div className="blog_post_preview_container">
                {allMarkdownBlogPosts.map((eachPost) => {
                    const links = [];
                    // Immediately add the Read More link
                    links.push({
                        type: 'internal',
                        url: `/blogs/${eachPost.slug}`,
                        label: 'Read More',
                        className: eachPost.isVip ? 'preview_link_accent' : 'preview_link'
                    });

                    return (
                        <ContentPreview
                            key={eachPost.slug}
                            title={eachPost.title}
                            preview={eachPost.excerpt}
                            date={eachPost.date}
                            thumbnailUrl={eachPost.thumbnailUrl}
                            links={links}
                        />
                    );
                })}
            </div>
        </div>
    );
} 