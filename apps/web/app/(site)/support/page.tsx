import type { Metadata } from "next";
import { SupportPage } from "@/components/pages/SupportPage";
import { buildMarketingMetadata } from "@/lib/og/url";

export const metadata: Metadata = buildMarketingMetadata({
	title: "Support — OlhaAí",
	description:
		"Get help with OlhaAí. Join our Discord community, email hello@oiaai.clubemkt.digital, read the docs, or report an issue on GitHub.",
	path: "/support",
	ogTitle: "Get help with OlhaAí",
	ogTag: "Support",
});

export default function App() {
	return <SupportPage />;
}
