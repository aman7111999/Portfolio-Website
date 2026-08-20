type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export const DEFAULT_PORTRAIT = "/aman-mishra-portfolio-portrait.webp";

export function ResponsivePortrait({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 410px, (min-width: 640px) 55vw, 92vw",
  loading = "lazy",
  fetchPriority = "auto",
}: Props) {
  const resolved = src || DEFAULT_PORTRAIT;
  const usesLocalPortrait =
    !src || src === DEFAULT_PORTRAIT || src.endsWith("/aman-mishra-portfolio-portrait.webp");

  return (
    <picture className="contents">
      {usesLocalPortrait && (
        <source
          type="image/webp"
          srcSet="/aman-mishra-portrait-400.webp 400w, /aman-mishra-portrait-640.webp 640w, /aman-mishra-portrait-900.webp 900w"
          sizes={sizes}
        />
      )}
      <img
        src={resolved}
        alt={alt}
        className={className}
        width={1122}
        height={1402}
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
}
