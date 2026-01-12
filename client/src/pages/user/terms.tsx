import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-24 pb-16 flex-1">
        <article className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-8">
            Terms of Use
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
                1. Agreement to Terms
              </h2>
              <p>
                By accessing, browsing, or using the Fortuna.ai newsletter
                platform, website, mobile application, or any related services
                (collectively, the "Service"), you acknowledge that you have
                read, understood, and agree to be bound by these Terms of Use
                ("Terms") and our Privacy Policy. These Terms constitute a
                legally binding agreement between you ("User," "you," or "your")
                and Fortuna.ai, its affiliates, subsidiaries, and parent
                companies (collectively, "Company," "we," "us," or "our").
              </p>
              <p className="mt-4">
                IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST IMMEDIATELY
                DISCONTINUE USE OF THE SERVICE AND NOT ACCESS OR USE ANY PART
                THEREOF.
              </p>
              <p className="mt-4">
                You must be at least 18 years of age, or the age of legal
                majority in your jurisdiction, to use the Service. By using the
                Service, you represent and warrant that you meet this age
                requirement. If you are under 18 but at least 13 years old, you
                may only use the Service with the express consent and
                supervision of a parent or legal guardian who agrees to be bound
                by these Terms on your behalf.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                2. Financial Information Disclaimer & No Investment Advice
              </h2>
              <p className="font-semibold text-foreground">
                THE SERVICE PROVIDES INFORMATIONAL CONTENT ONLY. NOT FINANCIAL,
                INVESTMENT, LEGAL, OR TAX ADVICE.
              </p>
              <p className="mt-4">
                All content, data, information, analysis, opinions, trading
                alerts, market insights, and materials provided through the
                Service (collectively, "Content") are provided for informational
                and educational purposes only. The Content does not constitute,
                and should not be construed as:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Financial, investment, legal, tax, or accounting advice</li>
                <li>
                  A recommendation, offer, or solicitation to buy, sell, or hold
                  any security, financial instrument, or investment
                </li>
                <li>
                  A personalized recommendation or advice tailored to your
                  specific financial situation, investment objectives, or risk
                  tolerance
                </li>
                <li>
                  An endorsement or promotion of any investment strategy,
                  trading approach, or financial product
                </li>
                <li>Research reports as defined by FINRA or SEC regulations</li>
              </ul>
              <p className="mt-4 font-semibold">
                PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS. ALL
                INVESTMENTS CARRY RISK, INCLUDING THE RISK OF LOSS OF PRINCIPAL.
              </p>
              <p className="mt-4">You acknowledge and agree that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  You are solely responsible for all investment and trading
                  decisions you make
                </li>
                <li>
                  You should consult with qualified financial, legal, and tax
                  advisors before making any investment decisions
                </li>
                <li>
                  We do not provide personalized investment advice or manage
                  accounts on your behalf
                </li>
                <li>
                  We are not registered as investment advisors, broker-dealers,
                  or financial planners
                </li>
                <li>
                  The Content may contain errors, inaccuracies, or outdated
                  information
                </li>
                <li>
                  Market conditions can change rapidly and the Content may not
                  reflect current market conditions
                </li>
                <li>
                  Any trading or investment decisions based on the Content are
                  made at your own risk
                </li>
                <li>You may lose all or part of your investment capital</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                3. Subscription Services and Payment Terms
              </h2>
              <p>
                We offer various subscription plans with different features,
                pricing, and billing frequencies. By subscribing to a paid plan,
                you agree to pay all fees and charges associated with your
                subscription in accordance with the pricing and payment terms
                displayed at the time of subscription.
              </p>
              <p className="mt-4">
                <strong>Billing and Automatic Renewal:</strong> Subscription
                fees are billed in advance on a recurring basis (monthly or
                annually, as selected by you). Your subscription will
                automatically renew at the end of each billing period unless you
                cancel prior to the renewal date. You authorize us to charge the
                payment method on file for all applicable fees and charges.
              </p>
              <p className="mt-4">
                <strong>Price Changes:</strong> We reserve the right to modify
                subscription fees at any time. Price changes will not affect
                your current billing period but will apply to subsequent
                renewals. We will provide notice of material price increases at
                least 30 days in advance.
              </p>
              <p className="mt-4">
                <strong>Refund Policy:</strong> All subscription fees are
                non-refundable except as required by applicable law or as
                explicitly stated in a separate written agreement. We do not
                provide refunds or credits for partial subscription periods,
                unused portions of subscriptions, or changes in your personal
                circumstances.
              </p>
              <p className="mt-4">
                <strong>Cancellation:</strong> You may cancel your subscription
                at any time through your account settings or by contacting us at
                support@fortuna.ai. Cancellation will take effect at the end of
                your current billing period. You will continue to have access to
                paid features until the end of your paid period. No refunds will
                be provided for the remaining portion of a billing period.
              </p>
              <p className="mt-4">
                <strong>Failed Payments:</strong> If payment fails or is
                declined, we reserve the right to immediately suspend or
                terminate your subscription and access to paid features. You are
                responsible for ensuring your payment information is current and
                valid.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                4. Content and Intellectual Property Rights
              </h2>
              <p>
                All Content provided through the Service, including but not
                limited to articles, newsletters, research, analysis, data,
                graphics, logos, trademarks, trade names, software, code, and
                other materials, is the exclusive property of Fortuna.ai, its
                licensors, or content providers and is protected by United
                States and international copyright, trademark, patent, trade
                secret, and other intellectual property laws.
              </p>
              <p className="mt-4">
                <strong>Limited License:</strong> Subject to your compliance
                with these Terms, we grant you a limited, non-exclusive,
                non-transferable, non-sublicensable, revocable license to access
                and use the Service and Content for your personal,
                non-commercial use only.
              </p>
              <p className="mt-4">
                <strong>Prohibited Activities:</strong> You may not, and may not
                permit others to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  Reproduce, copy, duplicate, download, scrape, archive, or
                  store Content except as necessary to use the Service
                </li>
                <li>
                  Distribute, publish, transmit, broadcast, sell, rent, lease,
                  or otherwise make Content available to third parties
                </li>
                <li>
                  Create derivative works, modifications, or adaptations based
                  on the Content
                </li>
                <li>
                  Remove, alter, or obscure any copyright, trademark, or other
                  proprietary notices
                </li>
                <li>
                  Reverse engineer, decompile, disassemble, or attempt to derive
                  source code from the Service
                </li>
                <li>
                  Use Content for any commercial purpose without our prior
                  written consent
                </li>
                <li>
                  Share your account credentials or allow unauthorized access to
                  your account
                </li>
                <li>
                  Use automated systems, bots, scrapers, or crawlers to access
                  the Service
                </li>
              </ul>
              <p className="mt-4">
                Any unauthorized use of the Service or Content may violate
                applicable laws and may result in civil and criminal penalties.
                We reserve the right to pursue all available legal and equitable
                remedies.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                5. User Accounts and Security
              </h2>
              <p>
                To access certain features of the Service, you must create an
                account. You are solely responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  Maintaining the confidentiality and security of your account
                  credentials
                </li>
                <li>
                  All activities that occur under your account, whether
                  authorized by you or not
                </li>
                <li>
                  Providing accurate, current, and complete information during
                  registration and keeping it updated
                </li>
                <li>
                  Immediately notifying us of any unauthorized access or
                  security breach
                </li>
                <li>
                  Ensuring that you log out from your account at the end of each
                  session
                </li>
              </ul>
              <p className="mt-4">
                We are not liable for any loss or damage arising from your
                failure to comply with these security obligations. You agree to
                notify us immediately at security@fortuna.ai of any suspected
                unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                6. Prohibited Uses and User Conduct
              </h2>
              <p>You agree not to use the Service in any manner that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  Violates any applicable federal, state, local, or
                  international law, rule, or regulation
                </li>
                <li>
                  Infringes upon or violates our intellectual property rights or
                  the intellectual property rights of others
                </li>
                <li>
                  Harasses, abuses, insults, harms, defames, slanders,
                  disparages, intimidates, discriminates, or threatens any
                  individual or group
                </li>
                <li>
                  Contains false, misleading, fraudulent, or deceptive
                  information
                </li>
                <li>
                  Transmits or introduces viruses, malware, trojans, worms, or
                  any other malicious code
                </li>
                <li>
                  Attempts to gain unauthorized access to our systems, networks,
                  or other users' accounts
                </li>
                <li>
                  Interferes with or disrupts the Service, servers, or networks
                  connected to the Service
                </li>
                <li>
                  Uses the Service to compete with us or to develop competing
                  products or services
                </li>
                <li>
                  Collects or harvests information about other users without
                  their consent
                </li>
                <li>
                  Impersonates any person or entity or misrepresents your
                  affiliation with any person or entity
                </li>
                <li>
                  Violates any securities laws, including insider trading
                  regulations
                </li>
                <li>
                  Uses the Service for any illegal gambling or other illegal
                  activities
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                7. Disclaimer of Warranties
              </h2>
              <p className="font-semibold">
                THE SERVICE AND CONTENT ARE PROVIDED "AS IS," "AS AVAILABLE,"
                AND "WITH ALL FAULTS" WITHOUT WARRANTIES OF ANY KIND, EITHER
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  Implied warranties of merchantability, fitness for a
                  particular purpose, non-infringement, and title
                </li>
                <li>
                  Warranties that the Service will be uninterrupted, timely,
                  secure, error-free, or free from viruses or other harmful
                  components
                </li>
                <li>
                  Warranties regarding the accuracy, reliability, completeness,
                  or usefulness of any Content
                </li>
                <li>
                  Warranties that defects will be corrected or that the Service
                  will meet your requirements
                </li>
                <li>Warranties regarding third-party services or products</li>
              </ul>
              <p className="mt-4">
                We do not warrant, guarantee, or make any representations
                regarding the use of, or the results of the use of, the Service
                or Content in terms of accuracy, reliability, completeness,
                correctness, timeliness, or otherwise.
              </p>
              <p className="mt-4">
                Some jurisdictions do not allow the exclusion of implied
                warranties, so the above exclusions may not apply to you. In
                such jurisdictions, our liability shall be limited to the
                maximum extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                8. Limitation of Liability
              </h2>
              <p className="font-semibold">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
                SHALL FORTUNA.AI, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS,
                AFFILIATES, SUBSIDIARIES, SUCCESSORS, ASSIGNS, LICENSORS, OR
                SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES,
                INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  Loss of profits, revenue, data, use, goodwill, or other
                  intangible losses
                </li>
                <li>
                  Investment losses, trading losses, or financial losses of any
                  kind
                </li>
                <li>Damages resulting from reliance on any Content</li>
                <li>
                  Damages resulting from unauthorized access to or use of the
                  Service
                </li>
                <li>
                  Damages resulting from the interruption or cessation of the
                  Service
                </li>
                <li>
                  Damages resulting from errors, omissions, or inaccuracies in
                  the Content
                </li>
                <li>
                  Damages resulting from the transmission of viruses or other
                  harmful components
                </li>
              </ul>
              <p className="mt-4">
                <strong>Total Liability Cap:</strong> Our total aggregate
                liability to you for all claims arising from or related to the
                Service, regardless of the legal theory, shall not exceed the
                greater of (a) the amount you paid to us in the twelve (12)
                months preceding the claim, or (b) One Hundred Dollars ($100.00
                USD).
              </p>
              <p className="mt-4">
                These limitations apply even if we have been advised of the
                possibility of such damages and regardless of whether such
                damages arise from breach of contract, tort (including
                negligence), strict liability, or any other legal theory.
              </p>
              <p className="mt-4">
                Some jurisdictions do not allow the exclusion or limitation of
                certain damages, so some of the above limitations may not apply
                to you. In such jurisdictions, our liability shall be limited to
                the maximum extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                9. Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold harmless Fortuna.ai,
                its directors, officers, employees, agents, affiliates,
                subsidiaries, successors, assigns, licensors, and service
                providers from and against any and all claims, demands,
                liabilities, damages, losses, costs, expenses (including
                reasonable attorneys' fees and legal costs), and other
                obligations arising from or related to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Your use or misuse of the Service or Content</li>
                <li>Your violation of these Terms</li>
                <li>
                  Your violation of any third-party rights, including
                  intellectual property rights, privacy rights, or publicity
                  rights
                </li>
                <li>
                  Your violation of any applicable law, rule, or regulation
                </li>
                <li>
                  Any investment, trading, or financial decisions you make based
                  on the Content
                </li>
                <li>
                  Any content, information, or materials you submit, post, or
                  transmit through the Service
                </li>
                <li>Your account or any activity under your account</li>
              </ul>
              <p className="mt-4">
                We reserve the right, at our own expense, to assume the
                exclusive defense and control of any matter subject to
                indemnification by you, in which case you agree to cooperate
                with our defense of such claims.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                10. Service Availability and Modifications
              </h2>
              <p>
                We reserve the right, in our sole discretion and without prior
                notice, to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  Modify, suspend, discontinue, or terminate any aspect of the
                  Service at any time
                </li>
                <li>
                  Impose limits on certain features or restrict access to parts
                  or all of the Service
                </li>
                <li>
                  Make changes to the Content, features, functionality, or
                  pricing
                </li>
                <li>
                  Perform maintenance, updates, or modifications that may result
                  in temporary unavailability
                </li>
              </ul>
              <p className="mt-4">
                We do not guarantee that the Service will be available at all
                times, uninterrupted, or error-free. We are not liable for any
                loss or damage resulting from the unavailability, interruption,
                or termination of the Service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                11. Force Majeure
              </h2>
              <p>
                We shall not be liable for any failure or delay in performance
                under these Terms due to circumstances beyond our reasonable
                control, including but not limited to acts of God, natural
                disasters, war, terrorism, riots, embargoes, acts of civil or
                military authorities, fire, floods, accidents, pandemics,
                epidemics, network or equipment failures, cyber attacks,
                third-party service provider failures, or any other causes
                beyond our reasonable control.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                12. Termination
              </h2>
              <p>
                We reserve the right, in our sole discretion and without prior
                notice, to suspend or terminate your account and access to the
                Service immediately, without liability, for any reason,
                including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Your breach or violation of these Terms</li>
                <li>Your failure to pay applicable fees</li>
                <li>Fraudulent, illegal, or harmful activity</li>
                <li>Extended periods of account inactivity</li>
                <li>
                  Any other reason we deem necessary for the protection of our
                  rights or the Service
                </li>
              </ul>
              <p className="mt-4">
                Upon termination, your right to use the Service will immediately
                cease. All provisions of these Terms that by their nature should
                survive termination shall survive, including but not limited to
                intellectual property rights, warranty disclaimers, limitations
                of liability, and indemnification obligations.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                13. Dispute Resolution and Arbitration
              </h2>
              <p className="font-semibold">
                PLEASE READ THIS SECTION CAREFULLY AS IT AFFECTS YOUR LEGAL
                RIGHTS.
              </p>
              <p className="mt-4">
                <strong>Informal Resolution:</strong> Before initiating any
                formal dispute resolution proceeding, you agree to first contact
                us at legal@fortuna.ai to attempt to resolve the dispute
                informally.
              </p>
              <p className="mt-4">
                <strong>Binding Arbitration:</strong> Except for disputes that
                qualify for small claims court, any controversy or claim arising
                out of or relating to these Terms, the Service, or the
                relationship between you and Fortuna.ai shall be settled by
                binding arbitration administered by the American Arbitration
                Association (AAA) in accordance with its Commercial Arbitration
                Rules. The arbitration shall be conducted in English in the
                State of Delaware, United States.
              </p>
              <p className="mt-4">
                <strong>Class Action Waiver:</strong> You agree that disputes
                will be resolved individually and not on a class action,
                consolidated, or representative basis. You waive any right to
                participate in a class action, collective action, or
                representative proceeding.
              </p>
              <p className="mt-4">
                <strong>Exceptions:</strong> Notwithstanding the foregoing,
                either party may seek injunctive relief in any court of
                competent jurisdiction to protect intellectual property rights
                or to prevent irreparable harm.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                14. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the State of Delaware, United States, without
                regard to its conflict of law provisions. Any legal action or
                proceeding arising under these Terms shall be brought
                exclusively in the federal and state courts located in Delaware,
                and you consent to the personal jurisdiction and venue of such
                courts.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                15. Statute of Limitations
              </h2>
              <p>
                You agree that regardless of any statute or law to the contrary,
                any claim or cause of action arising out of or related to the
                Service or these Terms must be filed within one (1) year after
                such claim or cause of action arose, or such claim or cause of
                action is forever barred.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                16. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify, update, or replace these Terms
                at any time, in our sole discretion. Material changes will be
                effective immediately upon posting on this page, and we will
                update the "Last updated" date. Your continued use of the
                Service after such modifications constitutes your acceptance of
                the updated Terms. If you do not agree to the modified Terms,
                you must discontinue use of the Service immediately.
              </p>
              <p className="mt-4">
                We encourage you to review these Terms periodically to stay
                informed of any updates.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                17. Severability and Waiver
              </h2>
              <p>
                If any provision of these Terms is found to be invalid, illegal,
                or unenforceable by a court of competent jurisdiction, such
                provision shall be modified to the minimum extent necessary to
                make it valid and enforceable, or if modification is not
                possible, severed from these Terms. The remainder of these Terms
                shall remain in full force and effect.
              </p>
              <p className="mt-4">
                Our failure to enforce any right or provision of these Terms
                shall not constitute a waiver of such right or provision. Any
                waiver of any provision must be in writing and signed by an
                authorized representative of Fortuna.ai.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                18. Entire Agreement
              </h2>
              <p>
                These Terms, together with our Privacy Policy and any other
                legal notices published by us on the Service, constitute the
                entire agreement between you and Fortuna.ai regarding the
                Service and supersede all prior or contemporaneous
                communications, proposals, and agreements, whether electronic,
                oral, or written, between you and Fortuna.ai.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                19. Assignment
              </h2>
              <p>
                You may not assign, transfer, or sublicense these Terms or any
                rights or obligations hereunder without our prior written
                consent. We may assign, transfer, or delegate these Terms and
                our rights and obligations without restriction, including in
                connection with a merger, acquisition, reorganization, or sale
                of assets.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                20. Contact Information
              </h2>
              <p>
                If you have any questions, concerns, or complaints about these
                Terms of Use, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> legal@fortuna.ai
                <br />
              </p>
            </section>

            <section className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm font-semibold">
                BY USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ,
                UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF USE.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
