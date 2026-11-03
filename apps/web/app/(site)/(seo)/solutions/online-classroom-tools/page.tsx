import type { Metadata } from "next";
import { OnlineClassroomToolsPage } from "@/components/pages/seo/OnlineClassroomToolsPage";
import { ogImageUrl } from "@/lib/og/url";

const ogImage = ogImageUrl({
	title: "Online classroom tools for educators",
	tag: "Solutions",
});

export const metadata: Metadata = {
	title: "Online Classroom Tools: Empower Remote Teaching with Oiaai",
	description:
		"Searching for online classroom tools? Learn how Oiaai's screen recorder helps educators create engaging lessons, manage student feedback, and streamline remote learning.",
	openGraph: {
		title: "Online Classroom Tools: Empower Remote Teaching with Oiaai",
		description:
			"Learn how Oiaai's screen recorder helps educators create engaging lessons, manage student feedback, and streamline remote learning.",
		url: "https://cap.so/solutions/online-classroom-tools",
		siteName: "Oiaai",
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "Oiaai: Online Classroom Tools",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Online Classroom Tools | Oiaai Screen Recorder",
		description:
			"Learn how Oiaai's screen recorder helps educators create engaging lessons, manage student feedback, and streamline remote learning.",
		images: [ogImage],
	},
	alternates: {
		canonical: "https://cap.so/solutions/online-classroom-tools",
	},
};

export default OnlineClassroomToolsPage;
