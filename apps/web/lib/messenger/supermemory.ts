import "server-only";

import { serverEnv } from "@cap/env";
import Supermemory from "supermemory";
import {
	MESSENGER_ADMIN_EMAIL,
	MESSENGER_DEFAULT_KNOWLEDGE_TAG,
} from "./constants";

export type SupermemoryConversationMessage = {
	role: "user" | "assistant";
	content: string;
	timestamp: string;
};

const getApiKey = () => serverEnv().SUPERMEMORY_API_KEY;

let _client: Supermemory | null = null;

const getClient = () => {
	const key = getApiKey();
	if (!key) return null;
	if (_client) return _client;
	_client = new Supermemory({ apiKey: key });
	return _client;
};

export const getKnowledgeTag = () =>
	serverEnv().SUPERMEMORY_KNOWLEDGE_TAG?.trim() ||
	MESSENGER_DEFAULT_KNOWLEDGE_TAG;

export const getIdentityTag = (
	userId: string | null,
	anonymousId: string | null,
) =>
	userId
		? `cap-support-user:${userId}`
		: `cap-support-anon:${anonymousId ?? "unknown"}`;

export const isSupermemoryConfigured = () => Boolean(getApiKey());

const extractSnippet = (result: {
	memory?: string;
	chunk?: string;
	metadata?: { [key: string]: unknown } | null;
}) => {
	const content = result.memory ?? result.chunk ?? "";
	const title =
		(typeof result.metadata?.title === "string" && result.metadata.title) || "";
	const trimmed = content.trim();
	if (!trimmed) return "";
	if (!title) return trimmed;
	return `${title}\n${trimmed}`;
};

export const searchSupermemory = async ({
	query,
	containerTag,
	limit = 4,
}: {
	query: string;
	containerTag: string;
	limit?: number;
}) => {
	if (!query.trim()) return [] as string[];
	if (!containerTag.trim()) return [] as string[];

	const client = getClient();
	if (!client) return [] as string[];

	const response = await client.search.memories({
		q: query,
		containerTag,
		searchMode: "hybrid",
		limit,
	});

	return response.results
		.map(extractSnippet)
		.filter((value) => value.length > 0)
		.map((value) => value.slice(0, 1800));
};

export const storeConversationInSupermemory = async ({
	conversationId,
	containerTag,
	messages,
}: {
	conversationId: string;
	containerTag: string;
	messages: SupermemoryConversationMessage[];
}) => {
	if (!messages.length) return;

	const client = getClient();
	if (!client) return;

	await client.post("/v4/conversations", {
		body: { conversationId, containerTag, messages },
	});
};

export const syncCapKnowledgeBase = async (requestedByEmail: string) => {
	if (requestedByEmail !== MESSENGER_ADMIN_EMAIL) {
		throw new Error("Unauthorized");
	}

	const client = getClient();
	if (!client) {
		throw new Error("SUPERMEMORY_API_KEY is not configured");
	}

	const knowledgeTag = getKnowledgeTag();
	const sources = [
		"https://oiaai.clubemkt.digital",
		"https://oiaai.clubemkt.digital/download",
		"https://oiaai.clubemkt.digital/download/versions",
		"https://oiaai.clubemkt.digital/pricing",
		"https://oiaai.clubemkt.digital/features",
		"https://oiaai.clubemkt.digital/features/instant-mode",
		"https://oiaai.clubemkt.digital/features/studio-mode",
		"https://oiaai.clubemkt.digital/docs",
		"https://oiaai.clubemkt.digital/docs/commercial-license",
		"https://oiaai.clubemkt.digital/faq",
		"https://oiaai.clubemkt.digital/blog",
		"https://oiaai.clubemkt.digital/about",
		"https://oiaai.clubemkt.digital/self-hosting",
		"https://oiaai.clubemkt.digital/testimonials",
		"https://oiaai.clubemkt.digital/student-discount",
		"https://oiaai.clubemkt.digital/deactivate-license",
		"https://oiaai.clubemkt.digital/terms",
		"https://oiaai.clubemkt.digital/privacy",

		"https://oiaai.clubemkt.digital/screen-recorder",
		"https://oiaai.clubemkt.digital/free-screen-recorder",
		"https://oiaai.clubemkt.digital/screen-recorder-mac",
		"https://oiaai.clubemkt.digital/screen-recorder-windows",
		"https://oiaai.clubemkt.digital/screen-recording-software",
		"https://oiaai.clubemkt.digital/loom-alternative",

		"https://oiaai.clubemkt.digital/solutions/remote-team-collaboration",
		"https://oiaai.clubemkt.digital/solutions/employee-onboarding-platform",
		"https://oiaai.clubemkt.digital/solutions/daily-standup-software",
		"https://oiaai.clubemkt.digital/solutions/online-classroom-tools",
		"https://oiaai.clubemkt.digital/solutions/agencies",

		"https://oiaai.clubemkt.digital/tools",
		"https://oiaai.clubemkt.digital/tools/loom-downloader",
		"https://oiaai.clubemkt.digital/tools/video-speed-controller",
		"https://oiaai.clubemkt.digital/tools/trim",
		"https://oiaai.clubemkt.digital/tools/convert",
		"https://oiaai.clubemkt.digital/tools/convert/webm-to-mp4",
		"https://oiaai.clubemkt.digital/tools/convert/mov-to-mp4",
		"https://oiaai.clubemkt.digital/tools/convert/avi-to-mp4",
		"https://oiaai.clubemkt.digital/tools/convert/mkv-to-mp4",
		"https://oiaai.clubemkt.digital/tools/convert/mp4-to-gif",
		"https://oiaai.clubemkt.digital/tools/convert/mp4-to-mp3",
		"https://oiaai.clubemkt.digital/tools/convert/mp4-to-webm",

		"https://github.com/CapSoftware/Cap",
	];

	await client.documents.batchAdd({
		containerTag: knowledgeTag,
		documents: sources,
	});

	return { sources, knowledgeTag };
};
