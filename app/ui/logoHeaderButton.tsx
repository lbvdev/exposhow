import Link from "next/link";

export default function LogoHeaderButton() {
    return (
        <Link href="/" className="flex items-center gap-2 bg-red-light-color text-bg-color px-0.5 py-0.5 pr-6">
            <span className="leading-none text-xl font-normal m-0">EXPO<br/>SHOW</span>
        </Link>
    );
}
