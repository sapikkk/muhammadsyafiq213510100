/** Teks footer dengan bagian {{pill}} → highlight pill (token Kokonus). */

export function parseFooterHeadline(text: string): Array<{ type: "text" | "pill"; value: string }> {
  const parts: Array<{ type: "text" | "pill"; value: string }> = [];
  const re = /\{\{([^}]+)\}\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push({ type: "text", value: text.slice(last, m.index) });
    }
    parts.push({ type: "pill", value: m[1].trim() });
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    parts.push({ type: "text", value: text.slice(last) });
  }
  if (parts.length === 0) {
    parts.push({ type: "text", value: text });
  }
  return parts;
}

export type FooterLinkGroup = "fasilitas" | "tentang" | "sosial" | "ikon";

export function groupFooterLinks(
  links: { id: number; judul: string; meta: string | null; gambar: string; label: string | null }[],
) {
  const pick = (key: FooterLinkGroup) =>
    links.filter((l) => (l.label ?? "").toLowerCase() === key);
  return {
    fasilitas: pick("fasilitas"),
    tentang: pick("tentang"),
    sosial: pick("sosial"),
    ikon: pick("ikon"),
  };
}
