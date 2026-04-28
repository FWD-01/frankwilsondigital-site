import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-cream px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-mono-label text-orange tracking-widest mb-4">404</p>
        <h1 className="font-display text-display-lg font-bold text-black mb-4">
          Page not found.
        </h1>
        <p className="text-body text-gray-muted mb-8">
          This page doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <Button variant="primary" size="md" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  )
}
