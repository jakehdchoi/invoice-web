"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "홈" },
];

interface NavLinksProps {
  className?: string
  // 링크 클릭 시 호출 (모바일 메뉴 닫기 등)
  onLinkClick?: () => void
}

export function NavLinks({ className, onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-6", className)}>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onLinkClick}
          className={cn(
            "text-sm font-medium transition-colors hover:text-foreground",
            pathname === href
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
