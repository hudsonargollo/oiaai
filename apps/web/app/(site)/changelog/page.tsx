import type { Metadata } from "next";
import { buildMarketingMetadata } from "@/lib/og/url";
import { ChangelogView } from "./_components/ChangelogView";

export const metadata: Metadata = buildMarketingMetadata({
	title: "Changelog — Oiaai",
	description:
		"New features, improvements, and fixes across the Oiaai desktop app, web, mobile, and browser extension.",
	path: "/changelog",
	ogTitle: "Oiaai Changelog",
	ogTag: "Changelog",
});

export default function Page() {
	return <ChangelogView />;
}
