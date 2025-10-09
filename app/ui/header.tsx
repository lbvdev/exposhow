import Link from "next/link";
import Image from "next/image";
import LogoHeaderButton from "./logoHeaderButton";

export default function Header() {
    return (
        <header className="flex justify-between items-start py-9 px-12 fixed top-0 left-0 right-0 z-10">
            <LogoHeaderButton />
            <nav className="flex flex-col">
                <Link href="#">главная </Link>
                <Link href="#story-page">история</Link>
                <Link href="#">проекты</Link>
                <Link href="#">сервисы</Link>
            </nav>
            <button className="bg-red-light-color text-white px-4 py-2">
                Написать
            </button>
        </header>
    );
}