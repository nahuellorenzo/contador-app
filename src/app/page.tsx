"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, RotateCcw, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getContador, incrementar, decrementar, resetear, getHistorial, borrarHistorial } from "./api/actions"

type JsPDFType = typeof import("jspdf").default

export default function Contador() {
  const [contador, setContador] = useState<number | null>(null)
  const [historial, setHistorial] = useState<{ accion: string; timestamp: string }[]>([])
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    getContador().then(setContador)
    getHistorial().then(setHistorial ?? [])
  }, [])

  const handleIncrementar = async () => {
    try {
      const valor = await incrementar()
      setContador(valor)
      await actualizarHistorial()
    } catch (error) {
      console.error("Error al incrementar:", error)
    }
  }

  const handleDecrementar = async () => {
    try {
      const valor = await decrementar()
      setContador(valor)
      await actualizarHistorial()
    } catch (error) {
      console.error("Error al decrementar:", error)
    }
  }

  const handleResetear = async () => {
    try {
      const valor = await resetear()
      setContador(valor)
      await actualizarHistorial()
    } catch (error) {
      console.error("Error al resetear:", error)
    }
  }

  const actualizarHistorial = async () => {
    const nuevoHistorial = await getHistorial()
    setHistorial(nuevoHistorial ?? [])
  }

  const limpiarHistorial = async () => {
    try{
      setHistorial([])
      await borrarHistorial()
    }
    catch (error) {
      console.error("Error al limpiar historial:", error)
    }
  }

  const exportarAPDF = async () => {

    setIsExporting(true)

    try {
      const jsPDFModule = await import("jspdf")
      const jsPDF = jsPDFModule.default as unknown as JsPDFType

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pageHeight = 297
      const marginBottom = 20
      const lineHeight = 10
      let yPosition = 70

      doc.setFontSize(20)
      doc.text("Contador Historial Reporte", 105, 20, { align: "center" })

      const fecha = new Date()
      doc.setFontSize(10)
      doc.text(`Generado el: ${fecha.toLocaleDateString()} a las ${fecha.toLocaleTimeString()}`, 105, 30, { align: "center" })

      doc.setFontSize(16)
      doc.text(`Valor Actual: ${contador}`, 20, 45)

      doc.setFontSize(12)
      doc.text("Accion", 20, 60)
      doc.text("Tiempo", 140, 60)

      doc.setLineWidth(0.5)
      doc.line(20, 63, 190, 63)

      const historialReversa = [...historial].reverse()

      historialReversa.forEach((item, index) => {

        if (yPosition + lineHeight > pageHeight - marginBottom) {
          doc.addPage()
          yPosition = 20
        }

        doc.text(`${item.accion}`, 20, yPosition)
        doc.text(`${item.timestamp}`, 140, yPosition)
        yPosition += 10

        if (index < historialReversa.length - 1) {
          doc.setLineWidth(0.1)
          doc.line(20, yPosition - 5, 190, yPosition - 5)
        }
      })

      doc.save("contador-historial.pdf")

    } catch (error) {
      console.error("Error generando PDF:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Contador interactivo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center justify-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 shadow-inner">
              <span className="text-5xl font-bold text-primary">{contador}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleDecrementar}
              className="flex h-16 items-center justify-center text-lg transition-all hover:scale-105 hover:bg-destructive hover:text-destructive-foreground"
            >
              <Minus className="mr-2 h-5 w-5" />
              Disminuir
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleResetear}
              className="flex h-16 items-center justify-center text-lg transition-all hover:scale-105"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Resetear
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleIncrementar}
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
                      onClick={exportarAPDF}
                      disabled={isExporting || historial.length === 0}
                      className="text-xs"
                    >
                      <FileDown className="mr-1 h-3 w-3" />
                      {isExporting ? "Exportando..." : "Exportar PDF"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={limpiarHistorial} className="text-xs">
                      Vaciar Historial
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="max-h-48 overflow-y-auto rounded-md border bg-card p-2">
              {historial.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">Sin acciones por ahora</p>
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
        </CardContent>
      </Card>
    </div>
  )
}