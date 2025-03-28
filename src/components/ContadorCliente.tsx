"use client"

import { useState } from "react"
import { Minus, Plus, RotateCcw, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { exportarAPDF } from "./ExportPDF"
import { useOptimistic, startTransition } from "react"
import { incrementar, decrementar, resetear, borrarHistorial } from "@/app/api/actions"

interface ContadorClienteProps {
    contadorInicial: number
    historial: { accion: string; timestamp: string }[]
}

export function ContadorCliente({ contadorInicial, historial}: ContadorClienteProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    const [optimisticContador, setOptimisticContador] = useOptimistic(contadorInicial)

    const handleAction = async (action: () => Promise<number>) => {

        startTransition(() => {
            switch (action) {
                case incrementar:
                    setOptimisticContador((contadorInicial) => contadorInicial + 1)
                    break
                case decrementar:
                    setOptimisticContador((contadorInicial) => contadorInicial - 1)
                    break
                case resetear:
                    setOptimisticContador(0)
                    break
            }
        })

        try {
            setIsLoading(true)
            await action()
        } catch (error) {
            console.error("Error en la acción:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleExportarPDF = async () => {
        setIsExporting(true)
        try {
            await exportarAPDF(historial, contadorInicial)
        } catch (error) {
            console.error("Error al exportar PDF:", error)
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 shadow-inner">
                    <span className="text-5xl font-bold text-primary">{optimisticContador}</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleAction(decrementar)}
                    disabled={isLoading}
                    className="flex h-16 items-center justify-center text-lg transition-all hover:scale-105 hover:bg-destructive hover:text-destructive-foreground"
                >
                    <Minus className="mr-2 h-5 w-5" />
                    Disminuir
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleAction(resetear)}
                    disabled={isLoading}
                    className="flex h-16 items-center justify-center text-lg transition-all hover:scale-105"
                >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Resetear
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleAction(incrementar)}
                    disabled={isLoading}
                    className="flex h-16 items-center justify-center text-lg transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Aumentar
                </Button>
            </div>
            <div className="mt-8 space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Historial</h3>
                    <div className="flex gap-2">
                        {historial.length > 0 && (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleExportarPDF}
                                    disabled={isExporting || historial.length === 0}
                                    className="text-xs"
                                >
                                    <FileDown className="mr-1 h-3 w-3" />
                                    {isExporting ? "Exportando..." : "Exportar PDF"}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={borrarHistorial}
                                    className="text-xs"
                                >
                                    Vaciar Historial
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="max-h-48 overflow-y-auto rounded-md border bg-card p-2">
                    {historial.length === 0 ? (
                        <p className="py-4 text-center text-sm text-muted-foreground">
                            Sin acciones por ahora
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {historial.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-sm"
                                >
                                    <span>
                                        <span className="font-medium">{item.accion}</span>
                                    </span>
                                    <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}
