import { ContadorCliente } from '@/components/ContadorCliente'
import { getContador, incrementar, decrementar, resetear, getHistorial, borrarHistorial } from "@/app/api/actions"

export default async function ServerComponent() {
  const contadorInicial = await getContador()
  const historial = await getHistorial() 


  return (
            <ContadorCliente 
              contadorInicial={contadorInicial}
              historial={historial}
              incrementar={incrementar}
              decrementar={decrementar}
              resetear={resetear}
              borrarHistorial={borrarHistorial}
            />
  )
}