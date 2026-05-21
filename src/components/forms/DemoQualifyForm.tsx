"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { TurnstileWidget } from "@/components/ui/TurnstileWidget"
import { submitDemo } from "@/lib/api/submitDemo"
import type { DemoFormData } from "@/types/demo"

const INDUSTRIES = [
  "Retail / E-commerce",
  "Professional Services",
  "Health & Wellness",
  "Real Estate",
  "Hospitality & Tourism",
  "Food & Beverage",
  "Technology / SaaS",
  "Consulting & Coaching",
  "Beauty & Lifestyle",
  "Education",
  "Construction & Property",
  "Media & Entertainment",
  "Non-profit",
  "Other",
]

const empty: DemoFormData = {
  fullName: "",
  businessName: "",
  industry: "",
  websiteOrInstagram: "",
  biggestChallenge: "",
  email: "",
  whatsapp: "",
  contentManager: "",
  postingFrequency: "",
  mainGoal: "",
}

type FormErrors = Partial<Record<keyof DemoFormData | "consent" | "captcha", string>>

function validate(
  form: DemoFormData,
  consent: boolean,
  turnstileToken: string | null
): FormErrors {
  const errs: FormErrors = {}

  if (!form.fullName.trim() || form.fullName.trim().length < 2)
    errs.fullName = "Full name is required."
  if (!form.businessName.trim() || form.businessName.trim().length < 2)
    errs.businessName = "Business name is required."
  if (!form.industry) errs.industry = "Please select your industry."
  if (!form.contentManager) errs.contentManager = "Please select an option."
  if (!form.postingFrequency) errs.postingFrequency = "Please select an option."
  if (!form.mainGoal) errs.mainGoal = "Please select an option."

  if (!form.email.trim()) {
    errs.email = "Email is required."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = "Please enter a valid email address."
  }

  if (!form.whatsapp.trim()) {
    errs.whatsapp = "WhatsApp number is required."
  } else if (!/^\+[0-9]{7,15}$/.test(form.whatsapp.replace(/\s/g, ""))) {
    errs.whatsapp = "Enter a number with country code, e.g. +27 82 000 0000"
  }

  if (!form.biggestChallenge.trim()) {
    errs.biggestChallenge = "Please describe your biggest challenge."
  } else if (form.biggestChallenge.trim().length < 10) {
    errs.biggestChallenge = "Please give a bit more detail (at least 10 characters)."
  }

  if (!consent) errs.consent = "Please accept the Privacy Policy to continue."
  if (!turnstileToken) errs.captcha = "Please complete the security check."

  return errs
}

