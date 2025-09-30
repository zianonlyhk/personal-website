"use client";

import { useEffect, useState } from "react";

interface TypingEffectProps {
    text: string;
    className?: string;
    typingSpeed?: number;
}

export default function TypingEffect({ text, className = "", typingSpeed = 50 }: TypingEffectProps) {
    const [typedText, setTypedText] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        if (typedText.length < text.length) {
            const timeout = setTimeout(() => {
                setTypedText(text.slice(0, typedText.length + 1));
            }, typingSpeed);

            return () => clearTimeout(timeout);
        }

        return;
    }, [typedText, text, typingSpeed, mounted]);

    // Show full text immediately on server-side and before mount to prevent layout shift
    if (!mounted) {
        return (
            <p className={className}>
                {text}
                <span className="blink-cursor">▊</span>
            </p>
        );
    }

    return (
        <p className={className}>
            {typedText}
            <span className="blink-cursor">▊</span>
        </p>
    );
}
