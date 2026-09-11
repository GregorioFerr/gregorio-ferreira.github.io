import { links, profile } from "@/content/profile";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-surface-2">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-base font-semibold text-navy">
            {profile.fullName}
          </p>
          <p className="mt-1 text-sm text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.72rem] uppercase tracking-wider">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-4xl px-6 py-4 text-xs text-muted">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
      </div>
    </footer>
  );
}
