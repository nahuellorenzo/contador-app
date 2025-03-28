import { ContadorCliente } from '@/components/ContadorCliente'
import { getContador, getHistorial } from "@/app/api/actions"

export default async function ServerComponent() {
  const [contadorInicial, historial] = await Promise.all([
    getContador(),
    getHistorial()
])


  return (
            <ContadorCliente 
              contadorInicial={contadorInicial}
              historial={historial}
            />
  )
}