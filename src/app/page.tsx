import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <main className="max-w-xs md:max-w-4xl flex flex-col items-start">

                <div className="flex gap-2 items-center">
                    <Image
                        className="dark:invert mt-2"
                        src="/homeicon.svg"
                        alt="Zian Logo"
                        width={40}
                        height={40}
                    />
                    <p className="home-text">:</p>
                    <p className="home-text">this is zian huang&apos;s personal website</p>
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
