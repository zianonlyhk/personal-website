---
title: "How this website was built with Next.js"
excerpt: "An overview of my personal website built with Next.js featuring responsive design, LaTeX support, and optimised deployment"
githubUrl: "https://github.com/zianonlyhk/personal-website"
thumbnailUrl: "/projects/01_nextjs_web_dev/web_dev_thumbnail.jpg"
---

This personal website represents a comprehensive exploration of modern web development practices, built entirely with Next.js 15 and deployed on Fly.io. The project demonstrates advanced React patterns, server-side rendering optimisation, and sophisticated content management techniques that create a seamless user experience across all devices.

## Technical: Foundation and Architecture

The website is built on Next.js 15, leveraging the latest App Router architecture to provide optimal performance and developer experience. Key architectural decisions include:

- **Server Components by Default**: Maximizing performance by minimizing client-side JavaScript
- **Dynamic Route Caching**: Implementing ISR (Incremental Static Regeneration) for content pages
- **Edge Runtime**: Utilizing Next.js middleware for efficient request handling

The project structure follows modern React conventions with a clear separation of concerns between server and client components. The application utilises TypeScript throughout for type safety and enhanced development experience, ensuring robust code quality and maintainability. For example, the `layout.tsx` file implements a root layout pattern that provides consistent styling and metadata across all pages.

The core architecture revolves around a content-driven approach where blog posts and project pages are authored in Markdown format and processed server-side into optimised HTML. This approach provides the flexibility of static site generation while maintaining the dynamic capabilities of a full-stack application.

## Writing: Advanced Content Management System

### Markdown Processing Pipeline

The content management system implements a sophisticated markdown processing pipeline that transforms raw markdown files into rich, interactive web content. Key challenges addressed include:

- **Image Optimization**: Automatic generation of responsive image sizes
- **Code Block Syntax Highlighting**: Server-side processing for consistent rendering
- **Math Equation Support**: Seamless LaTeX integration without client-side flicker

The system uses a combination of remark and rehype plugins to handle these content types:

```typescript
const processedContent = await remark()
  .use(remarkMath)
  .use(remarkWrapImages)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeStringify)
  .process(content);
```

This pipeline enables seamless integration of mathematical equations using KaTeX, automatic image optimisation, and custom HTML generation. The `remarkWrapImages` plugin automatically wraps images in responsive containers with proper aspect ratios and styling classes. For example, it transforms:

```markdown
![Alt text](image.jpg)
```

Into:

```html
<div class="image-container">
  <img src="image.jpg" alt="Alt text" loading="lazy">
</div>
```

The plugin also handles responsive sizing through CSS viewport units and maintains aspect ratios using padding techniques.

### Dynamic Content Loading

The content API implements server actions for efficient data fetching, utilizing Next.js's built-in caching mechanisms. The `getContentList` function provides paginated content loading with metadata extraction from frontmatter, enabling scalable content management as the site grows.

```typescript
export async function fetchBlogPosts(page: number = 1, pageSize: number = 6) {
    return getContentList('blogs', page, pageSize);
}
```

## Presentation: Gallery, Images and Maths Equations

### Advanced Modal Implementation

The image viewing system features a modal implementation that adapts to different screen sizes and orientations while maintaining performance. Key optimizations include:

- **Lazy Loading**: Images only load when needed
- **Intersection Observer**: Efficient viewport detection
- **Memory Management**: Cleanup of unused resources

The `getModalDimensions` function calculates optimal display dimensions based on viewport constraints and image aspect ratios, using a memoized calculation to avoid unnecessary re-renders:

```typescript
const dimensions = useMemo(() => {
  return getModalDimensions(imageWidth, imageHeight, window.innerWidth, window.innerHeight);
}, [imageWidth, imageHeight]);
```

For mobile devices, the system implements intelligent image rotation for landscape images, ensuring optimal viewing experience across all device orientations:

```typescript
if (isSmallScreen && imageWidth > imageHeight) {
  // Swap image dimensions to account for rotation
  const rotatedWidth = imageHeight;
  const rotatedHeight = imageWidth;
  // Calculate optimal dimensions for rotated display
}
```

### Event-Driven Image Handling

The image interaction system uses event delegation and dynamic handler attachment to manage click events on dynamically generated content. The `addImageClickHandlers` function ensures all images within project and blog contents become interactive without requiring manual configuration.

### LaTeX Integration

Mathematical equations are rendered using KaTeX. The system supports both inline and display mathematics, with automatic overflow handling for complex equations:

```css
.katex-display {
  overflow-x: auto;
  padding: 1rem 0;
}
```

The integration ensures mathematical content remains accessible and properly formatted across all device sizes, with touch-friendly scrolling for complex equations on mobile devices.

## Deployment and SEO Implementation

The application is containerized using Docker with a multi-stage build process optimised for production deployment:

The deployment utilises Fly.io's global edge network with the following configuration:

- **Region**: Singapore (sin) for optimal Asia-Pacific performance
- **Auto-scaling**: Automatic machine management with zero-downtime deployments
- **HTTPS adoption**: Enforcethe use of HTTPS and SSL certificate for tight security

The site implements comprehensive SEO optimisation through Next.js's Metadata API, providing dynamic meta tags, Open Graph integration, and structured data markup. Each page generates appropriate metadata based on content type and context. The file `sitemap.ts` automatically gives a sitemap for web scrapper with:

- **Priority Scoring**: Important pages get higher priority
- **Change Frequency**: Content marked as 'monthly'
- **Last Modified**: Accurate timestamps for content freshness

## Performance Metrics and Results

The optimised architecture delivers exceptional performance metrics:

- **Lighthouse Performance Score**: 98/100
- **First Contentful Paint**: <1.2s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Bundle Size**: <150kb gzipped

These metrics demonstrate the effectiveness of the optimisation strategies and modern development practices implemented throughout the project.

## Future Enhancements and Scalability

The architecture is designed for future expansion with planned enhancements including:

- **Internationalization**: Chinese language support using Next.js i18n
- **Comment system**: Interactive user engagement features
- **Analytics integration**: Comprehensive user behaviour tracking

This project demonstrates the power of modern web development tools and practices, creating a fast, accessible, and maintainable personal website that serves as both a portfolio and a technical showcase. The complete implementation is available on GitHub for reference and learning purposes.