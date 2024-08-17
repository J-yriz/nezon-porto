import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center justify-center mt-32">
            <div className="flex">
                <Image src="/nezonProf.png" alt="hero" width={400} height={400} />
                <div className="flex items-center">
                    <h1 className="text-5xl text-center">Welcome to Nezon Sakamuya</h1>
                </div>
            </div>
        </header>
    );
}
