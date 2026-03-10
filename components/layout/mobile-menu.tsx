"use client"

import { useState } from "react"
import { NavLinks } from "./nav-links"

// 모바일 햄버거 메뉴 — 상태 관리 및 드롭다운 UI (Client Component)
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* 햄버거 / X 아이콘 버튼 */}
      <button
        className="p-2 rounded-md hover:bg-accent"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          // X 아이콘
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // 햄버거 아이콘
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* 드롭다운 네비게이션 */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-md border bg-background shadow-lg">
          <NavLinks
            className="flex-col items-start gap-1 p-2 [&_a]:w-full [&_a]:px-3 [&_a]:py-2 [&_a]:rounded-sm [&_a]:hover:bg-accent"
            onLinkClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  )
}
