import { Resend } from "resend"
import type { DemoRequestBody } from "@/types/api"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const FROM = () => process.env.RESEND_FROM_EMAIL ?? "hello@frankwilsondigital.co.za"
const NOTIFY = () => process.env.RESEND_DEMO_NOTIFY_EMAIL ?? "frank@frankwilsondigital.co.za"

export async function sendDemoNotification(data: DemoRequestBody) {
  return getResend().emails.send({
    from: FROM(),
    to: NOTIFY(),
    subject: `New demo request — ${data.name} (${data.business})`,
    html: `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Business:</strong> ${data.business}</p>
      ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ""}
    `,
  })
}

export async function sendDemoConfirmation(data: DemoRequestBody) {
  return getResend().emails.send({
    from: FROM(),
    to: data.email,
    subject: "Your Free Content Strategy Demo — Frank Wilson Digital",
    html: `
      <p>Hi ${data.name},</p>
      <p>Thanks for requesting a free Content Strategy Demo. I'll be in touch within 24 hours to set up your session.</p>
      <p>In the meantime, feel free to reply to this email with any questions.</p>
      <p>— Frank</p>
      <p style="color:#7a7569;font-size:12px;">Frank Wilson Digital · frankwilsondigital.co.za</p>
    `,
  })
}

export function getResendClient() {
  return getResend()
}
