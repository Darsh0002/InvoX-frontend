import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export const generatePdfFromElement = async (
  element,
  fileName = "invoice.pdf",
  returnBlob = false
) => {
  if (!element) return;

  // 1. A4 Dimensions at 96 DPI
  const targetWidth = 794;
  const targetHeight = 1123;

  // 2. Create a "Hidden Mirror" to ensure full-size capture
  const clone = element.cloneNode(true);
  const container = document.createElement("div");

  // Hide container off-screen
  Object.assign(container.style, {
    position: "absolute",
    left: "-9999px",
    top: "0",
    width: `${targetWidth}px`,
    backgroundColor: "white",
  });

  // Force clone to A4 size
  clone.style.width = `${targetWidth}px`;
  clone.style.height = "auto";

  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    // 3. Wait for assets
    await document.fonts.ready;
    await new Promise((resolve) => setTimeout(resolve, 300)); // Buffer for layout

    // 4. Capture using html-to-image (better support for modern CSS)
    const imageData = await toPng(clone, {
      cacheBust: true,
      pixelRatio: 1.5,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      width: targetWidth,
      height: clone.scrollHeight,
      skipFonts: false,
    });

    // 5. Cleanup
    document.body.removeChild(container);

    // 6. PDF Generation
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (clone.scrollHeight * pdfWidth) / targetWidth;

    pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);

    if (returnBlob) return pdf.output("blob");
    pdf.save(fileName);
  } catch (error) {
    if (document.body.contains(container)) document.body.removeChild(container);
    throw error;
  } finally {
    // 5. Always cleanup to prevent memory leaks
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
};
