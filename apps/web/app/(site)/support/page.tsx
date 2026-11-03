import type { Metadata } from "next";
import { SupportPage } from "@/components/pages/SupportPage";
import { buildMarketingMetadata } from "@/lib/og/url";

export const metadata: Metadata = buildMarketingMetadata({
	title: "Support — Oiaai",
	description:
		"Get help with Oiaai. Join our Discord community, email hello@cap.so, read the docs, or report an issue on GitHub.",
	path: "/support",
	ogTitle: "Get help with Oiaai",
	ogTag: "Support",
});

export default function App() {
	return <SupportPage />;
}
