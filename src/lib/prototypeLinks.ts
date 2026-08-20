const EMBEDDABLE =
  /(figma\.com\/proto|figma\.com\/embed|framer\.com|codesandbox\.io\/embed|codepen\.io|youtube\.com\/embed|player\.vimeo\.com)/i;

export function isPrototypeLink(url: string): boolean {
  return EMBEDDABLE.test(url);
}
