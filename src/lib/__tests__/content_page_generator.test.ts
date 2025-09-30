// Author: Zian Huang
// Date Created: 2025-09-30
// ----------------------------------------

import { describe, it, expect, beforeEach, vi } from "vitest";
import fs from "fs";
import path from "path";
import { getContentList, getContentPage } from "../content_page_generator";

// Mock fs and path modules
vi.mock("fs");
vi.mock("path");

describe("content_page_generator", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getContentList", () => {
        it("should return a list of blog posts sorted by date", async () => {
            const mockFileNames = ["post1.md", "post2.md", "post3.md"];
            const mockContent1 = `---
title: Test Post 1
date: 2025-01-15
excerpt: This is test post 1
thumbnailUrl: /test1.jpg
---
Content here`;

            const mockContent2 = `---
title: Test Post 2
date: 2025-01-20
excerpt: This is test post 2
thumbnailUrl: /test2.jpg
isVip: true
---
Content here`;

            const mockContent3 = `---
title: Test Post 3
date: 2025-01-10
excerpt: This is test post 3
thumbnailUrl: /test3.jpg
---
Content here`;

            vi.mocked(path.join).mockImplementation((...args) => args.join("/"));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            vi.mocked(fs.readdirSync).mockReturnValue(mockFileNames as any);
            vi.mocked(fs.readFileSync)
                .mockReturnValueOnce(mockContent1)
                .mockReturnValueOnce(mockContent2)
                .mockReturnValueOnce(mockContent3);

            const result = await getContentList("blogs", 1, 10);

            expect(result).toHaveLength(3);
            expect(result[0]?.title).toBe("Test Post 2"); // Latest date first
            expect(result[1]?.title).toBe("Test Post 1");
            expect(result[2]?.title).toBe("Test Post 3");
            expect(result[1]?.isVip).toBe(false);
            expect(result[0]?.isVip).toBe(true);
        });

        it("should paginate results correctly", async () => {
            const mockFileNames = ["post1.md", "post2.md", "post3.md", "post4.md", "post5.md"];
            const mockContent = (num: number, date: string) => `---
title: Test Post ${num}
date: ${date}
excerpt: This is test post ${num}
thumbnailUrl: /test${num}.jpg
---
Content here`;

            vi.mocked(path.join).mockImplementation((...args) => args.join("/"));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            vi.mocked(fs.readdirSync).mockReturnValue(mockFileNames as any);
            vi.mocked(fs.readFileSync)
                .mockReturnValueOnce(mockContent(1, "2025-01-15"))
                .mockReturnValueOnce(mockContent(2, "2025-01-16"))
                .mockReturnValueOnce(mockContent(3, "2025-01-17"))
                .mockReturnValueOnce(mockContent(4, "2025-01-18"))
                .mockReturnValueOnce(mockContent(5, "2025-01-19"));

            const page1 = await getContentList("blogs", 1, 2);
            expect(page1).toHaveLength(2);
            expect(page1[0]?.title).toBe("Test Post 5");
            expect(page1[1]?.title).toBe("Test Post 4");
        });

        it("should work for projects content type", async () => {
            const mockFileNames = ["project1.md"];
            const mockContent = `---
title: Test Project
date: 2025-01-15
excerpt: This is a test project
thumbnailUrl: /project.jpg
githubUrl: https://github.com/test/project
---
Content here`;

            vi.mocked(path.join).mockImplementation((...args) => args.join("/"));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            vi.mocked(fs.readdirSync).mockReturnValue(mockFileNames as any);
            vi.mocked(fs.readFileSync).mockReturnValue(mockContent);

            const result = await getContentList("projects", 1, 10);

            expect(result).toHaveLength(1);
            expect(result[0]?.title).toBe("Test Project");
            expect(result[0]?.githubUrl).toBe("https://github.com/test/project");
        });
    });

    describe("getContentPage", () => {
        it("should return content page with processed HTML", async () => {
            const mockContent = `---
title: Test Blog Post
date: 2025-01-15
githubUrl: https://github.com/test/repo
---
# Hello World

This is a test.`;

            vi.mocked(path.join).mockImplementation((...args) => args.join("/"));
            vi.mocked(fs.readFileSync).mockReturnValue(mockContent);

            const result = await getContentPage("test-post", "blogs");

            expect(result).toBeDefined();
            expect(result?.title).toBe("Test Blog Post");
            expect(result?.date).toBe("2025-01-15");
            expect(result?.slug).toBe("test-post");
            expect(result?.githubUrl).toBe("https://github.com/test/repo");
            expect(result?.content).toContain("Hello World");
        });

        it("should return null when file does not exist", async () => {
            vi.mocked(path.join).mockImplementation((...args) => args.join("/"));
            vi.mocked(fs.readFileSync).mockImplementation(() => {
                throw new Error("File not found");
            });

            const result = await getContentPage("non-existent", "blogs");

            expect(result).toBeNull();
        });

        it("should process math equations with KaTeX", async () => {
            const mockContent = `---
title: Math Test
date: 2025-01-15
---
Inline math: $x = y$

Block math:

$$
E = mc^2
$$`;

            vi.mocked(path.join).mockImplementation((...args) => args.join("/"));
            vi.mocked(fs.readFileSync).mockReturnValue(mockContent);

            const result = await getContentPage("math-test", "blogs");

            expect(result?.content).toBeDefined();
            // KaTeX should wrap math in specific HTML
            expect(result?.content).toContain("katex");
        });
    });
});

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
