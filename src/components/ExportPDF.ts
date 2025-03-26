import { jsPDF } from "jspdf"

export async function exportarAPDF(
  historial: { accion: string; timestamp: string }[], 
  contadorActual: number
) {
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
  doc.text(`Valor Actual: ${contadorActual}`, 20, 45)

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

    doc.text(item.accion, 20, yPosition)
    doc.text(item.timestamp, 140, yPosition)
    yPosition += 10

    if (index < historialReversa.length - 1) {
      doc.setLineWidth(0.1)
      doc.line(20, yPosition - 5, 190, yPosition - 5)
    }
  })

  doc.save("contador-historial.pdf")
}