import Image from 'next/image';

export default function About() {
    return (
        <div className="content_container">
            <h1 className="title-boss">_aboutZian</h1>

            <div className="content_content items-start">

                <div className='w-full flex flex-col md:flex-row justify-between items-center gap-8'>
                    <p>
                        Hi, this guy is a...<br />
                        <span className='text-primary-500'>software developer</span>, and by training, a...<br />
                        <span className='text-accent-500'>computational physicist</span><br />
                        grew up in Hong Kong, born in Shenzhen<br />
                    </p>

                    <div>
                        <Image
                            src="/about/selfie.jpg"
                            alt="About me image"
                            width={200}
                            height={200}
                            priority
                            className="image"
                        />
                    </div>
                </div>


                <h2>Skills</h2>
                <p>
                    So, he does...<br />
                    - software development & scientific computing (C++, Python)<br />
                    You will hear him speaking... <br />
                    - English, Mandarin, and Cantonese <br />
                </p>

                <h2>Experience</h2>
                <p>
                    In the past, he has worked at...<br />
                    2024-2025 - Amidas Hong Kong Limited: Network Security<br />
                </p>

                <h2>Education</h2>
                <p>
                    Earlier than that, he spent a few years studying at...<br />
                    2022-2023 - University of Cambridge: MPhil in Scientific Computing<br />
                    2019-2022 - University College London: BSc in Physics<br />
                </p>

                {/* <div className="image-container">
                    <Image
                        src="/cat4.jpg"
                        alt="About me image"
                        width={200}
                        height={400}
                        priority
                        className="image"
                    />
                </div> */}

            </div>
        </div>
    );
} 