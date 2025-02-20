/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   page.tsx                                                                 */
/*                                                                            */
/*   By: Zian Huang <zianhuang00@gmail.com>                                   */
/*                                                                            */
/*   Created: 2025/02/17 21:46:32 by Zian Huang                               */
/*   Updated: 2025/02/17 21:46:32 by Zian Huang                               */
/*                                                                            */
/* ************************************************************************** */

import { getContentPage } from '@/src/lib/content_page_generator';
import ReturnButton from '@/src/components/ReturnButton';

type PageProps = {
    params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: PageProps) {
    // Got this error:
    // Error: Route "/blog/[slug]" used `params.slug`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    // So I had to await the params
    const resolvedParams = await params;
    const post = await getContentPage(resolvedParams.slug, 'blogs');

    return (
        <div className="content_container">
            <ReturnButton />
            <h1 className="title-boss mb-2 md:mb-4">{post.title}</h1>
            <div className="content_date">{post.date}</div>
            <div className="content_content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
} 