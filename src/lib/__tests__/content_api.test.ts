// Author: Zian Huang
// Date Created: 2025-09-30
// ----------------------------------------

import { describe, it, expect, vi } from "vitest";
import { fetchBlogPosts, fetchProjects } from "../content_api";
import * as contentPageGenerator from "../content_page_generator";

// Mock the content_page_generator module
vi.mock("../content_page_generator", () => ({
    getContentList: vi.fn(),
}));

describe("content_api", () => {
    describe("fetchBlogPosts", () => {
        it("should call getContentList with blogs type and default pagination", async () => {
            const mockData = [
                {
                    slug: "test-post",
                    title: "Test Post",
                    date: "2025-01-15",
                    excerpt: "Test excerpt",
                    thumbnailUrl: "/test.jpg",
                    githubUrl: undefined,
                    isVip: false,
                },
            ];

            vi.mocked(contentPageGenerator.getContentList).mockResolvedValue(mockData);

            const result = await fetchBlogPosts();

            expect(contentPageGenerator.getContentList).toHaveBeenCalledWith("blogs", 1, 6);
            expect(result).toEqual(mockData);
        });

        it("should call getContentList with custom pagination parameters", async () => {
            const mockData = [
                {
                    slug: "test-post",
                    title: "Test Post",
                    date: "2025-01-15",
                    excerpt: "Test excerpt",
                    thumbnailUrl: "/test.jpg",
                    githubUrl: undefined,
                    isVip: false,
                },
            ];

            vi.mocked(contentPageGenerator.getContentList).mockResolvedValue(mockData);

            const result = await fetchBlogPosts(2, 10);

            expect(contentPageGenerator.getContentList).toHaveBeenCalledWith("blogs", 2, 10);
            expect(result).toEqual(mockData);
        });
    });

    describe("fetchProjects", () => {
        it("should call getContentList with projects type and default pagination", async () => {
            const mockData = [
                {
                    slug: "test-project",
                    title: "Test Project",
                    date: "2025-01-15",
                    excerpt: "Test project excerpt",
                    thumbnailUrl: "/project.jpg",
                    githubUrl: "https://github.com/test/repo",
                    isVip: false,
                },
            ];

            vi.mocked(contentPageGenerator.getContentList).mockResolvedValue(mockData);

            const result = await fetchProjects();

            expect(contentPageGenerator.getContentList).toHaveBeenCalledWith("projects", 1, 6);
            expect(result).toEqual(mockData);
        });

        it("should call getContentList with custom pagination parameters", async () => {
            const mockData = [
                {
                    slug: "test-project",
                    title: "Test Project",
                    date: "2025-01-15",
                    excerpt: "Test project excerpt",
                    thumbnailUrl: "/project.jpg",
                    githubUrl: "https://github.com/test/repo",
                    isVip: false,
                },
            ];

            vi.mocked(contentPageGenerator.getContentList).mockResolvedValue(mockData);

            const result = await fetchProjects(3, 12);

            expect(contentPageGenerator.getContentList).toHaveBeenCalledWith("projects", 3, 12);
            expect(result).toEqual(mockData);
        });
    });
});

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
