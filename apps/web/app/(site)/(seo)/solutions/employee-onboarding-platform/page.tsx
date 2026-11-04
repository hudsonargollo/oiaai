import type { Metadata } from "next";
import { EmployeeOnboardingPlatformPage } from "@/components/pages/seo/EmployeeOnboardingPlatformPage";
import { ogImageUrl } from "@/lib/og/url";

const ogImage = ogImageUrl({
	title: "Employee onboarding with video",
	tag: "Solutions",
});

export const metadata: Metadata = {
	title:
		"Employee Onboarding Platform: Streamline New-Hire Training with OlhaAí",
	description:
		"Looking for a powerful employee onboarding platform? Discover how OlhaAí's open-source screen recorder and asynchronous features simplify new-hire training.",
	openGraph: {
		title:
			"Employee Onboarding Platform: Streamline New-Hire Training with OlhaAí",
		description:
			"Looking for a powerful employee onboarding platform? Discover how OlhaAí's open-source screen recorder and asynchronous features simplify new-hire training.",
		url: "https://cap.so/solutions/employee-onboarding-platform",
		siteName: "OlhaAí",
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "OlhaAí: Employee Onboarding Platform",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Employee Onboarding Platform | OlhaAí Screen Recorder",
		description:
			"Discover how OlhaAí's open-source screen recorder simplifies new-hire training with asynchronous video and built-in feedback.",
		images: [ogImage],
	},
	alternates: {
		canonical: "https://cap.so/solutions/employee-onboarding-platform",
	},
};

export default EmployeeOnboardingPlatformPage;
