import { Resend } from "resend"
import type { DemoRequestBody } from "@/types/api"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const FROM = () => process.env.RESEND_FROM_EMAIL ?? "hello@frankwilsondigital.co.za"
const NOTIFY = () => process.env.RESEND_DEMO_NOTIFY_EMAIL ?? "admin@frankwilsondigital.co.za"

export async function sendDemoNotification(data: DemoRequestBody) {
  const row = (label: string, value?: string) =>
    value ? `<tr><td style="padding:6px 12px;color:#7a7569;font-size:12px;white-space:nowrap">${label}</td><td style="padding:6px 12px;font-size:14px;color:#0f0f0f">${value}</td></tr>` : ""

  return getResend().emails.send({
    from: FROM(),
    to: NOTIFY(),
    subject: `New demo request — ${data.name} (${data.business})`,
    html: `
      <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:560px">
        ${row("Name", data.name)}
        ${row("Email", data.email)}
        ${row("WhatsApp", data.whatsapp)}
        ${row("Business", data.business)}
        ${row("Industry", data.industry)}
        ${row("Website / IG", data.websiteOrInstagram)}
        ${row("Content managed by", data.contentManager)}
        ${row("Posts how often", data.postingFrequency)}
        ${row("Main goal", data.mainGoal)}
        ${row("Biggest challenge", data.biggestChallenge)}
      </table>
    `,
  })
}


export function getResendClient() {
  return getResend()
}
