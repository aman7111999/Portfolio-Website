import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, ImageOff, Minus, Plus, X } from "lucide-react";

export type FullscreenImage = {
  src: string;
  alt: string;
  label: string;
  meta?: string;
  caption?: string;
};

export function FullscreenImageViewer({
  image,
  onClose,
  index = 0,
  total = 1,
  onMove,
}: {
  image: FullscreenImage | null;
  onClose: () => void;
  index?: number;
  total?: number;
  onMove?: (direction: -1 | 1) => void;
}) {
  const [zoom, setZoom] = useState(false);
  const [failed, setFailed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const src = image?.src;

  useEffect(() => {
    setZoom(false);
    setFailed(false);
    contentRef.current?.scrollTo({ top: 0, left: 0 });
  }, [src]);

  return (
    <Dialog.Root
      open={!!image}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md" />
        <Dialog.Content
          ref={contentRef}
          data-lenis-prevent
          className="case-image-dialog fixed inset-0 z-[101] overflow-auto overscroll-contain text-white focus:outline-none"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            openerRef.current =
              document.activeElement instanceof HTMLElement ? document.activeElement : null;
            closeRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            openerRef.current?.focus({ preventScroll: true });
          }}
          onKeyDown={(event) => {
            if (total > 1 && onMove && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
              event.preventDefault();
              onMove(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <div className="case-image-toolbar">
            <div className="min-w-0">
              <Dialog.Title className="truncate text-[13px] font-semibold">
                {image?.label}
              </Dialog.Title>
              <Dialog.Description className="mt-0.5 truncate text-[11px] text-white/65">
                {total > 1 ? `${index + 1} of ${total} · ` : ""}
                {image?.meta ?? "Scroll to explore the complete screen"}
              </Dialog.Description>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              {total > 1 && onMove && (
                <>
                  <button
                    type="button"
                    onClick={() => onMove(-1)}
                    aria-label="Previous screen"
                    className="case-image-control"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onMove(1)}
                    aria-label="Next screen"
                    className="case-image-control"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setZoom((value) => !value)}
                aria-label={zoom ? "Fit screen to view" : "Zoom in on screen"}
                aria-pressed={zoom}
                disabled={failed}
                className="case-image-control"
              >
                {zoom ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <Dialog.Close asChild>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close full-screen image"
                  className="case-image-control"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>
          </div>
          {image && (
            <figure className={`case-image-figure ${zoom ? "case-image-figure--zoom" : ""}`}>
              {failed ? (
                <div role="status" className="grid min-h-[50vh] place-items-center text-center">
                  <div>
                    <ImageOff size={24} className="mx-auto text-white/60" />
                    <p className="mt-4 text-sm">
                      This screen could not load. Close it and try again.
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  onError={() => setFailed(true)}
                  className="block h-auto w-full rounded-xl bg-white shadow-2xl"
                />
              )}
              <figcaption className="pt-4 text-[13px] leading-6 text-white/70">
                {image.caption ?? "Scroll to explore the complete screen."}
              </figcaption>
            </figure>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
