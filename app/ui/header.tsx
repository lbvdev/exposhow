import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="flex justify-between items-start py-9 px-12 right-0 z-10 scrolled">
            <LogoHeaderButton />
            <nav id="header-start-links" className="flex flex-col">
                <Link href="#" className="hover-square">главная </Link>
                <Link href="#story-page" className="hover-square">история</Link>
                <Link href="#" className="hover-square">проекты</Link>
                <Link href="#" className="hover-square">сервисы</Link>
            </nav>
            <button className="bg-red-light-color text-white px-4 py-2">
                Написать
            </button>
        </header>
    );
}

export function LogoHeaderButton() {
    return (
        <div className="flex logo-button" style={{opacity: 0}}>
            <Link href="/" className="flex items-center gap-2 bg-red-light-color text-bg-color px-[3px] py-[3px] pr-[26px] not-default">
                <span className="leading-none text-xl font-normal m-0 cursor-pointer">EXPO<br/>SHOW</span>
            </Link>
            <nav className="nav-absloute flex gap-[1px] left-0 top-0">
                <Link href="#" className="bg-fill"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 12 17" fill="none"><path d="M6 16.8535V1.14844M6 1.14844L1 6.14844M6 1.14844L11 6.14844" stroke="#A92C2D"/></svg></Link>
                <Link href="#">главная </Link>
                <Link href="#story-page">история</Link>
                <Link href="#">проекты</Link>
                <Link href="#">сервисы</Link>
            </nav>
        </div>
    );
}