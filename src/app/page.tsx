// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [typedText, setTypedText] = useState("");
    const fullText = "Riding the tide and waves of numerics, no pressure, as fluid simply flows";
    const typingSpeed = 50; // milliseconds per character

    useEffect(() => {
        if (typedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, typingSpeed);

            return () => clearTimeout(timeout);
        }
    }, [typedText]);

    return (
        <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center py-8 md:py-12">
            <div className="max-w-4xl w-full px-4 md:px-8">
                {/* Header section with name and intro */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                    {/* Left column - Text content */}
                    <div className="space-y-4 md:space-y-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-foreground">
                            <span className="text-primary">Zian</span> HUANG
                        </h1>

                        <div className="h-12 sm:h-16">
                            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-mono">
                                {typedText}
                                <span className="blink-cursor">▊</span>
                            </p>
                        </div>
                    </div>

                    {/* Right column - Geometric/Mathematical visual (desktop only) */}
                    <div className="hidden md:flex justify-center items-center">
                        <div className="relative h-48 flex items-center justify-center">
                            <Image
                                src="/homeicon.svg"
                                alt="Home icon"
                                width={160}
                                height={160}
                                className="opacity-80 transition-all duration-300 home-icon"
                                style={{ filter: 'var(--svg-filter)' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile-only horizontal layout for intro and visual */}
                <div className="flex md:hidden items-center justify-between mt-6 mb-8 ml-10 mr-10">
                    <div className="flex-1 pr-4">
                        <p className="text-sm text-muted-foreground">
                            A <span className="text-primary font-medium">software engineer</span> / <span className="text-accent font-medium">computational physicist</span>
                        </p>
                    </div>

                    <div className="relative h-20 flex-shrink-0 flex items-center justify-center">
                        <Image
                            src="/homeicon.svg"
                            alt="Home icon"
                            width={70}
                            height={70}
                            className="opacity-80 home-icon"
                            style={{ filter: 'var(--svg-filter)' }}
                        />
                    </div>
                </div>

                {/* Bottom section with quick links */}
                <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    <Link href="/projects" className="group p-4 md:p-6 bg-card rounded-md border border-border hover:shadow-md transition-all duration-300 block">
                        <h2 className="text-lg md:text-xl font-mono mb-2 md:mb-3 text-foreground group-hover:text-primary">
                            <span className="text-primary">{'>'}</span> Projects
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">My selected academic and technical works</p>
                    </Link>

                    <Link href="/blogs" className="group p-4 md:p-6 bg-card rounded-md border border-border hover:shadow-md transition-all duration-300 block">
                        <h2 className="text-lg md:text-xl font-mono mb-2 md:mb-3 text-foreground group-hover:text-primary">
                            <span className="text-primary">{'>'}</span> Blog
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">My thoughts at the crossroad of maths and computing</p>
                    </Link>

                    <Link href="/gallery" className="group p-4 md:p-6 bg-card rounded-md border border-border hover:shadow-md transition-all duration-300 block">
                        <h2 className="text-lg md:text-xl font-mono mb-2 md:mb-3 text-foreground group-hover:text-primary">
                            <span className="text-primary">{'>'}</span> Gallery
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">My visual art studies and creative explorations</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
