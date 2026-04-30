import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import {
  Hero,
  ProofStrip,
  About,
  Packages,
  DemoCTA,
  WhyMe,
  WhySystem,
  UseCases,
  HowWeWork,
  FinalCTA,
} from "@/components/sections"
import { DemoModalProvider } from "@/context/DemoModalContext"
import { DemoModal } from "@/components/modals/DemoModal"

export default function LandingPage() {
  return (
    <DemoModalProvider>
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <About />
        <Packages />
        <DemoCTA />
        <WhyMe />
        <WhySystem />
        <UseCases />
        <HowWeWork />
        <FinalCTA />
      </main>
      <Footer />
      <DemoModal />
    </DemoModalProvider>
  )
}
