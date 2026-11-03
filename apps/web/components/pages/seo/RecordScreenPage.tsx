import { Clapperboard, Zap } from "lucide-react";
import { PRICING } from "@/data/pricing";
import { SeoPageTemplate } from "../../seo/SeoPageTemplate";
import type { SeoPageContent } from "../../seo/types";

export const recordScreenContent: SeoPageContent = {
	title: "Record Screen — Capture Your Screen Instantly and Share with a Link",
	description:
		"Oiaai makes it easy to record your screen on Mac or Windows. Capture in HD with audio and webcam, then share with a link in seconds. Free, open-source, no watermarks.",

	featuresTitle: "Everything You Need to Record Your Screen Professionally",
	featuresDescription:
		"Oiaai gives you a complete screen recording workflow — from one-click capture to instant sharing — without the complexity",

	features: [
		{
			title: "One-Click Screen Recording",
			description:
				"Record your screen in seconds. Launch Oiaai, select your recording region, and hit record — no complicated setup, no configuration. Stop recording and your shareable link is ready immediately.",
		},
		{
			title: "HD Recording Up to 4K at 60fps",
			description:
				"Capture your screen in crystal-clear HD at up to 4K resolution and 60fps. Every detail, every animation, and every click is reproduced with perfect clarity for tutorials, demos, and reports.",
		},
		{
			title: "Record Screen and Webcam Together",
			description:
				"Add your face to your screen recording with a picture-in-picture webcam overlay. Perfect for product walkthroughs, course lessons, and video messages where personal presence matters.",
		},
		{
			title: "Capture System Audio and Microphone",
			description:
				"Record both system audio and your microphone simultaneously. Narrate as you go or capture existing audio from apps and browsers — Oiaai handles both audio tracks cleanly and in sync.",
		},
		{
			title: "Instant Shareable Link",
			description:
				"The moment you stop recording, Oiaai generates a shareable link. No uploading, no waiting — paste the link anywhere and viewers get instant access to your screen recording.",
		},
		{
			title: "Free with Zero Watermarks",
			description:
				"Oiaai's Studio Mode lets you record your screen for free with no watermarks, no time limits, and no hidden fees. <a href='/free-screen-recorder'>Download Oiaai's free screen recorder</a> and start recording today.",
		},
		{
			title: "AI-Powered Captions",
			description:
				"Automatically generate accurate captions from your screen recording. Make recordings accessible, searchable, and easier to follow — no manual transcription needed.",
		},
		{
			title: "Thread Comments on Recordings",
			description:
				"Viewers can leave timestamped comments directly on your screen recording. Collect precise, structured feedback without back-and-forth email threads or follow-up calls.",
		},
	],

	recordingModes: {
		title: "Two Ways to Record Your Screen with Oiaai",
		description:
			"Whether you need a quick share or a polished production, Oiaai has a recording mode for you",
		modes: [
			{
				icon: <Zap fill="yellow" className="mb-4 size-8" strokeWidth={1.5} />,
				title: "Instant Mode",
				description:
					"Record your screen and share instantly with a link. The fastest way to capture async updates, bug reports, and quick demos. Free plan includes recordings up to 5 minutes with built-in thread commenting.",
			},
			{
				icon: (
					<Clapperboard
						fill="var(--blue-9)"
						className="mb-4 size-8"
						strokeWidth={1.5}
					/>
				),
				title: "Studio Mode",
				description:
					"Record your screen at full quality up to 4K, completely free for personal use with no time limits. Saves separate screen and webcam tracks for full post-production editing control.",
			},
		],
	},

	comparisonTable: {
		title: "Screen Recording Software Compared",
		headers: ["Feature", "Oiaai", "Loom", "OBS Studio", "Windows Game Bar"],
		rows: [
			[
				"Free to record",
				{ text: "Yes", status: "positive" },
				{ text: "Limited", status: "warning" },
				{ text: "Yes", status: "positive" },
				{ text: "Yes", status: "positive" },
			],
			[
				"No watermark",
				{ text: "Yes", status: "positive" },
				{ text: "Free plan adds watermark", status: "negative" },
				{ text: "Yes", status: "positive" },
				{ text: "Yes", status: "positive" },
			],
			[
				"Instant share link",
				{ text: "Yes", status: "positive" },
				{ text: "Yes", status: "positive" },
				{ text: "No", status: "negative" },
				{ text: "No", status: "negative" },
			],
			[
				"Webcam overlay",
				{ text: "Yes", status: "positive" },
				{ text: "Yes", status: "positive" },
				{ text: "Yes", status: "positive" },
				{ text: "No", status: "negative" },
			],
			[
				"System audio",
				{ text: "Yes", status: "positive" },
				{ text: "Yes", status: "positive" },
				{ text: "Yes", status: "positive" },
				{ text: "Limited", status: "warning" },
			],
			[
				"4K recording",
				{ text: "Yes", status: "positive" },
				{ text: "No", status: "negative" },
				{ text: "Yes", status: "positive" },
				{ text: "No", status: "negative" },
			],
			[
				"Open source",
				{ text: "Yes", status: "positive" },
				{ text: "No", status: "negative" },
				{ text: "Yes", status: "positive" },
				{ text: "No", status: "negative" },
			],
		],
	},

	comparisonTitle: "How Oiaai Compares for Recording Your Screen",
	comparisonDescription:
		"Oiaai is built for the full screen recording workflow — from capture to sharing — without setup overhead",

	comparison: [
		{
			title: "Oiaai vs Loom",
			description: `Both Oiaai and Loom let you record your screen and share with a link, but Oiaai is significantly more affordable — starting at $${PRICING.pro.annualPerMonth}/month versus Loom's $18/month. Oiaai's Studio Mode is completely free for personal use with no watermarks, and Oiaai is fully open-source. <a href='/loom-alternative'>See the full Oiaai vs Loom comparison</a>.`,
		},
		{
			title: "Oiaai vs OBS Studio",
			description:
				"OBS is a powerful free tool but is designed primarily for live streaming and requires significant configuration to simply record your screen. Oiaai is purpose-built for screen recording and instant sharing — start recording in under 60 seconds with zero setup.",
		},
		{
			title: "Oiaai vs macOS Built-in Recorder",
			description:
				"macOS Cmd+Shift+5 lets you record your screen but doesn't capture system audio, lacks webcam overlay, and provides no sharing features. Oiaai adds all of this natively. <a href='/screen-recorder-mac'>Learn more about screen recording on Mac</a>.",
		},
		{
			title: "Oiaai vs Windows Game Bar",
			description:
				"Windows Game Bar only records the active window and cannot capture your full desktop. Oiaai records any region, any window, or your entire screen with full audio. <a href='/screen-recorder-windows'>Learn more about screen recording on Windows</a>.",
		},
	],

	useCasesTitle: "Why People Use Oiaai to Record Their Screen",
	useCasesDescription:
		"From quick async updates to polished tutorials — Oiaai fits every screen recording workflow",

	useCases: [
		{
			title: "Async Team Updates",
			description:
				"Skip recurring status meetings by recording your screen and sharing a link in Slack or email. Your team watches on their own schedule, and timestamped comments keep the feedback structured.",
		},
		{
			title: "Software Tutorials and Documentation",
			description:
				"Create step-by-step screen recordings that walk users through your product or workflow. HD quality and instant links make documentation fast to produce and easy to share.",
		},
		{
			title: "Bug Reports and QA",
			description:
				"Record your screen to capture exactly what went wrong and send the link to your engineering team. A screen recording communicates a bug faster and more clearly than any written description.",
		},
		{
			title: "Client Demos and Presentations",
			description:
				"Record polished product walkthroughs for clients without scheduling a live call. Share instantly and collect feedback through Oiaai's built-in thread commenting.",
		},
		{
			title: "Employee Training and Onboarding",
			description:
				"Build a searchable library of screen recording training videos that new hires can watch at their own pace. AI-powered captions make every recording accessible and easy to find.",
		},
		{
			title: "Educational Content and Lectures",
			description:
				"Educators use Oiaai to record their screen for lecture walkthroughs, coding tutorials, and course content. <a href='/solutions/online-classroom-tools'>Learn how Oiaai supports online teaching</a>.",
		},
	],

	faqsTitle: "Frequently Asked Questions About Recording Your Screen",
	faqs: [
		{
			question: "How do I record my screen?",
			answer:
				"With Oiaai, recording your screen takes under a minute. Download Oiaai for Mac or Windows, launch the app, select your recording region (full screen, a specific window, or a custom area), and click Record. When you stop, Oiaai instantly generates a shareable link. No uploading, no waiting — your screen recording is live and ready to share.",
		},
		{
			question: "Is it free to record your screen with Oiaai?",
			answer:
				"Yes. Oiaai's Studio Mode is completely free for personal use with unlimited recording time, no watermarks, and no time limits. Instant Mode on the free plan supports recordings up to 5 minutes with instant shareable links and thread commenting. <a href='/free-screen-recorder'>Download Oiaai's free screen recorder</a> to get started.",
		},
		{
			question: "Can I record my screen and webcam at the same time?",
			answer:
				"Yes. Oiaai records your screen and webcam simultaneously with a picture-in-picture overlay. In Studio Mode, the screen and webcam are saved as separate video tracks, giving you full editing flexibility in post-production.",
		},
		{
			question: "Does recording your screen capture audio?",
			answer:
				"Oiaai captures both system audio and microphone input simultaneously when you record your screen. You can narrate as you go while system sounds play through, or record microphone-only for clean voiceovers. Both audio tracks are synced automatically.",
		},
		{
			question: "How do I record my screen on Mac?",
			answer:
				"Download Oiaai for macOS and click the Oiaai icon in your menu bar to start recording your screen. Choose your region and hit Record. Alternatively, macOS has a built-in screen recorder accessible with Cmd+Shift+5, but it lacks system audio and instant sharing. <a href='/screen-recorder-mac'>Learn more about screen recording on Mac</a>.",
		},
		{
			question: "How do I record my screen on Windows?",
			answer:
				"Download Oiaai for Windows and launch it from the system tray. Select your recording region and click Record. Windows also has Xbox Game Bar (Win+G) but it only captures the active window. Oiaai records any region of your screen with full audio support. <a href='/screen-recorder-windows'>Learn more about screen recording on Windows</a>.",
		},
		{
			question: "Is there a time limit when recording your screen with Oiaai?",
			answer:
				"Studio Mode in Oiaai has no time limit on screen recordings — record as long as you need completely free. Instant Mode on the free plan supports recordings up to 5 minutes. Upgrading to Oiaai Pro removes this limit for Instant Mode as well.",
		},
		{
			question: "How do I share a screen recording?",
			answer:
				"Oiaai automatically generates a shareable link the moment you stop recording. Copy the link and paste it anywhere — Slack, email, Notion, Jira, or any chat tool. Viewers get instant access to your screen recording without downloading any software.",
		},
	],

	video: {
		iframe: {
			src: "https://www.rend.so/embed/10512af0-b922-4efa-8974-f8f14fc1886a?accent=3e63dd",
			title:
				"Oiaai screen recording demo showing one-click capture, webcam overlay, and instant sharing",
		},
	},

	cta: {
		title: "Record Your Screen for Free with Oiaai",
		buttonText: "Download Oiaai Free",
		secondaryButtonText: "Try Instant Mode in Browser",
	},
};

export const RecordScreenPage = () => {
	return <SeoPageTemplate content={recordScreenContent} />;
};
