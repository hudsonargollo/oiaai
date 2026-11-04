import type { Metadata } from "next";
import {
	ScreenRecordingPage,
	screenRecordingContent,
} from "@/components/pages/seo/ScreenRecordingPage";
import { ogImageUrl } from "@/lib/og/url";
import { createFAQSchema } from "@/utils/web-schema";

const ogImage = ogImageUrl({
	title: "Screen recording with instant sharing",
	tag: "Screen Recorder",
});

export const metadata: Metadata = {
	title: "Screen Recording — Free HD Capture, Instant Sharing | OlhaAí",
	description:
		"Record your screen in HD with audio and webcam overlay, then share instantly with a link. OlhaAí is free, open-source screen recording software for Mac and Windows.",
	alternates: {
		canonical: "https://oiaai.clubemkt.digital/screen-recording",
	},
	openGraph: {
		title: "Screen Recording — Free HD Capture, Instant Sharing | OlhaAí",
		description:
			"Record your screen in HD with audio and webcam overlay, then share instantly with a link. Free, open-source, available on Mac and Windows.",
		url: "https://oiaai.clubemkt.digital/screen-recording",
		siteName: "OlhaAí",
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "OlhaAí: Screen Recording Software",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Screen Recording — Free HD Capture, Instant Sharing | OlhaAí",
		description:
			"Record your screen in HD with audio and webcam overlay, then share instantly with a link. Free, open-source, available on Mac and Windows.",
		images: [ogImage],
	},
};

export default function Page() {
	return (
		<>
			<script type="application/ld+json">
				{JSON.stringify(createFAQSchema(screenRecordingContent.faqs))}
			</script>
			<ScreenRecordingPage />
		</>
	);
}
