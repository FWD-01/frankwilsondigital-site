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

export default function LandingPage() {
  return (
    <>
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
    </>
  )
}
