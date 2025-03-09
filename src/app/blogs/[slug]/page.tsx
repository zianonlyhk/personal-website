/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   page.tsx                                                                 */
/*                                                                            */
/*   By: Zian Huang <zianhuang00@gmail.com>                                   */
/*                                                                            */
/*   Created: 2025/02/17 21:46:32 by Zian Huang                               */
/*   Updated: 2025/03/09 12:02:22 by Zian Huang                               */
/*                                                                            */
/* ************************************************************************** */

import { getContentPage } from '@/src/lib/content_page_generator';
import BlogPostClient from '@/src/components/BlogPostClient';

type PageProps = {
    params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: PageProps) {
    // Got this error:
    // Error: Route "/blog/[slug]" used `params.slug`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    // So I had to await the params
    const resolvedParams = await params;
    const post = await getContentPage(resolvedParams.slug, 'blogs');

    return <BlogPostClient post={post} />;
} 