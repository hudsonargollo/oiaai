import type { Metadata } from "next";
import { DomainsClient } from "./DomainsClient";

export const metadata: Metadata = {
	title: "Allowed Domains — OlhaAí",
};

export default async function DomainsPage() {
	return <DomainsClient />;
}