export function DemoQualifyForm({
  onComplete,
}: {
  onComplete?: (result: { fullName: string; email: string }) => void
}) {
  const [form, setForm] = useState<DemoFormData>(empty)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [apiError, setApiError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [consent, setConsent] = useState(false)

  function setField(field: keyof DemoFormData) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError("")

    const errs = validate(form, consent, turnstileToken)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstKey = Object.keys(errs)[0]
      document.getElementById(firstKey)?.focus()
      return
    }

    setErrors({})
    setStatus("loading")

    const result = await submitDemo(form, turnstileToken!)
    if (result.success) {
      onComplete?.({ fullName: form.fullName, email: form.email })
    } else {
      setStatus("error")
      setApiError(result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Full Name"
          id="fullName"
          value={form.fullName}
          onChange={setField("fullName")}
          error={errors.fullName}
          required
        />
        <Field
          label="Business Name"
          id="businessName"
          value={form.businessName}
          onChange={setField("businessName")}
          error={errors.businessName}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="industry"
          className="font-mono text-mono-label uppercase tracking-widest text-gray-muted"
        >
          Industry
        </label>
        <div className="relative">
          <select
            id="industry"
            value={form.industry}
            onChange={setField("industry")}
            required
            aria-invalid={!!errors.industry}
            className="w-full border border-gray-line bg-cream px-4 py-3 font-sans text-body text-black focus:outline-none focus:border-orange appearance-none pr-10"
          >
            <option value="" disabled>
              Select your industry
            </option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <span
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-mono-label text-gray-muted"
            aria-hidden
          >
            ▾
          </span>
        </div>
        {errors.industry && (
          <p role="alert" className="font-mono text-mono-label text-orange mt-1">
            {errors.industry}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <SelectField
          label="Who manages your content now?"
          id="contentManager"
          value={form.contentManager}
          onChange={setField("contentManager")}
          required
          options={["Nobody", "Me", "An employee", "An agency"]}
          error={errors.contentManager}
        />
        <SelectField
          label="How often do you post?"
          id="postingFrequency"
          value={form.postingFrequency}
          onChange={setField("postingFrequency")}
          required
          options={["Never", "Occasionally", "1–2× per week", "Daily"]}
          error={errors.postingFrequency}
        />
        <SelectField
          label="Main goal for social media?"
          id="mainGoal"
          value={form.mainGoal}
          onChange={setField("mainGoal")}
          required
          options={["Get more leads", "Build trust", "Stay top of mind", "All of the above"]}
          error={errors.mainGoal}
        />
      </div>

      <Field
        label="Website or Instagram"
        id="websiteOrInstagram"
        value={form.websiteOrInstagram}
        onChange={setField("websiteOrInstagram")}
        placeholder="yoursite.com or @yourhandle"
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="biggestChallenge"
          className="font-mono text-mono-label uppercase tracking-widest text-gray-muted"
        >
          Biggest Challenge
        </label>
        <textarea
          id="biggestChallenge"
          value={form.biggestChallenge}
          onChange={setField("biggestChallenge")}
          required
          rows={3}
          aria-invalid={!!errors.biggestChallenge}
          placeholder="What's your main content or digital presence challenge right now?"
          className="border border-gray-line bg-cream px-4 py-3 font-sans text-body text-black placeholder:text-gray-muted/50 focus:outline-none focus:border-orange resize-none"
        />
        {errors.biggestChallenge && (
          <p role="alert" className="font-mono text-mono-label text-orange mt-1">
            {errors.biggestChallenge}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Email"
          id="email"
          type="email"
          value={form.email}
          onChange={setField("email")}
          error={errors.email}
          required
        />
        <Field
          label="WhatsApp Number"
          id="whatsapp"
          type="tel"
          value={form.whatsapp}
          onChange={setField("whatsapp")}
          placeholder="+27 82 000 0000"
          error={errors.whatsapp}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <TurnstileWidget
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onTokenChange={(token) => {
            setTurnstileToken(token)
            if (token) setErrors((prev) => ({ ...prev, captcha: undefined }))
          }}
        />
        {errors.captcha && (
          <p role="alert" className="font-mono text-mono-label text-orange">
            {errors.captcha}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked)
              if (e.target.checked)
                setErrors((prev) => ({ ...prev, consent: undefined }))
            }}
            className="mt-1 w-4 h-4 border border-gray-line bg-cream accent-orange cursor-pointer shrink-0"
            aria-invalid={!!errors.consent}
          />
          <span className="font-sans text-small text-gray-muted leading-relaxed">
            I agree to the{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange underline"
            >
              Privacy Policy
            </a>{" "}
            and consent to my data being processed.
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="font-mono text-mono-label text-orange">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && apiError && (
        <p role="alert" className="font-mono text-mono-label text-orange">
          {apiError}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "loading"}
        className="mt-2 w-full sm:w-auto"
      >
        {status === "loading" ? "Checking…" : "Submit details"}
      </Button>
    </form>
  )
}

function SelectField({
  label,
  id,
  value,
  onChange,
  required,
  options,
  error,
}: {
  label: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  options: string[]
  error?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-mono-label uppercase tracking-widest text-gray-muted"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={!!error}
          className="w-full border border-gray-line bg-cream px-4 py-3 font-sans text-body text-black focus:outline-none focus:border-orange appearance-none pr-10"
        >
          <option value="" disabled>Select</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-mono-label text-gray-muted"
          aria-hidden
        >
          ▾
        </span>
      </div>
      {error && (
        <p role="alert" className="font-mono text-mono-label text-orange mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  error,
}: {
  label: string
  id: string
  type?: string
  value: string
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void
  required?: boolean
  placeholder?: string
  error?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-mono-label uppercase tracking-widest text-gray-muted"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        className="border border-gray-line bg-cream px-4 py-3 font-sans text-body text-black placeholder:text-gray-muted/50 focus:outline-none focus:border-orange"
      />
      {error && (
        <p role="alert" className="font-mono text-mono-label text-orange mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
