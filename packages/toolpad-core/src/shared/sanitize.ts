/**
 * Sanitises a raw text input value before it is passed to application logic.
 *
 * Currently strips null bytes (`\0`), which can cause unexpected behaviour in
 * downstream systems (databases, log pipelines, etc.).
 *
 * Note: `<`, `>` and other HTML-significant characters are deliberately NOT
 * stripped here because React's JSX renderer already escapes them when
 * rendering text content. Stripping them would alter legitimate user input
 * (e.g. mathematical expressions or code snippets).
 *
 * @param value - The raw string from a form field.
 * @returns The sanitised string.
 */
export function sanitizeTextInput(value: string): string {
  // Remove null bytes
  return value.replace(/\0/g, '');
}
