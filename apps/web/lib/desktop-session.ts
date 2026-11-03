import { z } from "zod";

// The desktop app supplies `port` from its local sign-in callback server
// (tauri-plugin-oauth in 0.6.0, a `127.0.0.1:0` listener since), which is
// always a numeric loopback port. Constraining it to an integer port is what
// keeps the redirect target locked to 127.0.0.1: an unconstrained
// string such as `x@evil.example` would be parsed as a URL authority and would
// redirect the browser — with the session token / API key in the query string —
// to an attacker-controlled host.
export const desktopSessionRequestQuerySchema = z.object({
	port: z.coerce.number().int().min(1).max(65535).optional(),
	platform: z.union([z.literal("web"), z.literal("desktop")]).default("web"),
	type: z
		.union([z.literal("session"), z.literal("api_key")])
		.default("session"),
});

// Builds the desktop callback URL. The host is a fixed literal and only the
// `port`/`search` setters are used, so the target is provably loopback: a
// malformed port can only ever be dropped or truncated to digits, never promoted
// to a different host. This is the second line of defence behind the schema, so
// a future loosening of `port` validation cannot silently re-open the redirect.
export function buildLoopbackCallbackUrl(
	port: number,
	params: URLSearchParams,
) {
	const url = new URL("http://127.0.0.1");
	url.port = String(port);
	url.search = params.toString();
	return url.toString();
}

