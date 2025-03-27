import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"
import ServerComponent from "@/components/ServerComponent"
import { Loader } from "@/components/ui/loader"

export default async function Contador() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Contador interactivo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Suspense fallback={<Loader />}>
          <ServerComponent />
            </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}