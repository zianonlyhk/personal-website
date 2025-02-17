'use client';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ReturnButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="button fixed top-16 left-4 md:top-24 md:left-8 "
            aria-label="Return to previous page"
        >
            <FontAwesomeIcon icon={faArrowLeft} className="button-icon" />
        </button>
    );
} 