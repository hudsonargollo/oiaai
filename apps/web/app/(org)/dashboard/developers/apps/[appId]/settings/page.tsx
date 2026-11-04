import type { Metadata } from "next";
import { AppSettingsClient } from "./AppSettingsClient";

export const metadata: Metadata = {
	title: "App Settings — OlhaAí",
};

export default async function AppSettingsPage() {
	return <AppSettingsClient />;
}
