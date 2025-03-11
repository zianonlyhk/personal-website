'use server';

import { getContentList } from '@/src/lib/content_page_generator';

// Server action to fetch blog posts
export async function fetchBlogPosts() {
    return getContentList('blogs');
}

// Server action to fetch projects
export async function fetchProjects() {
    return getContentList('project');
} 