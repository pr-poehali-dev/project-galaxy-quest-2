import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type DataRow = Record<string, string | number>;

export function useExport() {
  const [exportingPdf, setExportingPdf] = useState(false);

  function exportCSV(data: DataRow[], filename: string, headers: Record<string, string>) {
    const keys = Object.keys(headers);
    const headerRow = keys.map((k) => headers[k]).join(";");
    const rows = data.map((row) => keys.map((k) => row[k] ?? "").join(";"));
    const csv = [headerRow, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function exportPDF(elementId: string, filename: string) {
    setExportingPdf(true);
    try {
      const element = document.getElementById(elementId);
      if (!element) return;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(filename);
    } finally {
      setExportingPdf(false);
    }
  }

  return { exportCSV, exportPDF, exportingPdf };
}
