import Link from "next/link";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

// 상단 고정 네비게이션 바 (Server Component)
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">🚀</span>
          <span>Next.js Starter</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <div className="hidden md:flex items-center gap-4">
          <NavLinks />
          <ThemeToggle />
        </div>

        {/* 모바일: 테마토글 + 햄버거 아이콘 */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="p-2 rounded-md hover:bg-accent"
            aria-label="메뉴 열기"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
