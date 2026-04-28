"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

interface FormState {
  name: string
  email: string
  business: string
  message: string
}

const empty: FormState = { name: "", email: "", business: "", message: "" }

export function DemoForm({ className }: { className?: string }) {
  const [form, setForm] = useState<FormState>(empty)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = (await res.json()) as { success: boolean; error?: string }
      if (data.success) {
        setStatus("success")
        setForm(empty)
      } else {
        setStatus("error")
        setErrorMsg(data.error ?? "Something went wrong.")
      }
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div className={cn("py-8 text-center", className)}>
        <div className="w-2 h-2 bg-orange mx-auto mb-6" aria-hidden />
        <h3 className="font-display text-heading font-bold text-black mb-3">
          You&apos;re booked in.
        </h3>
        <p className="font-sans text-body text-gray-muted">
          I&apos;ll be in touch within 24 hours to set up your free Content Strategy Demo.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-5", className)} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Your name"
          id="name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Field
          label="Email address"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <Field
        label="Business or practice name"
        id="business"
        name="business"
        autoComplete="organization"
        value={form.business}
        onChange={handleChange}
        required
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="font-mono text-mono-label uppercase tracking-widest text-gray-muted"
        >
          Anything you&apos;d like me to know?{" "}
          <span className="normal-case tracking-normal opacity-60">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Your goals, current challenges, content types you want to focus on..."
          className="border border-gray-line bg-cream px-4 py-3 font-sans text-body text-black placeholder:text-gray-muted/50 focus:outline-none focus:border-black resize-none"
        />
      </div>

      {status === "error" && (
        <p className="font-mono text-mono-label text-orange" role="alert">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "loading"}
        className="self-start"
      >
        {status === "loading" ? "Sending…" : "Claim your free demo"}
      </Button>
    </form>
  )
}

function Field({
  label,
  id,
  name,
  type = "text",
  autoComplete,
  value,
  onChange,
  required,
}: {
  label: string
  id: string
  name: string
  type?: string
  autoComplete?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
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
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className="border border-gray-line bg-cream px-4 py-3 font-sans text-body text-black focus:outline-none focus:border-black"
      />
    </div>
  )
}
