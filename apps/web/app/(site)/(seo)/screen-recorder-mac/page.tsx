import type { Metadata } from "next";
import { ScreenRecordMacPage } from "@/components/pages/seo/ScreenRecordMacPage";
import { ogImageUrl } from "@/lib/og/url";

const ogImage = ogImageUrl({
	title: "The best screen recorder for Mac",
	tag: "Screen Recorder",
});

export const metadata: Metadata = {
	title: "Best Screen Recorder for Mac | High-Quality, Free & Easy (2026)",
	description:
		"OlhaAí is the best free screen recorder for Mac, with HD quality, no time limit in Studio Mode, and easy export. Ideal for tutorials, presentations, and educational videos.",
	openGraph: {
		title: "Best Screen Recorder for Mac | High-Quality, Free & Easy (2026)",
		description:
			"OlhaAí is the best free screen recorder for Mac, with HD quality, no time limit in Studio Mode, and easy export. Ideal for tutorials, presentations, and educational videos.",
		url: "https://oiaai.clubemkt.digital/screen-recorder-mac",
		siteName: "OlhaAí",
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "OlhaAí: Best Screen Recorder for Mac",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Best Screen Recorder for Mac | OlhaAí",
		description:
			"OlhaAí is the best free screen recorder for Mac, with HD quality, no time limit in Studio Mode, and easy export. Ideal for tutorials, presentations, and educational videos.",
		images: [ogImage],
	},
	alternates: {
		canonical: "https://oiaai.clubemkt.digital/screen-recorder-mac",
	},
};

export default function Page() {
	return <ScreenRecordMacPage />;
}
