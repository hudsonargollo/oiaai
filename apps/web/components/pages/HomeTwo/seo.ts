import { homepageCopy } from "@/data/homepage-copy";
import { PRICING } from "@/data/pricing";

export const homepageSeo = {
	url: "https://oiaai.clubemkt.digital/",
	title: "OlhaAí — Free Screen Recorder & Open Source Loom Alternative",
	description:
		"OlhaAí is the free, open source screen recorder for Mac, Windows, and Linux. Record, edit, take screenshots, and share videos with a link.",
} as const;

export const homepageSchema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": "https://oiaai.clubemkt.digital/#organization",
			name: "OlhaAí",
			url: homepageSeo.url,
			logo: {
				"@type": "ImageObject",
				url: "https://oiaai.clubemkt.digital/cap-logo.png",
				width: 1440,
				height: 480,
			},
			sameAs: [
				"https://github.com/CapSoftware/Cap",
				"https://x.com/cap",
				"https://www.linkedin.com/company/caprecorder/",
			],
			contactPoint: {
				"@type": "ContactPoint",
				email: "hello@oiaai.clubemkt.digital",
				contactType: "customer support",
			},
		},
		{
			"@type": "WebSite",
			"@id": "https://oiaai.clubemkt.digital/#website",
			name: "OlhaAí",
			url: homepageSeo.url,
			publisher: { "@id": "https://oiaai.clubemkt.digital/#organization" },
			inLanguage: "en",
		},
		{
			"@type": "WebPage",
			"@id": "https://oiaai.clubemkt.digital/#webpage",
			url: homepageSeo.url,
			name: homepageSeo.title,
			description: homepageSeo.description,
			isPartOf: { "@id": "https://oiaai.clubemkt.digital/#website" },
			mainEntity: { "@id": "https://oiaai.clubemkt.digital/#software" },
			inLanguage: "en",
		},
		{
			"@type": "SoftwareApplication",
			"@id": "https://oiaai.clubemkt.digital/#software",
			name: "OlhaAí",
			url: homepageSeo.url,
			description: homepageSeo.description,
			applicationCategory: "MultimediaApplication",
			operatingSystem: ["macOS", "Windows", "Linux"],
			downloadUrl: "https://oiaai.clubemkt.digital/download",
			publisher: { "@id": "https://oiaai.clubemkt.digital/#organization" },
			mainEntityOfPage: { "@id": "https://oiaai.clubemkt.digital/#webpage" },
			featureList: [
				"Screen, webcam, and audio recording",
				"Instant share links that upload while you record",
				"Local 4K recording at 60fps with a built-in video editor",
				"Automatic zoom on clicks",
				"Cursor smoothing and click effects",
				"Camera layouts: webcam bubble, split screen, camera only",
				"Automatic captions in 19 languages, generated on device",
				"Blur and pixelate sensitive information",
				"Custom backgrounds, padding, rounded corners, and shadows",
				"Animated text, titles, and lower thirds",
				"3D camera effects and color grading",
				"Trim, split, and speed controls from 0.25x to 8x",
				"MP4 and GIF export",
				"Screenshot capture with annotation tools",
				"AI titles, summaries, chapters, and transcripts",
				"Timestamped comments, reactions, and viewer analytics",
				"Password protected links and custom domains",
				"Google Drive and S3 storage integrations",
				"CLI and MCP server for AI agents",
				"Loom video importer for single videos and CSV libraries",
				"Open source and self-hostable",
			],
			offers: [
				{
					"@type": "Offer",
					name: "OlhaAí Free",
					price: 0,
					priceCurrency: "USD",
					url: "https://oiaai.clubemkt.digital/download",
					description: "Free local recording and editing for personal use.",
				},
				{
					"@type": "Offer",
					name: "Desktop License",
					price: PRICING.commercial.lifetime,
					priceCurrency: "USD",
					url: "https://oiaai.clubemkt.digital/pricing",
					description: "One-time desktop license for commercial use.",
				},
				{
					"@type": "Offer",
					name: "OlhaAí Pro",
					price: PRICING.pro.monthly,
					priceCurrency: "USD",
					url: "https://oiaai.clubemkt.digital/pricing",
					description:
						"Per user, billed monthly. Annual billing is also available.",
				},
			],
		},
		{
			"@type": "FAQPage",
			"@id": "https://oiaai.clubemkt.digital/#faq",
			isPartOf: { "@id": "https://oiaai.clubemkt.digital/#webpage" },
			mainEntity: homepageCopy.faq.items.map((item) => ({
				"@type": "Question",
				name: item.question,
				acceptedAnswer: { "@type": "Answer", text: item.answer },
			})),
		},
	],
};
