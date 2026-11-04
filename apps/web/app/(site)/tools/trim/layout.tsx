import { createBreadcrumbSchema } from "@/utils/web-schema";

export { metadata } from "./metadata";

const breadcrumbSchema = createBreadcrumbSchema([
	{ name: "Home", url: "https://oiaai.clubemkt.digital" },
	{ name: "Tools", url: "https://oiaai.clubemkt.digital/tools" },
	{ name: "Trim Video Online", url: "https://oiaai.clubemkt.digital/tools/trim" },
]);

export default function TrimLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>
			{children}
		</>
	);
}
