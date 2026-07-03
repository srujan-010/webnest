import { Container, Section } from "@/components/ui/Section";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-surface-0">
      <Section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <h1 className="text-4xl font-bold font-display text-ink-900 mb-8">Terms & Conditions</h1>
            <div className="prose prose-ink max-w-none text-ink-600 space-y-6">
              <p>Last updated: July 1, 2026</p>
              
              <h2 className="text-2xl font-bold text-ink-900 mt-8 mb-4">1. Agreement to Terms</h2>
              <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>
              
              <h2 className="text-2xl font-bold text-ink-900 mt-8 mb-4">2. Intellectual Property</h2>
              <p>The Service and its original content, features, and functionality are and will remain the exclusive property of WebNest and its licensors. The Service is protected by copyright, trademark, and other laws.</p>

              <h2 className="text-2xl font-bold text-ink-900 mt-8 mb-4">3. Client Responsibilities</h2>
              <p>When engaging WebNest for digital services, the client agrees to provide timely feedback, necessary assets, and clear communication to ensure project timelines are met. Delays on the client's end may result in timeline extensions.</p>

              <h2 className="text-2xl font-bold text-ink-900 mt-8 mb-4">4. Limitation of Liability</h2>
              <p>In no event shall WebNest, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
