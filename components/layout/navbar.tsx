import Link from "next/link";
import { FileText } from "lucide-react";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "./mobile-menu";

// 상단 고정 네비게이션 바 (Server Component)
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <FileText className="h-5 w-5" />
          <span>견적서 시스템</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <div className="hidden md:flex items-center gap-4">
          <NavLinks />
          <ThemeToggle />
        </div>

        {/* 모바일: 테마토글 + 햄버거 메뉴 */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