export function escapeHtmlAttribute(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

export function serializeStateForScript(value: unknown) {
	// Escape characters that could break out of an inline <script> (or split the
	// script via U+2028/U+2029) into their \uXXXX JSON form. `port` is validated
	// to be numeric, so these values are server-generated today; this keeps the
	// template from ever becoming an XSS sink if an upstream value changes.
	return (JSON.stringify(value) ?? "null").replace(
		/[<>&\u2028\u2029]/g,
		(ch) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`,
	);
}

export function createDesktopRedirectPage(
	primaryUrl: string,
	fallbackUrl: string,
) {
	const state = serializeStateForScript({ primaryUrl, fallbackUrl });
	const fallbackHref = escapeHtmlAttribute(fallbackUrl);

	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate" />
		<meta http-equiv="Pragma" content="no-cache" />
		<title>Opening Oiaai</title>
		<style>
			@font-face {
				font-family: "Neue Montreal";
				src: url("/fonts/NeueMontreal-Regular.woff2") format("woff2");
				font-weight: 400;
				font-display: swap;
			}

			@font-face {
				font-family: "Neue Montreal";
				src: url("/fonts/NeueMontreal-Medium.woff2") format("woff2");
				font-weight: 500;
				font-display: swap;
			}

			:root {
				--paper: #fbfaf7;
				--ink: #20242c;
				--ink-soft: #6b7079;
				--accent: #4785ff;
				--accent-soft: #adc9ff;
				--track: #dcdcd4;
				color-scheme: light;
			}

			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}

			body {
				margin: 0;
				min-height: 100vh;
				min-height: 100dvh;
				display: flex;
				flex-direction: column;
				background: var(--paper);
				color: var(--ink);
				font-family: "Neue Montreal", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
				-webkit-font-smoothing: antialiased;
			}

			header {
				display: flex;
				justify-content: center;
				padding: 32px 24px 0;
				animation: fade-up 0.5s ease both;
			}

			main {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 40px 24px 56px;
				text-align: center;
			}

			.doodle {
				width: 236px;
				height: auto;
				overflow: visible;
				animation: fade-up 0.5s ease 0.05s both;
			}

			.boil {
				filter: url(#boil);
			}

			.stroke,
			.accent,
			.accent-soft,
			.soft {
				fill: none;
				stroke-linecap: round;
				stroke-linejoin: round;
			}

			.stroke {
				stroke: var(--ink);
				stroke-width: 4.5;
			}

			.accent {
				stroke: var(--accent);
				stroke-width: 4.5;
			}

			.accent-soft {
				stroke: var(--accent-soft);
				stroke-width: 4.5;
			}

			.soft {
				stroke: var(--ink-soft);
				stroke-width: 2.5;
				stroke-dasharray: 2 4.2;
				animation: march 1.2s linear infinite;
			}

			.ink-fill {
				fill: var(--ink);
			}

			.draw {
				stroke-dasharray: 1;
				stroke-dashoffset: 1;
				animation: draw var(--t, 0.6s) ease var(--d, 0s) forwards;
			}

			.appear {
				opacity: 0;
				animation: fade-in 0.4s ease var(--d, 0s) forwards;
			}

			.mark {
				transform-box: fill-box;
				transform-origin: center;
				animation: pulse 1.6s ease-in-out 1.2s infinite;
			}

			h1 {
				margin: 28px 0 0;
				font-size: 28px;
				font-weight: 500;
				line-height: 1.15;
				letter-spacing: -0.015em;
				animation: fade-up 0.5s ease 0.1s both;
			}

			.lede {
				margin: 10px 0 0;
				max-width: 400px;
				font-size: 15.5px;
				line-height: 1.55;
				color: var(--ink-soft);
				animation: fade-up 0.5s ease 0.15s both;
			}

			.actions {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				gap: 10px;
				margin-top: 28px;
				animation: fade-up 0.5s ease 0.22s both;
			}

			.cta {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				min-height: 44px;
				padding: 0 24px;
				border: 1.5px solid var(--ink);
				border-radius: 999px;
				background: var(--ink);
				color: var(--paper);
				font: inherit;
				font-size: 14.5px;
				font-weight: 500;
				text-decoration: none;
				cursor: pointer;
				transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
			}

			.cta:hover {
				background: #353a45;
				border-color: #353a45;
			}

			.cta:active {
				transform: translateY(1px);
			}

			.cta:focus-visible {
				outline: 2px solid var(--accent);
				outline-offset: 3px;
			}

			.cta.ghost {
				background: transparent;
				border-color: var(--track);
				color: var(--ink);
			}

			.cta.ghost:hover {
				background: rgba(32, 36, 44, 0.04);
				border-color: var(--ink-soft);
			}

			.status {
				display: flex;
				align-items: center;
				gap: 10px;
				margin: 22px 0 0;
				font-size: 13.5px;
				color: var(--ink-soft);
				animation: fade-up 0.5s ease 0.3s both;
			}

			.status svg {
				width: 44px;
				height: 12px;
				overflow: visible;
			}

			footer {
				padding: 0 24px 32px;
				text-align: center;
				font-size: 13px;
				color: var(--ink-soft);
				animation: fade-up 0.5s ease 0.35s both;
			}

			footer a {
				color: var(--ink);
				text-decoration: underline;
				text-decoration-color: var(--track);
				text-decoration-thickness: 1.5px;
				text-underline-offset: 3px;
			}

			footer a:hover {
				text-decoration-color: var(--ink);
			}

			@keyframes draw {
				to {
					stroke-dashoffset: 0;
				}
			}

			@keyframes fade-in {
				to {
					opacity: 1;
				}
			}

			@keyframes fade-up {
				from {
					opacity: 0;
					transform: translateY(10px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			@keyframes march {
				to {
					stroke-dashoffset: -6.2;
				}
			}

			@keyframes pulse {
				0%,
				100% {
					transform: scale(1);
				}
				50% {
					transform: scale(1.08);
				}
			}

			@media (prefers-reduced-motion: reduce) {
				.boil {
					filter: none;
				}

				header,
				.doodle,
				h1,
				.lede,
				.actions,
				.status,
				footer,
				.draw,
				.appear {
					animation-duration: 0.01ms;
					animation-delay: 0s;
				}

				.soft,
				.mark {
					animation: none;
				}
			}
		</style>
	</head>
	<body>
		<header>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 118 40" height="28" role="img" aria-label="Oiaai">
				<path fill="#4785FF" d="M20 36c8.837 0 16-7.163 16-16S28.837 4 20 4 4 11.164 4 20s7.164 16 16 16" />
				<path fill="#ADC9FF" d="M20 33c7.18 0 13-5.82 13-13S27.18 7 20 7 7 12.82 7 20s5.82 13 13 13" />
				<path fill="#fff" d="M20 30c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10" />
				<path fill="#20242c" d="M59.606 30.448C65.864 30.448 69.452 26.054 69.452 20.046C69.452 14.066 65.864 9.672 59.606 9.672C53.292 9.672 49.76 14.066 49.76 20.046C49.76 26.054 53.292 30.448 59.606 30.448ZM59.606 26.36C55.962 26.36 54.767 23.523 54.767 20.046C54.767 16.597 55.962 13.76 59.606 13.76C63.222 13.76 64.445 16.597 64.445 20.046C64.445 23.523 63.222 26.36 59.606 26.36ZM73.318 14.066C74.569 14.066 75.543 13.399 75.543 12.092C75.543 10.812 74.569 10.117 73.318 10.117C72.066 10.117 71.093 10.812 71.093 12.092C71.093 13.399 72.066 14.066 73.318 14.066ZM71.093 15.763V30.003H75.543V15.763ZM86.111 19.712C86.111 20.908 84.303 21.186 82.468 21.548C79.13 22.215 77.044 23.523 77.044 26.36C77.044 28.751 78.713 30.448 81.717 30.448C83.608 30.448 85.277 29.558 86.195 28.501H86.25C86.25 29.502 86.807 30.448 88.809 30.448C89.699 30.448 90.506 30.337 91.396 30.003V28.946C90.839 28.946 90.561 28.64 90.561 27.889V21.353C90.561 16.875 88.336 15.318 84.331 15.318C79.687 15.318 77.74 17.626 77.601 20.352H81.773C81.912 18.989 82.69 18.377 84.303 18.377C85.527 18.377 86.111 18.878 86.111 19.712ZM83.274 27.389C82.19 27.389 81.494 26.888 81.494 25.72C81.494 24.83 82.078 24.107 83.831 23.717C84.86 23.495 85.555 23.3 86.111 23.078V24.802C86.111 26.165 85.193 27.389 83.274 27.389ZM101.492 19.712C101.492 20.908 99.684 21.186 97.848 21.548C94.511 22.215 92.425 23.523 92.425 26.36C92.425 28.751 94.094 30.448 97.097 30.448C98.989 30.448 100.657 29.558 101.575 28.501H101.631C101.631 29.502 102.187 30.448 104.189 30.448C105.079 30.448 105.886 30.337 106.776 30.003V28.946C106.22 28.946 105.942 28.64 105.942 27.889V21.353C105.942 16.875 103.717 15.318 99.712 15.318C95.067 15.318 93.12 17.626 92.981 20.352H97.153C97.292 18.989 98.071 18.377 99.684 18.377C100.908 18.377 101.492 18.878 101.492 19.712ZM98.655 27.389C97.57 27.389 96.875 26.888 96.875 25.72C96.875 24.83 97.459 24.107 99.211 23.717C100.24 23.495 100.935 23.3 101.492 23.078V24.802C101.492 26.165 100.574 27.389 98.655 27.389ZM110.698 14.066C111.949 14.066 112.923 13.399 112.923 12.092C112.923 10.812 111.949 10.117 110.698 10.117C109.446 10.117 108.473 10.812 108.473 12.092C108.473 13.399 109.446 14.066 110.698 14.066ZM108.473 15.763V30.003H112.923V15.763Z" />
			</svg>
		</header>
		<main>
			<svg class="doodle" viewBox="0 0 200 104" aria-hidden="true">
				<defs>
					<filter id="boil" x="-15%" y="-15%" width="130%" height="130%">
						<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="1" result="noise">
							<animate attributeName="seed" values="1;3;5;7" dur="0.6s" repeatCount="indefinite" calcMode="discrete" />
						</feTurbulence>
						<feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
					</filter>
				</defs>
				<g class="boil">
					<path class="stroke draw" style="--d: 0.1s; --t: 0.7s" pathLength="1" d="M 18 30 L 62 30 Q 70 30 70 38 L 70 80 Q 70 88 62 88 L 18 88 Q 10 88 10 80 L 10 38 Q 10 30 18 30 Z" />
					<path class="stroke draw" style="--d: 0.55s; --t: 0.3s" pathLength="1" d="M 10 43 L 70 43" />
					<circle class="ink-fill appear" style="--d: 0.75s" cx="18" cy="36.5" r="1.8" />
					<circle class="ink-fill appear" style="--d: 0.8s" cx="25" cy="36.5" r="1.8" />
					<path class="accent draw" style="--d: 0.8s; --t: 0.35s" pathLength="1" d="M 28 66 L 36 73 L 52 56" />
					<path class="soft" d="M 82 50 Q 110 18 140 46" />
					<path class="stroke draw" style="--d: 1s; --t: 0.25s" pathLength="1" d="M 129 46 L 141 47 L 139 35" />
					<g class="mark">
						<circle class="accent draw" style="--d: 0.35s; --t: 0.6s" pathLength="1" cx="170" cy="60" r="22" />
						<circle class="accent-soft draw" style="--d: 0.75s; --t: 0.45s" pathLength="1" cx="170" cy="60" r="12" />
					</g>
				</g>
			</svg>
			<h1>Opening Oiaai</h1>
			<p class="lede">You're signed in. Oiaai should open in a moment and pick up right where you left off.</p>
			<div class="actions">
				<button id="open-cap" class="cta" type="button">Open Oiaai</button>
				<a id="browser-fallback" class="cta ghost" href="${fallbackHref}">Finish in browser</a>
			</div>
			<p class="status">
				<svg viewBox="0 0 44 12" aria-hidden="true"><path class="soft" d="M 2 6 q 3 -4 6 0 t 6 0 t 6 0 t 6 0 t 6 0 t 6 0 t 6 0" /></svg>
				<span id="status" role="status">Waiting for Oiaai to open</span>
			</p>
		</main>
		<footer>Don't have the app yet? <a href="/download">Download Oiaai</a></footer>
		<script>
			const { primaryUrl, fallbackUrl } = ${state};
			const status = document.getElementById("status");
			const openCapButton = document.getElementById("open-cap");
			const fallbackLink = document.getElementById("browser-fallback");
			let fallbackStarted = false;

			const startFallback = () => {
				if (fallbackStarted) return;
				fallbackStarted = true;
				status.textContent = "Finishing sign-in in your browser";
				window.location.replace(fallbackUrl);
			};

			const openCap = () => {
				status.textContent = "Waiting for Oiaai to open";
				window.location.href = primaryUrl;
			};

			openCapButton.addEventListener("click", openCap);
			fallbackLink.addEventListener("click", () => {
				fallbackStarted = true;
			});

			openCap();
			window.setTimeout(startFallback, 1800);
		</script>
	</body>
</html>`;
}
