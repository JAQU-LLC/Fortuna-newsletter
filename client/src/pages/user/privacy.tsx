import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-24 pb-16 flex-1">
        <article className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-sm text-muted-foreground/70 mb-8">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                1. Introduction and Data Controller
              </h2>
              <p>
                Fortuna.ai (&quot;we,&quot; &quot;our,&quot; &quot;us,&quot; or &quot;Company&quot;) is committed to
                protecting your privacy and personal information. This Privacy
                Policy explains how we collect, use, disclose, process, store,
                and safeguard your information when you visit our website, use
                our mobile application, subscribe to our newsletter platform, or
                interact with our services (collectively, the &quot;Service&quot;).
              </p>
              <p className="mt-4">
                <strong>Data Controller:</strong> Fortuna.ai is the data
                controller responsible for your personal information. For
                questions about this Privacy Policy or our data practices,
                contact us at privacy@fortuna.ai.
              </p>
              <p className="mt-4">
                By using the Service, you acknowledge that you have read and
                understood this Privacy Policy and agree to the collection, use,
                and disclosure of your information as described herein. If you
                do not agree with our policies and practices, do not use the
                Service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                2. Information We Collect
              </h2>
              <p>
                We collect information that you provide directly to us,
                information automatically collected when you use the Service,
                and information from third-party sources, as described below.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                2.1 Information You Provide Directly
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  username, password (hashed), and account preferences
                </li>
                <li>
                  <strong>Subscription Information:</strong> Subscription plan
                  details, billing address, payment method information
                  (processed by third-party payment processors), transaction
                  history
                </li>
                <li>
                  <strong>Communication Information:</strong> Information you
                  provide when contacting us for support, feedback, or
                  inquiries, including email communications, chat transcripts,
                  and support tickets
                </li>
                <li>
                  <strong>Profile Information:</strong> Any additional
                  information you choose to provide in your user profile
                </li>
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                2.2 Information Automatically Collected
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Device Information:</strong> Device type, operating
                  system, browser type and version, device identifiers, IP
                  address, mobile network information
                </li>
                <li>
                  <strong>Usage Information:</strong> Pages visited, features
                  used, time spent on pages, clickstream data, search queries,
                  access times and dates
                </li>
                <li>
                  <strong>Location Information:</strong> General geographic
                  location based on IP address (we do not collect precise GPS
                  location without your consent)
                </li>
                <li>
                  <strong>Log Information:</strong> Server logs, error logs,
                  diagnostic data, performance metrics
                </li>
                <li>
                  <strong>Cookies and Tracking Technologies:</strong> See
                  Section 8 for detailed information about cookies and similar
                  technologies
                </li>
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                2.3 Information from Third-Party Sources
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Payment processors (e.g., Stripe) for transaction and payment
                  verification
                </li>
                <li>
                  Authentication providers if you sign in using third-party
                  services
                </li>
                <li>Analytics providers and advertising networks</li>
                <li>
                  Social media platforms if you connect your social media
                  accounts
                </li>
                <li>
                  Public databases and data brokers for fraud prevention and
                  verification
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                3. How We Use Your Information
              </h2>
              <p>
                We use the information we collect for the following purposes:
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                3.1 Service Provision
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create and manage your account</li>
                <li>Process and fulfill your subscriptions</li>
                <li>
                  Deliver newsletter content, alerts, and updates to your email
                  address
                </li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>
                  Send administrative messages (e.g., account updates, security
                  alerts, policy changes)
                </li>
                <li>Enable features and functionality of the Service</li>
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                3.2 Business Operations
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process payments and prevent fraud</li>
                <li>Improve, develop, and personalize the Service</li>
                <li>Conduct research and analytics</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>
                  Detect, prevent, and address technical issues and security
                  threats
                </li>
                <li>Ensure platform security and integrity</li>
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                3.3 Communication and Marketing
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Send marketing communications (with your consent where
                  required by law)
                </li>
                <li>Promote new features, products, or services</li>
                <li>Provide personalized recommendations and content</li>
                <li>Conduct surveys and gather feedback</li>
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                3.4 Legal and Compliance
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Comply with applicable laws, regulations, and legal processes
                </li>
                <li>Respond to government requests and court orders</li>
                <li>Enforce our Terms of Use and other agreements</li>
                <li>
                  Protect our rights, property, and safety, and that of our
                  users and others
                </li>
                <li>Investigate potential violations of our policies</li>
              </ul>

              <p className="mt-4">
                <strong>Legal Basis for Processing (GDPR):</strong> We process
                your personal information based on: (a) your consent, (b)
                performance of a contract, (c) compliance with legal
                obligations, (d) protection of vital interests, (e) our
                legitimate business interests (balanced against your rights and
                interests), and (f) other lawful bases as permitted by
                applicable law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                4. How We Share and Disclose Your Information
              </h2>
              <p>
                We do not sell your personal information. We may share your
                information in the following circumstances:
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                4.1 Service Providers and Business Partners
              </h3>
              <p>
                We share information with third-party service providers who
                perform services on our behalf, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Payment processors (e.g., Stripe) for payment processing
                </li>
                <li>Email service providers for newsletter delivery</li>
                <li>Cloud hosting and infrastructure providers</li>
                <li>Analytics and data analytics providers</li>
                <li>Customer support and helpdesk services</li>
                <li>
                  Marketing and advertising platforms (with your consent where
                  required)
                </li>
                <li>Fraud prevention and security services</li>
              </ul>
              <p className="mt-4">
                These service providers are contractually obligated to protect
                your information and use it only for the purposes we specify.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                4.2 Business Transfers
              </h3>
              <p>
                In the event of a merger, acquisition, reorganization,
                bankruptcy, or sale of assets, your information may be
                transferred to the acquiring entity or successor-in-interest,
                subject to the same privacy protections.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                4.3 Legal Requirements
              </h3>
              <p>
                We may disclose your information if required by law, regulation,
                legal process, or government request, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Court orders, subpoenas, or warrants</li>
                <li>Regulatory investigations and compliance requirements</li>
                <li>Protection of rights, property, or safety</li>
                <li>Prevention of illegal activities, fraud, or harm</li>
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                4.4 With Your Consent
              </h3>
              <p>
                We may share your information with third parties when you
                explicitly consent to such sharing.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                4.5 Aggregated and De-Identified Information
              </h3>
              <p>
                We may share aggregated, anonymized, or de-identified
                information that cannot reasonably be used to identify you for
                research, analytics, business, or other purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                5. Data Security and Retention
              </h2>
              <h3 className="font-semibold text-lg mt-6 mb-3">
                5.1 Security Measures
              </h3>
              <p>
                We implement technical, administrative, and physical security
                measures designed to protect your personal information against
                unauthorized access, alteration, disclosure, destruction, or
                loss, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit (TLS/SSL) and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security assessments and vulnerability testing</li>
                <li>Employee training on data security and privacy</li>
                <li>Incident response and breach notification procedures</li>
                <li>Regular backups and disaster recovery plans</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet or
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your information, we
                cannot guarantee absolute security. You use the Service at your
                own risk.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                5.2 Data Retention
              </h3>
              <p>
                We retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this Privacy
                Policy, unless a longer retention period is required or
                permitted by law. Factors we consider in determining retention
                periods include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The nature and sensitivity of the information</li>
                <li>The purposes for which we collected it</li>
                <li>Legal, regulatory, and contractual requirements</li>
                <li>
                  The potential risk of harm from unauthorized use or disclosure
                </li>
              </ul>
              <p className="mt-4">
                <strong>Typical Retention Periods:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Account information: Until account deletion or 7 years after
                  last activity (whichever is earlier)
                </li>
                <li>
                  Payment and transaction records: 7 years (for tax and
                  accounting purposes)
                </li>
                <li>Email communications: 3 years</li>
                <li>Log data: 90 days to 1 year</li>
                <li>Marketing consents: Until withdrawn</li>
              </ul>
              <p className="mt-4">
                When we no longer need your information, we will securely delete
                or anonymize it in accordance with our data retention policies
                and applicable law.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                5.3 Data Breach Notification
              </h3>
              <p>
                In the event of a data breach that poses a risk to your rights
                and freedoms, we will notify you and relevant supervisory
                authorities as required by applicable law, typically within 72
                hours of becoming aware of the breach (GDPR requirement) or as
                otherwise required by applicable state and federal laws (e.g.,
                CCPA, state breach notification laws).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                6. Your Privacy Rights and Choices
              </h2>
              <p>
                Depending on your location and applicable law, you may have
                certain rights regarding your personal information. We will
                respond to your requests in accordance with applicable law.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                6.1 General Rights
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Access:</strong> Request access to your personal
                  information and receive a copy
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  or incomplete information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information (subject to legal retention requirements)
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data in
                  a structured, machine-readable format
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing based on
                  legitimate interests
                </li>
                <li>
                  <strong>Restriction:</strong> Request restriction of
                  processing in certain circumstances
                </li>
                <li>
                  <strong>Withdraw Consent:</strong> Withdraw consent where
                  processing is based on consent
                </li>
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                6.2 California Privacy Rights (CCPA/CPRA)
              </h3>
              <p>
                If you are a California resident, you have the following
                additional rights:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Right to Know:</strong> Request information about
                  categories and specific pieces of personal information
                  collected, used, disclosed, or sold
                </li>
                <li>
                  <strong>Right to Delete:</strong> Request deletion of personal
                  information (subject to exceptions)
                </li>
                <li>
                  <strong>Right to Opt-Out:</strong> Opt-out of the sale or
                  sharing of personal information (we do not currently sell
                  personal information)
                </li>
                <li>
                  <strong>Right to Non-Discrimination:</strong> Exercise your
                  rights without discrimination
                </li>
                <li>
                  <strong>Right to Correct:</strong> Request correction of
                  inaccurate personal information
                </li>
                <li>
                  <strong>Right to Limit:</strong> Request limitation of use and
                  disclosure of sensitive personal information
                </li>
              </ul>
              <p className="mt-4">
                To exercise your California privacy rights, contact us at
                privacy@fortuna.ai or use our online request form [if
                applicable].
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                6.3 European Privacy Rights (GDPR)
              </h3>
              <p>
                If you are located in the European Economic Area (EEA) or United
                Kingdom, you have enhanced rights under the GDPR, including all
                rights listed in Section 6.1. You also have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Lodge a complaint with your local data protection authority
                </li>
                <li>
                  Receive information about international data transfers and
                  safeguards
                </li>
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                6.4 How to Exercise Your Rights
              </h3>
              <p>To exercise any of these rights, please contact us at:</p>
              <p className="mt-4">
                <strong>Email:</strong> privacy@fortuna.ai
                <br />
                <strong>Subject Line:</strong> Privacy Rights Request
                <br />
                <strong>Mailing Address:</strong> [Your Business Address],
                Attention: Privacy Officer
              </p>
              <p className="mt-4">
                We may need to verify your identity before processing your
                request. We will respond within the timeframes required by
                applicable law (typically 30-45 days, depending on
                jurisdiction). We may charge a reasonable fee or refuse requests
                that are excessive, repetitive, or manifestly unfounded.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                6.5 Marketing Communications
              </h3>
              <p>
                You can opt-out of marketing emails by clicking the
                &quot;unsubscribe&quot; link in any marketing email or by updating your
                email preferences in your account settings. Note that you may
                still receive transactional and administrative emails related to
                your account and subscription.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                7. Children&apos;s Privacy
              </h2>
              <p>
                The Service is not intended for children under the age of 13 (or
                16 in the EEA/UK). We do not knowingly collect personal
                information from children under 13 (or 16 in the EEA/UK) without
                verifiable parental consent. If we become aware that we have
                collected personal information from a child under the applicable
                age threshold without parental consent, we will take steps to
                delete such information promptly.
              </p>
              <p className="mt-4">
                If you are a parent or guardian and believe your child has
                provided us with personal information, please contact us at
                privacy@fortuna.ai. We comply with the Children&apos;s Online Privacy
                Protection Act (COPPA) and applicable regulations.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                8. Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies, web beacons, pixel tags, and similar tracking
                technologies to collect and store information about your use of
                the Service. Cookies are small text files stored on your device.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                8.1 Types of Cookies We Use
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Essential Cookies:</strong> Required for the Service
                  to function (authentication, security, basic functionality)
                </li>
                <li>
                  <strong>Performance/Analytics Cookies:</strong> Help us
                  understand how visitors interact with the Service (Google
                  Analytics, etc.)
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Remember your preferences
                  and settings
                </li>
                <li>
                  <strong>Advertising/Targeting Cookies:</strong> Used to
                  deliver relevant advertisements (with your consent where
                  required)
                </li>
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                8.2 Third-Party Cookies
              </h3>
              <p>
                Third parties (e.g., analytics providers, advertising networks)
                may set cookies on your device. We do not control these cookies.
                Please review the privacy policies of these third parties for
                information about their cookie practices.
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">
                8.3 Cookie Controls
              </h3>
              <p>
                Most browsers allow you to control cookies through settings. You
                can set your browser to refuse cookies or alert you when cookies
                are being sent. However, disabling cookies may limit your
                ability to use certain features of the Service. For more
                information, visit www.allaboutcookies.org.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                9. International Data Transfers
              </h2>
              <p>
                Your information may be transferred to, stored, and processed in
                countries other than your country of residence, including the
                United States, where data protection laws may differ. By using
                the Service, you consent to such transfers.
              </p>
              <p className="mt-4">
                When transferring personal information from the EEA, UK, or
                other jurisdictions with data protection laws, we implement
                appropriate safeguards, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Standard Contractual Clauses (SCCs) approved by the European
                  Commission
                </li>
                <li>
                  Adequacy decisions by relevant data protection authorities
                </li>
                <li>Other legally recognized transfer mechanisms</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                10. Automated Decision-Making and Profiling
              </h2>
              <p>
                We may use automated decision-making, including profiling, to
                personalize content, recommend subscriptions, detect fraud, and
                improve our services. We do not make decisions that produce
                significant legal effects or similarly significantly affect you
                based solely on automated processing without human intervention,
                unless required by law or with your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                11. Third-Party Services and Links
              </h2>
              <p>
                The Service may contain links to third-party websites, services,
                or applications that are not operated by us. We are not
                responsible for the privacy practices of these third parties. We
                encourage you to review the privacy policies of any third-party
                services you access through our Service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                12. Do Not Track Signals
              </h2>
              <p>
                Some browsers transmit &quot;Do Not Track&quot; (DNT) signals. We do not
                currently respond to DNT signals because there is no industry
                standard for doing so. We continue to monitor developments in
                this area.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                13. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technology, legal requirements, or
                other factors. Material changes will be effective immediately
                upon posting on this page, and we will update the &quot;Last updated&quot;
                date. We may also notify you of material changes via email or
                through the Service.
              </p>
              <p className="mt-4">
                Your continued use of the Service after such modifications
                constitutes your acceptance of the updated Privacy Policy. If
                you do not agree to the modified Privacy Policy, you must
                discontinue use of the Service immediately.
              </p>
              <p className="mt-4">
                We encourage you to review this Privacy Policy periodically to
                stay informed about how we protect your information.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                14. Contact Us
              </h2>
              <p>
                If you have any questions, concerns, complaints, or requests
                regarding this Privacy Policy or our data practices, please
                contact us:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> privacy@fortuna.ai
                <br />
                <strong>Data Protection Officer:</strong> dpo@fortuna.ai (for
                GDPR-related inquiries)
                <br />
                <strong>Mailing Address:</strong> [Your Business Address]
                <br />
                <strong>Attention:</strong> Privacy Officer
              </p>
              <p className="mt-4">
                For EU/UK residents, you also have the right to lodge a
                complaint with your local data protection authority. For a list
                of EU data protection authorities, visit:
                https://edpb.europa.eu/about-edpb/board/members_en
              </p>
            </section>

            <section className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm font-semibold">
                BY USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ,
                UNDERSTOOD, AND AGREE TO THE COLLECTION, USE, AND DISCLOSURE OF
                YOUR INFORMATION AS DESCRIBED IN THIS PRIVACY POLICY.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
