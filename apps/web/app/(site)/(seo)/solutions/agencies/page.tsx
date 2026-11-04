import type { Metadata } from "next";
import Script from "next/script";
import { AgenciesPage } from "@/components/pages/seo/AgenciesPage";
import { PRICING } from "@/data/pricing";
import { ogImageUrl } from "@/lib/og/url";

// Create FAQ structured data for SEO
const createFaqStructuredData = () => {
	const faqs = [
		{
			question: "Does OlhaAí work on both macOS and Windows?",
			answer:
				"Yes. OlhaAí supports both macOS and Windows with desktop apps, so your entire team can use the same workflow regardless of their platform preference.",
		},
		{
			question: "Can clients view videos without installing anything?",
			answer:
				"Yes. Clients can watch videos directly in their browser through a simple link. No downloads, no account creation, no friction. They can also leave comments directly on the video.",
		},
		{
			question: "What's the difference between Instant Mode and Studio Mode?",
			answer:
				"Instant Mode generates a shareable link immediately after recording—perfect for quick updates. Studio Mode records locally for the highest quality and includes precision editing tools for professional client presentations.",
		},
		{
			question: "How long can we record on the free version?",
			answer: `The free version supports recordings up to 5 minutes. For longer client presentations and unlimited recording time, upgrade to OlhaAí Pro at $${PRICING.pro.annualPerMonth}/month (billed annually).`,
		},
		{
			question: "Is OlhaAí secure enough for confidential client work?",
			answer:
				"Yes. OlhaAí is open-source and privacy-first. You can connect your own S3 storage, use a custom domain for share links, and password-protect sensitive videos. This gives you complete control over client data.",
		},
		{
			question: "Can we use our own branding with OlhaAí?",
			answer:
				"Yes. OlhaAí Pro includes custom domain support (cap.yourdomain.com) so share links reflect your agency's brand. You can also use your own S3 storage for complete data ownership.",
		},
		{
			question: "How does OlhaAí pricing work for agency teams?",
			answer: `OlhaAí Pro is $${PRICING.pro.annualPerMonth}/month per user (billed annually) and includes unlimited cloud storage, custom domains, team workspaces, and all collaboration features. Volume discounts are available for teams over 10 users.`,
		},
	];

	const faqStructuredData = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer.replace(/<\/?[^>]+(>|$)/g, ""),
			},
		})),
	};

	return JSON.stringify(faqStructuredData);
};

// Create SoftwareApplication structured data
const createSoftwareStructuredData = () => {
	const softwareStructuredData = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "OlhaAí — Screen Recorder",
		operatingSystem: ["macOS", "Windows"],
		applicationCategory: "BusinessApplication",
		description:
			"Open-source, privacy-first screen recorder for agencies. Instant share links and studio-quality local recording with editing.",
		publisher: {
			"@type": "Organization",
			name: "OlhaAí",
		},
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
			category: "FreeTrial",
		},
	};

	return JSON.stringify(softwareStructuredData);
};

const ogImage = ogImageUrl({
	title: "OlhaAí for agencies",
	tag: "Solutions",
});

export const metadata: Metadata = {
	title: "OlhaAí for Agencies — Faster Client Updates with Instant Video Links",
	description:
		"Send clearer client updates in minutes. Share instant links with comments, or craft polished walkthroughs. OlhaAí for Agencies on macOS & Windows.",
	openGraph: {
		title:
			"OlhaAí for Agencies — Faster Client Updates with Instant Video Links",
		description:
			"Send clearer client updates in minutes. Share instant links with comments, or craft polished walkthroughs. OlhaAí for Agencies on macOS & Windows.",
		url: "https://oiaai.clubemkt.digital/solutions/agencies",
		siteName: "OlhaAí",
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "OlhaAí for Agencies",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title:
			"OlhaAí for Agencies — Faster Client Updates with Instant Video Links",
		description:
			"Send clearer client updates in minutes. Share instant links with comments, or craft polished walkthroughs. OlhaAí for Agencies on macOS & Windows.",
		images: [ogImage],
	},
	alternates: {
		canonical: "https://oiaai.clubemkt.digital/solutions/agencies",
	},
};

export default function Page() {
	return (
		<>
			<Script
				id="faq-structured-data"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: createFaqStructuredData() }}
			/>
			<Script
				id="software-structured-data"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: createSoftwareStructuredData() }}
			/>
			<AgenciesPage />
		</>
	);
}
