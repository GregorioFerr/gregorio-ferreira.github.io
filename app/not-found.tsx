import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-navy">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
      >
        Back to home
      </Link>
    </div>
  );
}
