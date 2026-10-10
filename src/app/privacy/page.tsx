import type { Metadata } from "next";
import { Page } from "@/components/Shell";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy — Drums" };

export default function Privacy() {
  return (
    <Page title="Privacy policy" lede="Effective October 10, 2026">
      <div className="legal">
        <p>This Privacy Policy explains how {COMPANY}, a Delaware corporation (&quot;Drums&quot;, &quot;we&quot;, &quot;us&quot;), collects, uses, and shares information when you visit drums.run (the &quot;Site&quot;).</p>
        <h2>1. Information we collect</h2>
        <p><strong>Information you provide.</strong> When you book a call through the Site, the scheduling provider collects the details you enter, such as your name, email address, and any notes. We receive that information to run the meeting.</p>
        <p><strong>Information collected automatically.</strong> Our hosting provider records standard server logs, including IP address, browser type, pages requested, and timestamps, to serve the Site and keep it secure. The Site does not set advertising cookies.</p>
        <h2>2. How we use information</h2>
        <p>We use information to respond to you, schedule and hold meetings, operate and secure the Site, and understand how it is used. We do not sell personal information.</p>
        <h2>3. Sharing</h2>
        <p>We share information with service providers that help us operate the Site, such as hosting and scheduling providers, under terms that restrict their use of it. We may also share information when required by law or to protect our rights, and in connection with a merger, financing, or sale of assets.</p>
        <h2>4. Third-party services</h2>
        <p>The booking widget on the Site is provided by Google Calendar. Information you submit there is also subject to Google&apos;s privacy policy.</p>
        <h2>5. Retention and security</h2>
        <p>We keep information for as long as needed for the purposes above and as required by law. We use reasonable technical and organizational measures to protect it, but no method of transmission or storage is completely secure.</p>
        <h2>6. Your choices</h2>
        <p>You may request access to, correction of, or deletion of your personal information by reaching us through the booking link on the Site. Residents of certain jurisdictions, including California and the European Economic Area, may have additional rights under applicable law.</p>
        <h2>7. Children</h2>
        <p>The Site is not directed to children under 16, and we do not knowingly collect personal information from them.</p>
        <h2>8. Changes</h2>
        <p>We may update this policy from time to time. The effective date above reflects the latest version.</p>
        <h2>9. Contact</h2>
        <p>{COMPANY} is a Delaware C corporation. Privacy questions can be raised through the booking link on the Site.</p>
      </div>
    </Page>
  );
}
