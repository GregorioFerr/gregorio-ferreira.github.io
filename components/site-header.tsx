import Link from "next/link";
import { navigation, profile } from "@/content/profile";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <Link href="/" className="flex items-baseline gap-2 whitespace-nowrap">
          <span className="font-serif text-base font-semibold tracking-tight text-navy">
            {profile.name}
          </span>
          <span className="font-mono text-[0.65rem] text-muted">PhD</span>
        </Link>

        <nav aria-label="Main" className="-mx-2 overflow-x-auto sm:mx-0">
          <ul className="flex items-center gap-4 whitespace-nowrap px-2 font-mono text-[0.72rem] uppercase tracking-wider sm:px-0">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
