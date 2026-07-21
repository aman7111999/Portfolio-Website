import { Link } from "react-router-dom";
import { Seo } from "@/lib/seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Not found" description="This page doesn't exist." path="/404" />
      <section className="container-page flex min-h-[70dvh] flex-col items-start justify-center pb-20 pt-8 md:pt-16">
        <p className="text-[12px] uppercase tracking-widest text-[var(--color-muted)]">404</p>
        <h1 className="display-hero mt-4 text-5xl md:text-9xl">Lost.</h1>
        <p className="mt-6 max-w-md text-[16px] leading-[1.6] text-[var(--color-muted)] md:text-lg">
          The page you're looking for either moved or never existed. Let's find our way back.
        </p>
        <Link
          to="/"
          className="btn-primary mt-10"
          style={{ minHeight: 44 }}
        >
          ← Return home
        </Link>
      </section>
    </>
  );
}
