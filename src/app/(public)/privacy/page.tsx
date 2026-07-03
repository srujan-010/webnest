import { Container, Section } from "@/components/ui/Section";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-surface-0">
      <Section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <h1 className="text-4xl font-bold font-display text-ink-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-ink max-w-none text-ink-600 space-y-6">
              <p>Last updated: July 1, 2026</p>
              
              <h2 className="text-2xl font-bold text-ink-900 mt-8 mb-4">1. Introduction</h2>
              <p>Welcome to WebNest. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
              
              <h2 className="text-2xl font-bold text-ink-900 mt-8 mb-4">2. Data We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
              </ul>

              <h2 className="text-2xl font-bold text-ink-900 mt-8 mb-4">3. How We Use Your Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>

              <h2 className="text-2xl font-bold text-ink-900 mt-8 mb-4">4. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:privacy@webnest.agency" className="text-brand-600 hover:underline">privacy@webnest.agency</a>.</p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
