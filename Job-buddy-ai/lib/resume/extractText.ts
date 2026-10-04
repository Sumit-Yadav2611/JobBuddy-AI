import PDFParser from "pdf2json";
import mammoth from "mammoth";

export async function extractResumeText(
  file: File
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === "application/pdf") {
    return extractPdfText(buffer);
  }

  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer,
    });

    return result.value.trim();
  }

  throw new Error("Unsupported resume format.");
}

function extractPdfText(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (error: any) => {
      reject(
        new Error(
          error?.parserError?.toString() ||
            "Failed to parse PDF."
        )
      );
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        const pages = pdfData.Pages || [];

        const text = pages
          .map((page: any) => {
            return (page.Texts || [])
              .map((item: any) => {
                return decodeURIComponent(
                  item.R?.map((r: any) => r.T).join("") || ""
                );
              })
              .join(" ");
          })
          .join("\n");

        resolve(text.trim());
      } catch (error) {
        reject(error);
      }
    });

    pdfParser.parseBuffer(buffer);
  });
}