import Link from "next/link";

const navbarClick = {
    "/product": {
        name: "product",
    },
    "/contact": {
        name: "contact",
    },
};

export default function Navbar() {
    return (
        <nav className="sticky top-0 flex items-center justify-between bg-[#E2DAD6] text-gray-600 shadow-md px-32 p-5">
            <h1 className="text-2xl font-bold">Nezon Sakamuya</h1>
            <ul className="flex gap-x-5">
                {Object.entries(navbarClick).map(([path, { name }]) => {
                    return (
                        <li key={path} className="hover:text-gray-800">
                            <Link href={path}>
                                {name.charAt(0).toUpperCase() + name.slice(1)}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
