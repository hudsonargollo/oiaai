import { PRICING } from "@/data/pricing";
import { testimonials } from "@/data/testimonials";
import {
	createBreadcrumbSchema,
	createFAQSchema,
	createOrganizationSchema,
	createProductSchema,
	createSoftwareApplicationSchema,
	createWebSiteSchema,
} from "@/utils/web-schema";

const homePageFAQs = [
	{
		question: "What is OlhaAí?",
		answer:
			"OlhaAí is an open-source screen recording software that offers beautiful, lightweight recordings with instant sharing capabilities. It's the privacy-focused alternative to Loom.",
	},
	{
		question: "How much does OlhaAí cost?",
		answer: `OlhaAí offers a generous free plan with Studio mode for personal use and 5-minute shareable links. The Pro plan starts at just $${PRICING.pro.annualPerMonth}/month per user, which is less than half the price of Loom.`,
	},
	{
		question: "Is OlhaAí available for Windows and Mac?",
		answer:
			"Yes, OlhaAí is available for both macOS and Windows, providing consistent performance and features across both platforms.",
	},
	{
		question: "Can I use my own storage with OlhaAí?",
		answer:
			"Yes, OlhaAí allows you to connect your own Google Drive or S3 storage and a custom domain, giving you 100% ownership and control over your content.",
	},
	{
		question: "What makes OlhaAí different from other screen recorders?",
		answer:
			"OlhaAí is fully open-source, privacy-focused, and offers unique features like Studio mode (free for personal use), 4K recording at 60fps, built-in thread commenting, and the ability to use your own storage and domain.",
	},
	{
		question: "Does OlhaAí support team collaboration?",
		answer:
			"Yes, OlhaAí includes built-in thread commenting on shareable links, making it easy to collaborate with teammates and collect feedback directly on your recordings.",
	},
];

const createHomePageSchema = () => {
	const schemas = [
		createOrganizationSchema(),
		createWebSiteSchema(),
		createSoftwareApplicationSchema(testimonials),
		createProductSchema(),
		createBreadcrumbSchema([{ name: "Home", url: "https://cap.so" }]),
		createFAQSchema(homePageFAQs),
	];

	return JSON.stringify(schemas);
};

export const HomePageSchema = () => {
	return <script type="application/ld+json">{createHomePageSchema()}</script>;
};
