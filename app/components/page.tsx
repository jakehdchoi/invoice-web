import { redirect } from "next/navigation"

// 사용하지 않는 페이지 - 홈으로 리다이렉트
export default function ComponentsPage() {
  redirect("/")
}
