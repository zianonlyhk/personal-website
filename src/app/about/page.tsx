// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

import Image from 'next/image';

export default function About() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-12">
            {/* Header section with consistent spacing */}
            <div className="flex flex-col items-center mb-8">
                <h1 className="title-boss text-center">
                    <span className="text-primary">&gt;</span> <span className="font-mono">About Zian</span>
                </h1>
                <p className="body-medium text-muted-foreground mt-2 text-center max-w-3xl">
                    I wish to visualise my thoughts and words, that people can talk without speaking
                </p>
            </div>

            <div className="space-y-10">
                {/* Bio section with improved alignment - horizontal on all screen sizes */}
                <div className="flex flex-row gap-4 md:gap-8 items-start">
                    <div className="flex-1 space-y-4">
                        <p className="text-foreground text-sm md:text-base leading-relaxed">
                            Hi, I&apos;m a <span className="text-primary font-medium">software engineer</span> with a background in <span className="text-accent font-medium">computational physics</span>.
                            I was born in Shenzhen, grew up in Hong Kong, and did my university in the UK.
                        </p>
                        <p className="text-foreground text-sm md:text-base leading-relaxed hidden md:block">
                            My work sits at the intersection of mathematics and computing. I enjoy implementing and visualising numerical models for physical intuition.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 md:w-48 md:h-48 rounded-md overflow-hidden border border-border">
                            <Image
                                src="/about/selfie.jpg"
                                alt="Zian Huang"
                                fill
                                sizes="(max-width: 768px) 96px, 192px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Skills section with consistent styling */}
                <div className="bg-card border border-border rounded-md p-5 md:p-6">
                    <h2 className="text-lg md:text-xl font-mono mb-4 text-foreground">
                        <span className="text-primary">&gt;</span> Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h3 className="text-base md:text-lg font-medium">Technical</h3>
                            <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                                <li className="flex items-center">
                                    <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                                    Scientific Computing
                                </li>
                                <li className="flex items-center">
                                    <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                                    Data Analysis
                                </li>
                                <li className="flex items-center">
                                    <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                                    Software Engineering
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-base md:text-lg font-medium">Languages</h3>
                            <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                                <li className="flex items-center">
                                    <span className="inline-block w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                                    English
                                </li>
                                <li className="flex items-center">
                                    <span className="inline-block w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                                    Mandarin
                                </li>
                                <li className="flex items-center">
                                    <span className="inline-block w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                                    Cantonese
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Experience section with consistent timeline styling */}
                <div className="space-y-5">
                    <h2 className="text-lg md:text-xl font-mono text-foreground">
                        <span className="text-primary">&gt;</span> Experience
                    </h2>
                    <div className="space-y-6 pl-1">
                        <div className="relative pl-6">
                            <div className="absolute w-4 h-4 bg-primary rounded-full left-0 top-1"></div>
                            <h3 className="text-base md:text-lg font-medium">Assistant System Engineer - Network Security</h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1.5">Amidas Hong Kong Limited | 2024-2025</p>
                            <p className="mt-3 text-foreground text-sm md:text-base">Implemented the zero-trust security architecture on the application-level of a corporate network</p>
                        </div>
                    </div>
                </div>

                {/* Education section with matching timeline styling */}
                <div className="space-y-5">
                    <h2 className="text-lg md:text-xl font-mono text-foreground">
                        <span className="text-primary">&gt;</span> Education
                    </h2>
                    <div className="space-y-6 pl-1">
                        <div className="relative pl-6">
                            <div className="absolute w-4 h-4 bg-accent rounded-full left-0 top-1"></div>
                            <h3 className="text-base md:text-lg font-medium">MPhil in Scientific Computing</h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1.5">University of Cambridge | 2022-2023</p>
                        </div>
                        <div className="relative pl-6">
                            <div className="absolute w-4 h-4 bg-accent rounded-full left-0 top-1"></div>
                            <h3 className="text-base md:text-lg font-medium">BSc in Physics</h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1.5">University College London | 2019-2022</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
