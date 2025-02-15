import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <main className="flex flex-col items-start">

                <div className="flex gap-2 items-center">
                    <Image
                        className="dark:invert"
                        src="/homeicon.svg"
                        alt="Zian Logo"
                        width={50}
                        height={50}
                    />
                    <p className="home-text">:</p>
                    <p className="home-text">this is zian huang's personal website</p>
                </div>

                <div className="home-text-container">
                    <p className="home-text">:</p>
                    <p className="home-text">
                        learn about his coding <Link href="/projects" className="preview_link">projects</Link>,<br />
                        read his <Link href="/blogs" className="preview_link">blogs</Link>
                    </p>
                </div>

                <div className="home-text-container">
                    <p className="home-text">:</p>
                    <p className="home-text">look at his <Link href="/gallery" className="preview_link_accent">art&design</Link> works</p>
                </div>
            </main>
        </div>
    );
}
