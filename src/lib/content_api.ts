// Author: Zian Huang 
// Date Created: 2025-04-30 
// ---------------------------------------- 

'use server';

import { getContentList } from '@/src/lib/content_page_generator';

// Server action to fetch blog posts
export async function fetchBlogPosts(page: number = 1, pageSize: number = 9) {
    return getContentList('blogs', page, pageSize);
}

// Server action to fetch projects
export async function fetchProjects(page: number = 1, pageSize: number = 9) {
    return getContentList('project', page, pageSize);
}

// ---------------------------------------- 
// Copyright (c) 2025 Zian Huang. All rights reserved.
