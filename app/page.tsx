import { FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants"
import InvoiceSearchForm from "@/components/invoice-search-form"

// 홈 페이지 (Server Component)
export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4">
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">{APP_NAME}</h1>
        <p className="mt-2 text-muted-foreground">{APP_DESCRIPTION}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>견적서 조회</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceSearchForm />
        </CardContent>
      </Card>
    </div>
  )
}
