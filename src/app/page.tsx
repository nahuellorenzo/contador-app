import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContadorCliente } from '@/components/ContadorCliente'
import { getContador, incrementar, decrementar, resetear, getHistorial, borrarHistorial } from "./api/actions"

export default async function Contador() {
  const contadorInicial = await getContador()
  const historial = await getHistorial() 

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Contador interactivo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
            <ContadorCliente 
              contadorInicial={contadorInicial}
              historial={historial}
              incrementar={incrementar}
              decrementar={decrementar}
              resetear={resetear}
              borrarHistorial={borrarHistorial}
            />
        </CardContent>
      </Card>
    </div>
  )
}