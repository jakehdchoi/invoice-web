// 페이지 하단 푸터 (Server Component)
export function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2026 Next.js Starter Kit. MIT License.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Next.js
          </a>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            shadcn/ui
          </a>
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Tailwind CSS
          </a>
        </div>
      </div>
    </footer>
  );
}
