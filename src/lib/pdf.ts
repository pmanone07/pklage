import type { jsPDF } from "jspdf";

type Photo = { name: string; dataUrl: string };

type Args = {
  to: string;
  subject: string;
  body: string;
  senderName: string;
  senderAddress: string;
  saksnummer: string;
  selskap: string;
  photos: Photo[];
};

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 20;
const CONTENT_W = PAGE_W - MARGIN * 2;

export async function buildKlagePdf(args: Args): Promise<Blob> {
  const { jsPDF: JsPDF } = await import("jspdf");
  const doc = new JsPDF({ unit: "mm", format: "a4" });

  drawHeader(doc, args);
  drawLetter(doc, args);
  await drawPhotos(doc, args.photos);

  return doc.output("blob");
}

function drawHeader(doc: jsPDF, args: Args) {
  const today = new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(args.senderName, MARGIN, MARGIN);
  doc.text(args.senderAddress, MARGIN, MARGIN + 5);
  doc.text(today, PAGE_W - MARGIN, MARGIN, { align: "right" });

  doc.setTextColor(20);
  doc.setFontSize(11);
  doc.text("Til:", MARGIN, MARGIN + 18);
  doc.text(args.selskap, MARGIN + 14, MARGIN + 18);
  doc.text(args.to, MARGIN + 14, MARGIN + 23);

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  const subjectLines = doc.splitTextToSize(args.subject, CONTENT_W);
  doc.text(subjectLines, MARGIN, MARGIN + 36);
  doc.setFont("helvetica", "normal");
}

function drawLetter(doc: jsPDF, args: Args) {
  doc.setFontSize(11);
  doc.setTextColor(20);

  const startY = MARGIN + 50;
  const lineHeight = 5.2;
  let y = startY;

  const paragraphs = args.body.split(/\n\s*\n/);

  for (const para of paragraphs) {
    const clean = para.replace(/\n/g, " ").trim();
    if (!clean) continue;
    const lines = doc.splitTextToSize(clean, CONTENT_W);
    for (const line of lines) {
      if (y > PAGE_H - MARGIN - 20) {
        doc.addPage();
        y = MARGIN;
      }
      doc.text(line, MARGIN, y);
      y += lineHeight;
    }
    y += lineHeight * 0.8;
  }

  if (args.photos.length > 0) {
    if (y > PAGE_H - MARGIN - 30) {
      doc.addPage();
      y = MARGIN;
    } else {
      y += 4;
    }
    doc.setFont("helvetica", "bold");
    doc.text("Vedlegg:", MARGIN, y);
    doc.setFont("helvetica", "normal");
    y += lineHeight;
    args.photos.forEach((p, i) => {
      doc.text(`${i + 1}. ${labelForPhoto(p.name, i)}`, MARGIN + 4, y);
      y += lineHeight;
    });
  }
}

async function drawPhotos(doc: jsPDF, photos: Photo[]) {
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const normalized = await normalizeImage(photo.dataUrl);

    doc.addPage();
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(`Vedlegg ${i + 1}`, MARGIN, MARGIN);
    doc.setFontSize(13);
    doc.setTextColor(20);
    doc.text(labelForPhoto(photo.name, i), MARGIN, MARGIN + 7);

    if (!normalized) {
      doc.setFontSize(11);
      doc.setTextColor(120);
      doc.text(
        "(Kunne ikke vise dette bildet i PDFen. Legg det ved i e-posten manuelt.)",
        MARGIN,
        MARGIN + 20,
      );
      continue;
    }

    const maxW = CONTENT_W;
    const maxH = PAGE_H - MARGIN - 30;
    const scale = Math.min(maxW / normalized.width, maxH / normalized.height);
    const drawW = normalized.width * scale;
    const drawH = normalized.height * scale;
    const x = (PAGE_W - drawW) / 2;
    const y = MARGIN + 14;

    try {
      doc.addImage(normalized.dataUrl, "JPEG", x, y, drawW, drawH);
    } catch {
      doc.setFontSize(11);
      doc.setTextColor(120);
      doc.text(
        "(Kunne ikke vise dette bildet i PDFen. Legg det ved i e-posten manuelt.)",
        MARGIN,
        MARGIN + 20,
      );
    }
  }
}

function labelForPhoto(_name: string, idx: number) {
  if (idx === 0) return "Bilde av gebyret";
  if (idx === 1) return "Bilde av skiltingen på stedet";
  return `Tilleggsbilde ${idx + 1}`;
}

const MAX_DIMENSION = 1600;

async function normalizeImage(
  dataUrl: string,
): Promise<{ dataUrl: string; width: number; height: number } | null> {
  const img = await loadImage(dataUrl).catch(() => null);
  if (!img) return null;

  const srcW = img.naturalWidth || img.width;
  const srcH = img.naturalHeight || img.height;
  if (!srcW || !srcH) return null;

  const scale = Math.min(1, MAX_DIMENSION / Math.max(srcW, srcH));
  const w = Math.max(1, Math.round(srcW * scale));
  const h = Math.max(1, Math.round(srcH * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  try {
    ctx.drawImage(img, 0, 0, w, h);
  } catch {
    return null;
  }

  try {
    const out = canvas.toDataURL("image/jpeg", 0.82);
    if (!out.startsWith("data:image/jpeg")) return null;
    return { dataUrl: out, width: w, height: h };
  } catch {
    return null;
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = src;
  });
}
