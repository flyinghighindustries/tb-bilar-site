import { useState } from "react";
import { useAnalytics } from "@yext/pages-components";
import type { TBBilarEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: TBBilarEntity; locale: Locale };

const FORMCARRY_ENDPOINT = "https://formcarry.com/s/9ryZCgg6pym";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ entity, locale }: Props) {
  const s = t(locale).form;
  const heading = entity.c_formHeading ?? s.fallbackHeading;
  const intro = entity.c_formIntro ?? s.fallbackIntro;
  const interestOptions = entity.c_formInterestOptions ?? [];
  const analytics = useAnalytics();

  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");

    try {
      const res = await fetch(FORMCARRY_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
      analytics?.track?.({ eventType: "C_CONTACT_FORM_SUBMIT" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-form-bg py-16 md:py-20 px-6 md:px-8">
      <div className="mx-auto max-w-[700px]">
        <h2 className="font-sans text-[28px] leading-[1.2] font-bold text-form-heading mb-2.5">
          {heading}
        </h2>
        <p className="text-base leading-relaxed text-form-help mb-7 whitespace-pre-line">
          {intro}
        </p>

        {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-[10px] border border-form-input-border bg-white p-6 md:p-8"
          >
            <h3 className="font-sans text-xl font-bold text-form-heading mb-2">
              {s.successHeading}
            </h3>
            <p className="text-form-help leading-relaxed">{s.successBody}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] mb-[18px]">
              <Field name="first_name" type="text" required {...s.fields.firstName} />
              <Field name="last_name" type="text" required {...s.fields.lastName} />
            </div>

            <div className="mb-[18px]">
              <Field name="email" type="email" required {...s.fields.email} />
            </div>
            <div className="mb-[18px]">
              <Field name="phone" type="tel" {...s.fields.phone} />
            </div>

            {interestOptions.length > 0 && (
              <div className="mb-[18px]">
                <SelectField
                  name="interest"
                  label={s.fields.interest.label}
                  placeholder={s.fields.interest.placeholder}
                  options={interestOptions}
                />
              </div>
            )}

            <div className="mb-[18px]">
              <TextareaField name="message" required {...s.fields.message} />
            </div>

            {status === "error" && (
              <div
                role="alert"
                className="mb-4 rounded-[10px] border border-red-200 bg-red-50 p-4 text-sm text-red-900"
              >
                <strong className="font-bold">{s.errorHeading}.</strong> {s.errorBody}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-[10px] bg-accent hover:bg-accent-dark active:translate-y-px text-white text-base font-bold py-4 px-5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting"
                ? s.submitting
                : status === "error"
                ? s.errorRetry
                : s.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

type FieldProps = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

function Field({ name, type, label, placeholder, required }: FieldProps) {
  const id = `cf_${name}`;
  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-2 text-sm font-semibold text-form-label">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-[10px] border border-form-input-border bg-form-input px-4 py-3.5 text-base text-form-label placeholder:text-form-placeholder outline-none transition focus:border-accent focus:bg-white focus:ring-[3px] focus:ring-accent/10"
      />
    </div>
  );
}

function TextareaField({ name, label, placeholder, required }: Omit<FieldProps, "type">) {
  const id = `cf_${name}`;
  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-2 text-sm font-semibold text-form-label">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={6}
        className="block w-full min-h-[160px] resize-y rounded-[10px] border border-form-input-border bg-form-input px-4 py-3.5 text-base text-form-label placeholder:text-form-placeholder outline-none transition focus:border-accent focus:bg-white focus:ring-[3px] focus:ring-accent/10"
      />
    </div>
  );
}

type SelectProps = {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
};

function SelectField({ name, label, placeholder, options }: SelectProps) {
  const id = `cf_${name}`;
  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-2 text-sm font-semibold text-form-label">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className="w-full appearance-none rounded-[10px] border border-form-input-border bg-form-input px-4 py-3.5 text-base text-form-label outline-none transition focus:border-accent focus:bg-white focus:ring-[3px] focus:ring-accent/10 bg-no-repeat"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M5 8l5 5 5-5' stroke='%235B6472' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
          backgroundPosition: "right 16px center",
          paddingRight: "44px",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
