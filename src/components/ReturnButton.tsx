/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   ReturnButton.tsx                                                         */
/*                                                                            */
/*   By: Zian Huang <zianhuang00@gmail.com>                                   */
/*                                                                            */
/*   Created: 2025/02/17 21:45:47 by Zian Huang                               */
/*   Updated: 2025/03/11 01:20:38 by Zian Huang                               */
/*                                                                            */
/* ************************************************************************** */

'use client';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ReturnButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="return-button hover:bg-muted"
            aria-label="Return to previous page"
        >
            <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5 text-foreground" />
        </button>
    );
} 