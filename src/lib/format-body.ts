function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applyHighlights(text: string): string {
  return text.replace(/==([\s\S]+?)==/g, '<mark>$1</mark>');
}

/** Escape HTML, turn `==like this==` into <mark>, and split blank lines into paragraphs. */
export function formatSectionBody(body: string): string {
  const paragraphs = body
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);

  return paragraphs
    .map((paragraph) => `<p>${applyHighlights(escapeHtml(paragraph))}</p>`)
    .join('');
}
