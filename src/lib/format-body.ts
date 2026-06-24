/** Escape HTML, then turn `==like this==` into <mark> highlights. */
export function formatSectionBody(body: string): string {
  const escaped = body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped.replace(/==([\s\S]+?)==/g, '<mark>$1</mark>');
}
