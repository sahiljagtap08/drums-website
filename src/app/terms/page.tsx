import type { Metadata } from "next";
import { Page } from "@/components/Shell";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of use — Drums" };

export default function Terms() {
  return (
    <Page title="Terms of use" lede="Effective October 10, 2026">
      <div className="legal">
        <p>These Terms of Use (&quot;Terms&quot;) govern your access to and use of the website at drums.run and any related services (the &quot;Site&quot;) operated by {COMPANY}, a Delaware corporation (&quot;Drums&quot;, &quot;we&quot;, &quot;us&quot;). By using the Site you agree to these Terms. If you do not agree, do not use the Site.</p>
        <h2>1. Use of the Site</h2>
        <p>You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to interfere with the Site&apos;s operation, attempt to gain unauthorized access to any systems, or use automated means to scrape or copy content except as permitted by a public search engine&apos;s standard indexing.</p>
        <h2>2. Products and services</h2>
        <p>Information on the Site describes products that are provided under separate written agreements. Nothing on the Site is an offer to sell, and performance figures described as targets or goals are not guarantees. Access to Drums products is governed by the agreement you sign with us.</p>
        <h2>3. Intellectual property</h2>
        <p>The Site, including its text, graphics, logos, and illustrations, is owned by Drums or its licensors and protected by copyright, trademark, and other laws. &quot;Drums&quot; and the Drums mark are trademarks of {COMPANY}. You may not use them without our prior written consent.</p>
        <h2>4. Third-party links and services</h2>
        <p>The Site may link to or embed third-party services, such as scheduling tools. We are not responsible for their content or practices, and your use of them is subject to their own terms.</p>
        <h2>5. Disclaimer of warranties</h2>
        <p>THE SITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
        <h2>6. Limitation of liability</h2>
        <p>TO THE FULLEST EXTENT PERMITTED BY LAW, DRUMS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR DATA, ARISING OUT OF YOUR USE OF THE SITE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SITE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS.</p>
        <h2>7. Changes</h2>
        <p>We may update these Terms from time to time. The effective date above reflects the latest version. Continued use of the Site after changes are posted constitutes acceptance.</p>
        <h2>8. Governing law</h2>
        <p>These Terms are governed by the laws of the State of Delaware, without regard to its conflict-of-laws rules. Any dispute will be brought exclusively in the state or federal courts located in Delaware.</p>
        <h2>9. Contact</h2>
        <p>Questions about these Terms can be raised through the booking link on the Site. {COMPANY} is a Delaware C corporation.</p>
      </div>
    </Page>
  );
}
