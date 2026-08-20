import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Seo } from "@/lib/seo";
import { useSite, useContent } from "@/lib/cms";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Invalid email").max(320),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

type ContactData = {
  eyebrow: string;
  heading_before: string;
  heading_accent: string;
  heading_after: string;
  copy_email_label: string;
  copied_label: string;
  form_labels: { name: string; email: string; message: string; send: string; sending: string };
  success_toast: string;
  elsewhere_label: string;
  based_in_label: string;
};

const FALLBACK: ContactData = {
  eyebrow: "Say hello",
  heading_before: "Let's make",
  heading_accent: "something",
  heading_after: ".",
  copy_email_label: "Copy email",
  copied_label: "Copied",
  form_labels: {
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    sending: "Sending",
  },
  success_toast: "Message sent — I'll reply within 2 business days.",
  elsewhere_label: "Elsewhere",
  based_in_label: "Based in",
};

export default function Contact() {
  const { data: site } = useSite();
  const { data: c } = useContent<ContactData>("contact_page", FALLBACK);
  const d = c ?? FALLBACK;
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [website, setWebsite] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const copyEmail = async () => {
    if (!site?.email) return;
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy the email address.");
    }
  };

  const submit = useMutation({
    mutationFn: async (payload: z.infer<typeof schema>) => {
      const { error } = await supabase
        .from("contact_inquiries")
        .insert({ ...payload, source: "website" });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(d.success_toast);
      setForm({ name: "", email: "", message: "" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <>
      <Seo
        title="Contact"
        description="Contact Aman Mishra about Senior Product Designer opportunities across fintech, AI, personalisation, and complex product platforms."
        path="/contact"
        siteName={site?.name ?? "Portfolio"}
      />

      <section className="container-page pb-12 pt-12 md:pb-16 md:pt-20">
        <Reveal>
          <p className="eyebrow">{d.eyebrow}</p>
          <h1
            className="display-hero mt-6 max-w-[14ch] leading-[1.02]"
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
          >
            {d.heading_before}{" "}
            <span className="font-serif font-normal italic text-[var(--color-accent)]">
              {d.heading_accent}
            </span>
            {d.heading_after}
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-[var(--color-muted-fg)] md:text-lg">
            I’m exploring Senior Product Designer opportunities across fintech, AI, personalisation,
            and complex product platforms. If you’re building something meaningful at scale, I’d
            love to hear about it.
          </p>
        </Reveal>
      </section>

      <section className="container-page grid gap-12 pb-24 md:grid-cols-12 md:gap-16 md:pb-32">
        <Reveal className="md:col-span-7">
          {site?.email && (
            <>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-flex max-w-full items-center gap-3 font-display link-underline break-all"
                style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)", lineHeight: 1.15 }}
              >
                <span className="min-w-0 break-all">{site.email}</span>
                <ArrowUpRight size={24} className="shrink-0" aria-hidden />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[8px] border border-[var(--color-hairline-strong)] px-4 py-2 text-[12px] uppercase tracking-widest text-[var(--color-muted-fg)] transition-colors hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
                aria-live="polite"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="c"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Check size={14} /> {d.copied_label}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="d"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Copy size={14} /> {d.copy_email_label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (website.trim()) {
                setForm({ name: "", email: "", message: "" });
                toast.success(d.success_toast);
                return;
              }
              const parsed = schema.safeParse(form);
              if (!parsed.success) {
                const flattened = parsed.error.flatten().fieldErrors;
                setFieldErrors({
                  name: flattened.name?.[0],
                  email: flattened.email?.[0],
                  message: flattened.message?.[0],
                });
                return;
              }
              setFieldErrors({});
              submit.mutate(parsed.data);
            }}
            className="relative mt-12 max-w-lg space-y-6"
            noValidate
          >
            <div
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
              aria-hidden="true"
            >
              <Label htmlFor="contact-website">Website</Label>
              <Input
                id="contact-website"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="eyebrow">
                {d.form_labels.name}
              </Label>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={200}
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                }}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                className="h-12 rounded-lg border-[var(--color-hairline-strong)] bg-[var(--color-surface)] px-4 text-[16px] text-[var(--color-text)] shadow-none transition-colors focus-visible:border-[var(--color-accent)] focus-visible:ring-0"
              />
              <FieldError id="contact-name-error" message={fieldErrors.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email" className="eyebrow">
                {d.form_labels.email}
              </Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={320}
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                }}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                className="h-12 rounded-lg border-[var(--color-hairline-strong)] bg-[var(--color-surface)] px-4 text-[16px] text-[var(--color-text)] shadow-none transition-colors focus-visible:border-[var(--color-accent)] focus-visible:ring-0"
              />
              <FieldError id="contact-email-error" message={fieldErrors.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message" className="eyebrow">
                {d.form_labels.message}
              </Label>
              <Textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                maxLength={5000}
                value={form.message}
                onChange={(e) => {
                  setForm({ ...form, message: e.target.value });
                  if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: undefined });
                }}
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                className="rounded-lg border-[var(--color-hairline-strong)] bg-[var(--color-surface)] px-4 py-3 text-[16px] leading-relaxed text-[var(--color-text)] shadow-none transition-colors focus-visible:border-[var(--color-accent)] focus-visible:ring-0"
              />
              <FieldError id="contact-message-error" message={fieldErrors.message} />
            </div>
            <button
              type="submit"
              disabled={submit.isPending}
              className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-[var(--color-text)] px-6 py-3 text-[13px] font-medium uppercase tracking-[0.18em] text-[var(--color-inverse)] shadow-[var(--elevation-2)] transition-all hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-contrast)] hover:shadow-[var(--elevation-3)] disabled:opacity-60"
            >
              {submit.isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" aria-hidden="true" />{" "}
                  {d.form_labels.sending}
                </>
              ) : (
                <>
                  {d.form_labels.send}{" "}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </>
              )}
            </button>
            <p className="max-w-[58ch] text-[12px] leading-[1.55] text-[var(--color-subtle)]">
              Your details are used only to reply to this enquiry and are not shared or added to a
              mailing list.
            </p>
          </form>
        </Reveal>

        <Reveal className="md:col-span-4 md:col-start-9">
          <p className="eyebrow">{d.elsewhere_label}</p>
          <ul className="mt-4 space-y-3">
            {(site?.socials ?? []).map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-lg link-underline"
                >
                  {s.label} <ArrowUpRight size={16} />
                </a>
              </li>
            ))}
          </ul>
          {site?.location && (
            <div className="mt-12 rounded-lg border border-hairline p-6">
              <p className="eyebrow">{d.based_in_label}</p>
              <p className="mt-3 text-[15px]">{site.location}</p>
            </div>
          )}
        </Reveal>
      </section>
    </>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-[13px] text-red-600">
      {message}
    </p>
  );
}
