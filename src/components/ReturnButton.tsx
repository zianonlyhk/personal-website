// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ReturnButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="return-button hover:bg-muted z-40"
            aria-label="Return to previous page"
        >
            <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5 text-foreground" />
        </button>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
