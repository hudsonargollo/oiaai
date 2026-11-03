import type { Metadata } from "next";
import { NotificationsSettings } from "./NotificationsSettings";

export const metadata: Metadata = {
	title: "Notification Settings — Oiaai",
};

export default function NotificationsSettingsPage() {
	return <NotificationsSettings />;
}
