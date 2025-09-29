// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Breadcrumb {
    name: string;
    href: string;
}

export default function Breadcrumbs() {
    const pathname = usePathname();
    
    // Don't show breadcrumbs on home page
    if (pathname === '/') {
        return null;
    }
    
    // Generate breadcrumbs based on current path
    const pathSegments = pathname.split('/').filter(segment => segment);
    
    const breadcrumbs: Breadcrumb[] = [
        {
            name: 'Home',
            href: '/',
        },
    ];
    
    pathSegments.forEach((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        let name = segment;
        
        // Capitalize first letter and replace hyphens with spaces
        name = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
        
        breadcrumbs.push({
            name,
            href,
        });
    });
    
    return (
        <nav className="mb-4 md:mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.href} className="flex items-center">
                        {index < breadcrumbs.length - 1 ? (
                            <>
                                <Link 
                                    href={breadcrumb.href} 
                                    className="hover:text-primary transition-colors"
                                >
                                    {breadcrumb.name}
                                </Link>
                                <span className="mx-2">/</span>
                            </>
                        ) : (
                            <span className="text-foreground font-medium" aria-current="page">
                                {breadcrumb.name}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.