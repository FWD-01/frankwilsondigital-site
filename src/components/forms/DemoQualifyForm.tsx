"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { submitDemo, BOOKING_URL } from "@/lib/api/submitDemo"
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
}

export function DemoQualifyForm() {
  const [form, setForm] = useState<DemoFormData>(empty)
  const [status, setStatus] = useState<"idle" | "loading">("idle")

  function setField(field: keyof DemoFormData) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    await submitDemo(form)
    window.location.href = BOOKING_URL
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Full Name"
          id="fullName"
          value={form.fullName}
          onChange={setField("fullName")}
          required
        />
        <Field
          label="Business Name"
          id="businessName"
          value={form.businessName}
          onChange={setField("businessName")}
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
          placeholder="What's your main content or digital presence challenge right now?"
          className="border border-gray-line bg-cream px-4 py-3 font-sans text-body text-black placeholder:text-gray-muted/50 focus:outline-none focus:border-orange resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Email"
          id="email"
          type="email"
          value={form.email}
          onChange={setField("email")}
          required
        />
        <Field
          label="WhatsApp Number"
          id="whatsapp"
          type="tel"
          value={form.whatsapp}
          onChange={setField("whatsapp")}
          placeholder="+27 82 000 0000"
          required
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "loading"}
        className="mt-2 w-full sm:w-auto"
      >
        {status === "loading" ? "Preparing…" : "Continue to booking"}
      </Button>
    </form>
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
        className="border border-gray-line bg-cream px-4 py-3 font-sans text-body text-black placeholder:text-gray-muted/50 focus:outline-none focus:border-orange"
      />
    </div>
  )
}
