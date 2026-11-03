import type { CSSProperties, ReactNode } from "react";
import {
	CAP_ICON_DATA_URI,
	CAP_WORDMARK_ASPECT,
	CAP_WORDMARK_DATA_URI,
	CAP_WORDMARK_GAP,
} from "@/lib/og/cap-logo";
import { OG_MONO, OG_SANS, OG_SERIF } from "@/lib/og/fonts";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const OG_BLUE = "#4785FF";
export const OG_BLUE_LIGHT = "#ADC9FF";
export const OG_INK = "#111111";
export const OG_INK_SOFT = "rgba(17,17,17,0.74)";
export const OG_INK_MUTED = "rgba(17,17,17,0.5)";

// Light-mode UI palette approximating the desktop app's gray scale.
const UI = {
	windowBg: "#FCFCFC",
	rowBg: "#F9FAFB",
	border: "#E2E4E8",
	text: "#1F2329",
	textDim: "#64686F",
	icon: "#8A8F98",
	blueBorder: "#7DA8F5",
	blueBg: "#EDF4FF",
	blueText: "#2F62D4",
	blueIcon: "#3672E8",
	pillBg: "#F1F2F4",
	pillBorder: "#E2E4E8",
};

const flex = (extra: CSSProperties = {}): CSSProperties => ({
	display: "flex",
	...extra,
});

export const OgCanvas = ({
	background,
	children,
}: {
	background: string;
	children: ReactNode;
}) => (
	<div
		style={flex({
			width: "100%",
			height: "100%",
			position: "relative",
			fontFamily: OG_SANS,
			color: OG_INK,
			background: "#EDF1F6",
		})}
	>
		<div
			style={flex({
				position: "absolute",
				top: 0,
				left: 0,
				width: OG_WIDTH,
				height: OG_HEIGHT,
				backgroundImage: `url(${background})`,
				backgroundSize: `${OG_WIDTH}px ${OG_HEIGHT}px`,
			})}
		/>
		{children}
	</div>
);

export const Headline = ({
	children,
	size,
	lines = 3,
}: {
	children: string;
	size: number;
	lines?: number;
}) => (
	<span
		style={{
			display: "block",
			fontSize: size,
			fontWeight: 400,
			lineHeight: 1.02,
			letterSpacing: -size * 0.03,
			color: OG_INK,
			lineClamp: lines,
		}}
	>
		{children}
	</span>
);

export const Body = ({
	children,
	size = 27,
	lines = 2,
}: {
	children: string;
	size?: number;
	lines?: number;
}) => (
	<span
		style={{
			display: "block",
			fontFamily: OG_SERIF,
			fontSize: size,
			fontWeight: 300,
			lineHeight: 1.38,
			letterSpacing: -size * 0.01,
			color: OG_INK_SOFT,
			lineClamp: lines,
		}}
	>
		{children}
	</span>
);

export const MeshFrame = ({
	mesh,
	width,
	height,
	padding = 12,
	radius = 28,
	children,
}: {
	mesh: string;
	width: number;
	height: number;
	padding?: number;
	radius?: number;
	children: ReactNode;
}) => (
	<div
		style={flex({
			position: "relative",
			width,
			height,
			padding,
			borderRadius: radius,
			overflow: "hidden",
			boxShadow:
				"0 40px 80px -24px rgba(40,72,130,0.35), 0 0 0 1px rgba(255,255,255,0.55)",
		})}
	>
		<div
			style={flex({
				position: "absolute",
				top: 0,
				left: 0,
				width,
				height,
				backgroundImage: `url(${mesh})`,
				backgroundSize: `${width}px ${height}px`,
			})}
		/>
		{children}
	</div>
);

// Exact mark geometry from packages/ui LogoBadge/Logo (viewBox 0 0 40 40):
// concentric circles at (20,20), r 16 / 13 / 10. Returned as an array —
// satori drops React fragments nested inside <svg>.
const logoMark = () => [
	<circle key="o" cx="20" cy="20" r="16" fill={OG_BLUE} />,
	<circle key="m" cx="20" cy="20" r="13" fill={OG_BLUE_LIGHT} />,
	<circle key="i" cx="20" cy="20" r="10" fill="white" />,
];

// The drawn "Cap" wordmark path from packages/ui Logo.tsx (viewBox 0 0 120 40).
const WORDMARK_PATH =
	"M59.606 30.448C65.864 30.448 69.452 26.054 69.452 20.046C69.452 14.066 65.864 9.672 59.606 9.672C53.292 9.672 49.76 14.066 49.76 20.046C49.76 26.054 53.292 30.448 59.606 30.448ZM59.606 26.36C55.962 26.36 54.767 23.523 54.767 20.046C54.767 16.597 55.962 13.76 59.606 13.76C63.222 13.76 64.445 16.597 64.445 20.046C64.445 23.523 63.222 26.36 59.606 26.36ZM73.318 14.066C74.569 14.066 75.543 13.399 75.543 12.092C75.543 10.812 74.569 10.117 73.318 10.117C72.066 10.117 71.093 10.812 71.093 12.092C71.093 13.399 72.066 14.066 73.318 14.066ZM71.093 15.763V30.003H75.543V15.763ZM86.111 19.712C86.111 20.908 84.303 21.186 82.468 21.548C79.13 22.215 77.044 23.523 77.044 26.36C77.044 28.751 78.713 30.448 81.717 30.448C83.608 30.448 85.277 29.558 86.195 28.501H86.25C86.25 29.502 86.807 30.448 88.809 30.448C89.699 30.448 90.506 30.337 91.396 30.003V28.946C90.839 28.946 90.561 28.64 90.561 27.889V21.353C90.561 16.875 88.336 15.318 84.331 15.318C79.687 15.318 77.74 17.626 77.601 20.352H81.773C81.912 18.989 82.69 18.377 84.303 18.377C85.527 18.377 86.111 18.878 86.111 19.712ZM83.274 27.389C82.19 27.389 81.494 26.888 81.494 25.72C81.494 24.83 82.078 24.107 83.831 23.717C84.86 23.495 85.555 23.3 86.111 23.078V24.802C86.111 26.165 85.193 27.389 83.274 27.389ZM101.492 19.712C101.492 20.908 99.684 21.186 97.848 21.548C94.511 22.215 92.425 23.523 92.425 26.36C92.425 28.751 94.094 30.448 97.097 30.448C98.989 30.448 100.657 29.558 101.575 28.501H101.631C101.631 29.502 102.187 30.448 104.189 30.448C105.079 30.448 105.886 30.337 106.776 30.003V28.946C106.22 28.946 105.942 28.64 105.942 27.889V21.353C105.942 16.875 103.717 15.318 99.712 15.318C95.067 15.318 93.12 17.626 92.981 20.352H97.153C97.292 18.989 98.071 18.377 99.684 18.377C100.908 18.377 101.492 18.878 101.492 19.712ZM98.655 27.389C97.57 27.389 96.875 26.888 96.875 25.72C96.875 24.83 97.459 24.107 99.211 23.717C100.24 23.495 100.935 23.3 101.492 23.078V24.802C101.492 26.165 100.574 27.389 98.655 27.389ZM110.698 14.066C111.949 14.066 112.923 13.399 112.923 12.092C112.923 10.812 111.949 10.117 110.698 10.117C109.446 10.117 108.473 10.812 108.473 12.092C108.473 13.399 109.446 14.066 110.698 14.066ZM108.473 15.763V30.003H112.923V15.763Z";

export const CapAppIcon = ({ size }: { size: number }) => (
	<div
		style={flex({
			width: size,
			height: size,
			borderRadius: Math.round(size * 0.2),
			boxShadow: "0 4px 14px rgba(23,58,128,0.18)",
			backgroundImage: `url(${CAP_ICON_DATA_URI})`,
			backgroundSize: `${size}px ${size}px`,
		})}
	/>
);

export const CapWordmark = ({ height = 52 }: { height?: number }) => {
	const width = Math.round(height * CAP_WORDMARK_ASPECT);
	return (
		<div
			style={flex({
				alignItems: "center",
				gap: Math.round(height * CAP_WORDMARK_GAP),
			})}
		>
			<CapAppIcon size={height} />
			<div
				style={flex({
					width,
					height,
					backgroundImage: `url(${CAP_WORDMARK_DATA_URI})`,
					backgroundSize: `${width}px ${height}px`,
				})}
			/>
		</div>
	);
};

/** The in-app logo — bare mark + wordmark, as the main window renders it. */
const CapFullLogo = ({ height, color }: { height: number; color: string }) => (
	<svg
		role="img"
		aria-label="Oiaai"
		width={Math.round((height * 118) / 40)}
		height={height}
		viewBox="0 0 118 40"
	>
		{logoMark()}
		<path fill={color} d={WORDMARK_PATH} />
	</svg>
);

const Stroke = {
	fill: "none",
	strokeWidth: 2,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
};

const MonitorIcon = ({ size, color }: { size: number; color: string }) => (
	<svg
		role="img"
		aria-label="Display"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<rect
			x="2"
			y="3"
			width="20"
			height="14"
			rx="2"
			{...Stroke}
			stroke={color}
		/>
		<path d="M8 21h8M12 17v4" {...Stroke} stroke={color} />
	</svg>
);

const AppWindowIcon = ({ size, color }: { size: number; color: string }) => (
	<svg
		role="img"
		aria-label="Window"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<rect
			x="2"
			y="4"
			width="20"
			height="16"
			rx="2"
			{...Stroke}
			stroke={color}
		/>
		<path d="M2 9h20" {...Stroke} stroke={color} />
		<path d="M5 6.5h.01M8 6.5h.01" {...Stroke} stroke={color} />
	</svg>
);

const AreaIcon = ({ size, color }: { size: number; color: string }) => (
	<svg
		role="img"
		aria-label="Area"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<path d="M3 8V5a2 2 0 0 1 2-2h3" {...Stroke} stroke={color} />
		<path d="M16 3h3a2 2 0 0 1 2 2v3" {...Stroke} stroke={color} />
		<path d="M21 16v3a2 2 0 0 1-2 2h-3" {...Stroke} stroke={color} />
		<path d="M8 21H5a2 2 0 0 1-2-2v-3" {...Stroke} stroke={color} />
		<rect x="8" y="8" width="8" height="8" rx="1" {...Stroke} stroke={color} />
	</svg>
);

const VideoIcon = ({ size, color }: { size: number; color: string }) => (
	<svg
		role="img"
		aria-label="Camera"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<path
			d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"
			{...Stroke}
			stroke={color}
		/>
		<rect
			x="2"
			y="6"
			width="14"
			height="12"
			rx="2"
			{...Stroke}
			stroke={color}
		/>
	</svg>
);

const MicIcon = ({ size, color }: { size: number; color: string }) => (
	<svg
		role="img"
		aria-label="Microphone"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<path
			d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"
			{...Stroke}
			stroke={color}
		/>
		<path d="M19 10v2a7 7 0 0 1-14 0v-2" {...Stroke} stroke={color} />
		<path d="M12 19v3" {...Stroke} stroke={color} />
	</svg>
);

const ChevronDown = ({ size, color }: { size: number; color: string }) => (
	<svg
		role="img"
		aria-label="Open"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<path d="m6 9 6 6 6-6" {...Stroke} stroke={color} />
	</svg>
);

const GearIcon = ({ size, color }: { size: number; color: string }) => (
	<svg
		role="img"
		aria-label="Settings"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<circle cx="12" cy="12" r="3" {...Stroke} stroke={color} />
		<path
			d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
			{...Stroke}
			stroke={color}
		/>
	</svg>
);

const ImageIcon = ({ size, color }: { size: number; color: string }) => (
	<svg
		role="img"
		aria-label="Screenshots"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<rect
			x="3"
			y="3"
			width="18"
			height="18"
			rx="2"
			{...Stroke}
			stroke={color}
		/>
		<circle cx="9" cy="9" r="2" {...Stroke} stroke={color} />
		<path
			d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
			{...Stroke}
			stroke={color}
		/>
	</svg>
);

const SquarePlayIcon = ({ size, color }: { size: number; color: string }) => (
	<svg
		role="img"
		aria-label="Recordings"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<rect
			x="3"
			y="3"
			width="18"
			height="18"
			rx="2"
			{...Stroke}
			stroke={color}
		/>
		<path d="m10 8 5 4-5 4Z" {...Stroke} stroke={color} />
	</svg>
);

const Maximize2Icon = ({ size, color }: { size: number; color: string }) => (
	<svg
		role="img"
		aria-label="Expand"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<path
			d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
			{...Stroke}
			stroke={color}
		/>
	</svg>
);

/** Lightning bolt from the app's Instant-mode icon. */
const InstantBolt = ({ height, color }: { height: number; color: string }) => (
	<svg
		role="img"
		aria-label="Instant mode"
		width={Math.round((height * 152) / 223)}
		height={height}
		viewBox="0 0 152 223"
	>
		<path
			fill={color}
			d="M150.167 109.163L53.4283 220.65C52.4032 221.826 51.05 222.613 49.573 222.89C48.0959 223.167 46.5752 222.919 45.2403 222.185C43.9054 221.451 42.8287 220.27 42.1727 218.82C41.5167 217.369 41.317 215.729 41.6038 214.146L54.2661 146.019L4.48901 125.914C3.41998 125.484 2.46665 124.776 1.7142 123.853C0.961745 122.93 0.433602 121.82 0.176954 120.624C-0.0796948 119.428 -0.0568536 118.182 0.243435 116.997C0.543723 115.813 1.1121 114.727 1.8978 113.837L98.6363 2.35043C99.6614 1.17365 101.015 0.387451 102.492 0.110461C103.969 -0.166529 105.489 0.080724 106.824 0.814909C108.159 1.54909 109.236 2.73037 109.892 4.18049C110.548 5.63061 110.748 7.27088 110.461 8.85379L97.7639 77.0554L147.541 97.1322C148.602 97.5652 149.548 98.2727 150.294 99.1922C151.041 100.112 151.566 101.215 151.822 102.404C152.078 103.593 152.058 104.832 151.763 106.011C151.468 107.19 150.908 108.273 150.132 109.163H150.167Z"
		/>
	</svg>
);

const FilmIcon = ({ size, color }: { size: number; color: string }) => (
	<svg
		role="img"
		aria-label="Studio mode"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<rect
			x="3"
			y="3"
			width="18"
			height="18"
			rx="2"
			{...Stroke}
			stroke={color}
		/>
		<path
			d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4"
			{...Stroke}
			stroke={color}
		/>
	</svg>
);

const ScreenshotModeIcon = ({
	size,
	color,
}: {
	size: number;
	color: string;
}) => (
	<svg
		role="img"
		aria-label="Screenshot mode"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<path
			fill={color}
			d="M21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM20 14l-3-3-5 5-2-2-6 6V4h16ZM6 8.5A2.5 2.5 0 1 1 8.5 11 2.5 2.5 0 0 1 6 8.5Z"
		/>
	</svg>
);

const TrafficLights = () => (
	<div style={flex({ gap: 9, alignItems: "center" })}>
		<div
			style={flex({
				width: 13,
				height: 13,
				borderRadius: 9999,
				background: "#FF5F57",
			})}
		/>
		<div
			style={flex({
				width: 13,
				height: 13,
				borderRadius: 9999,
				background: "#FEBC2E",
			})}
		/>
		<div
			style={flex({
				width: 13,
				height: 13,
				borderRadius: 9999,
				background: "#28C840",
			})}
		/>
	</div>
);

const ModeSwitcher = () => (
	<div
		style={flex({
			position: "relative",
			alignItems: "center",
			gap: 9,
			padding: 7,
			borderRadius: 999,
			border: `1px solid ${UI.pillBorder}`,
			background: UI.pillBg,
		})}
	>
		<div
			style={flex({
				position: "absolute",
				left: -6,
				top: -8,
				width: 15,
				height: 15,
				borderRadius: 9999,
				background: "#E0E2E5",
				alignItems: "center",
				justifyContent: "center",
				fontSize: 9,
				fontWeight: 700,
				color: UI.textDim,
			})}
		>
			i
		</div>
		{/* Instant — selected: disc with blue ring */}
		<div
			style={flex({
				width: 34,
				height: 34,
				borderRadius: 9999,
				border: `2px solid ${OG_BLUE}`,
				background: "#CDCFD3",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<InstantBolt height={16} color="#1F2329" />
		</div>
		<div
			style={flex({
				width: 34,
				height: 34,
				borderRadius: 9999,
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<FilmIcon size={16} color="#1F2329" />
		</div>
		<div
			style={flex({
				width: 34,
				height: 34,
				borderRadius: 9999,
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<ScreenshotModeIcon size={15} color="#1F2329" />
		</div>
	</div>
);

const TargetSplitButton = ({
	icon,
	label,
	selected,
}: {
	icon: ReactNode;
	label: string;
	selected?: boolean;
}) => (
	<div
		style={flex({
			flexGrow: 1,
			flexBasis: 0,
			borderRadius: 10,
			border: `1px solid ${selected ? UI.blueBorder : UI.border}`,
			background: selected ? UI.blueBg : UI.rowBg,
			overflow: "hidden",
		})}
	>
		<div
			style={flex({
				flexGrow: 1,
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: 5,
				padding: "10px 0 9px",
			})}
		>
			{icon}
			<span
				style={{
					fontSize: 14,
					fontWeight: 500,
					color: selected ? UI.blueText : UI.text,
				}}
			>
				{label}
			</span>
		</div>
		<div
			style={flex({
				width: 30,
				alignItems: "center",
				justifyContent: "center",
				borderLeft: `1px solid ${selected ? "#B9D0F8" : UI.border}`,
			})}
		>
			<ChevronDown size={15} color={selected ? UI.blueIcon : UI.icon} />
		</div>
	</div>
);

const TargetButton = ({ icon, label }: { icon: ReactNode; label: string }) => (
	<div
		style={flex({
			flexGrow: 1,
			flexBasis: 0,
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			gap: 5,
			padding: "10px 0 9px",
			borderRadius: 10,
			border: `1px solid ${UI.border}`,
			background: UI.rowBg,
		})}
	>
		{icon}
		<span style={{ fontSize: 14, fontWeight: 500, color: UI.text }}>
			{label}
		</span>
	</div>
);

const DeviceRow = ({
	icon,
	label,
	trailing,
}: {
	icon: ReactNode;
	label: string;
	trailing: ReactNode;
}) => (
	<div
		style={flex({
			alignItems: "center",
			gap: 12,
			height: 50,
			paddingLeft: 14,
			paddingRight: 10,
			borderRadius: 10,
			border: `1px solid ${UI.border}`,
			background: UI.rowBg,
		})}
	>
		{icon}
		<span
			style={{
				flexGrow: 1,
				fontSize: 16,
				fontWeight: 500,
				color: UI.text,
			}}
		>
			{label}
		</span>
		{trailing}
	</div>
);

/** Miniature of the actual Cap main window (new-main, light mode). */
export const RecorderCard = ({ width = 380 }: { width?: number }) => (
	<div
		style={flex({
			width,
			flexDirection: "column",
			background: UI.windowBg,
			borderRadius: 16,
			padding: "14px 16px 16px",
			gap: 11,
			boxShadow: "0 30px 60px rgba(20,52,120,0.22)",
		})}
	>
		{/* window chrome */}
		<div style={flex({ alignItems: "center" })}>
			<TrafficLights />
			<div style={flex({ flexGrow: 1 })} />
			<div style={flex({ gap: 11, alignItems: "center" })}>
				<Maximize2Icon size={15} color={UI.icon} />
				<GearIcon size={17} color={UI.icon} />
				<ImageIcon size={17} color={UI.icon} />
				<SquarePlayIcon size={17} color={UI.icon} />
			</div>
		</div>
		{/* logo row + mode switcher */}
		<div style={flex({ alignItems: "center", marginTop: 4 })}>
			<CapFullLogo height={30} color="#12161F" />
			<div
				style={flex({
					marginLeft: 8,
					padding: "3px 8px",
					borderRadius: 8,
					border: `1px solid ${UI.pillBorder}`,
					background: UI.pillBg,
					fontSize: 11,
					fontWeight: 500,
					color: UI.textDim,
				})}
			>
				Personal
			</div>
			<div style={flex({ flexGrow: 1 })} />
			<ModeSwitcher />
		</div>
		{/* capture targets */}
		<div style={flex({ gap: 9, marginTop: 2 })}>
			<TargetSplitButton
				selected
				icon={<MonitorIcon size={22} color={UI.blueIcon} />}
				label="Display"
			/>
			<TargetSplitButton
				icon={<AppWindowIcon size={22} color={UI.icon} />}
				label="Window"
			/>
		</div>
		<div style={flex({ gap: 9 })}>
			<TargetButton
				icon={<AreaIcon size={22} color={UI.icon} />}
				label="Area"
			/>
			<TargetButton
				icon={<VideoIcon size={22} color={UI.icon} />}
				label="Camera Only"
			/>
		</div>
		{/* devices */}
		<DeviceRow
			icon={<VideoIcon size={19} color={UI.textDim} />}
			label="MacBook Pro Camera"
			trailing={<ChevronDown size={16} color={UI.icon} />}
		/>
		<DeviceRow
			icon={<MicIcon size={19} color={UI.textDim} />}
			label="MacBook Pro Microphone"
			trailing={<ChevronDown size={16} color={UI.icon} />}
		/>
		<DeviceRow
			icon={<MonitorIcon size={19} color={UI.textDim} />}
			label="Record System Audio"
			trailing={
				<div
					style={flex({
						alignItems: "center",
						justifyContent: "center",
						minWidth: 44,
						height: 26,
						padding: "0 12px",
						borderRadius: 999,
						background: OG_BLUE,
						fontSize: 12,
						fontWeight: 500,
						color: "white",
					})}
				>
					On
				</div>
			}
		/>
	</div>
);

const AppleGlyph = ({ size }: { size: number }) => (
	<svg
		role="img"
		aria-label="Apple"
		width={size}
		height={size}
		viewBox="0 0 24 24"
	>
		<path
			fill="#111111"
			d="M16.37 12.7c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.77-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.78.74 2.99.72 1.24-.02 2.02-1.12 2.77-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.39-.92-2.4-3.65ZM14.1 5.94c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.27Z"
		/>
	</svg>
);

const MenuBar = () => (
	<div
		style={flex({
			alignItems: "center",
			height: 30,
			padding: "0 16px",
			gap: 18,
			background: "rgba(255,255,255,0.55)",
			fontSize: 13,
			fontWeight: 500,
			color: "#111111",
		})}
	>
		<AppleGlyph size={15} />
		<span style={{ fontWeight: 600 }}>Oiaai</span>
		<span style={{ fontWeight: 400 }}>File</span>
		<span style={{ fontWeight: 400 }}>Edit</span>
		<span style={{ fontWeight: 400 }}>View</span>
		<span style={{ fontWeight: 400 }}>Window</span>
	</div>
);

export const DesktopArt = ({
	mesh,
	wallpaper,
}: {
	mesh: string;
	wallpaper: string;
}) => (
	<MeshFrame mesh={mesh} width={640} height={580}>
		<div
			style={flex({
				position: "relative",
				flexDirection: "column",
				width: 616,
				height: 556,
				borderRadius: 18,
				overflow: "hidden",
				background: "#9FC0E6",
			})}
		>
			<div
				style={flex({
					position: "absolute",
					top: -10,
					left: -150,
					width: 1024,
					height: 576,
					backgroundImage: `url(${wallpaper})`,
					backgroundSize: "1024px 576px",
				})}
			/>
			<MenuBar />
			<div
				style={flex({
					position: "absolute",
					left: 132,
					top: 64,
				})}
			>
				<RecorderCard width={380} />
			</div>
		</div>
	</MeshFrame>
);

const Segment = ({
	label,
	active,
	badge,
}: {
	label: string;
	active?: boolean;
	badge?: string;
}) => (
	<div
		style={flex({
			flexGrow: 1,
			flexBasis: 0,
			alignItems: "center",
			justifyContent: "center",
			gap: 8,
			height: 42,
			borderRadius: 10,
			background: active ? "#DCEBFC" : "transparent",
			fontSize: 16,
			fontWeight: 500,
			color: active ? OG_INK : "rgba(17,17,17,0.55)",
		})}
	>
		{label}
		{badge && (
			<span
				style={{
					fontFamily: OG_MONO,
					fontSize: 11,
					letterSpacing: 0.8,
					padding: "3px 7px",
					borderRadius: 6,
					background: "#E1EFFE",
					color: "#3D77C2",
				}}
			>
				{badge}
			</span>
		)}
	</div>
);

const PlanCardArt = ({
	name,
	chip,
	chipBg,
	chipColor,
	blurb,
	price,
	unit,
	note,
	children,
	width,
}: {
	name: string;
	chip: string;
	chipBg: string;
	chipColor: string;
	blurb: string;
	price: string;
	unit: string;
	note: string;
	children?: ReactNode;
	width: number;
}) => (
	<div
		style={flex({
			flexDirection: "column",
			width,
			height: "100%",
			padding: "30px 32px",
			borderRadius: 20,
			background: "white",
		})}
	>
		<div
			style={flex({ alignItems: "center", justifyContent: "space-between" })}
		>
			<span style={{ fontSize: 30, letterSpacing: -0.9 }}>{name}</span>
			<span
				style={{
					fontSize: 14,
					fontWeight: 500,
					padding: "5px 11px",
					borderRadius: 999,
					background: chipBg,
					color: chipColor,
				}}
			>
				{chip}
			</span>
		</div>
		<div style={flex({ marginTop: 14 })}>
			<Body size={19} lines={3}>
				{blurb}
			</Body>
		</div>
		<div style={flex({ alignItems: "flex-end", gap: 12, marginTop: 30 })}>
			<span style={{ fontSize: 68, lineHeight: 1, letterSpacing: -2.4 }}>
				{price}
			</span>
			<span
				style={{
					fontSize: 18,
					color: "rgba(17,17,17,0.6)",
					paddingBottom: 8,
				}}
			>
				{unit}
			</span>
		</div>
		<span style={{ marginTop: 18, fontSize: 16, color: "rgba(17,17,17,0.6)" }}>
			{note}
		</span>
		{children}
	</div>
);

export const PricingArt = ({
	mesh,
	pro,
}: {
	mesh: string;
	pro: { monthly: number; annualPerMonth: number; savePercent: number };
}) => (
	<MeshFrame mesh={mesh} width={500} height={620} padding={10} radius={30}>
		<PlanCardArt
			width={480}
			name="Oiaai Pro"
			chip="Most popular"
			chipBg="#DCEBFC"
			chipColor="#2F62D4"
			blurb="Everything in Desktop, plus unlimited cloud sharing, AI, and team collaboration."
			price={`$${pro.monthly}`}
			unit="per user, per month"
			note={`Or $${pro.annualPerMonth} a month, billed annually.`}
		>
			<div
				style={flex({
					marginTop: 26,
					padding: 5,
					borderRadius: 14,
					border: "1px solid #E1E7EE",
				})}
			>
				<Segment label="Monthly" active />
				<Segment label="Annual" badge={`SAVE ${pro.savePercent}%`} />
			</div>
			<div
				style={flex({
					marginTop: 24,
					alignItems: "center",
					justifyContent: "space-between",
					fontSize: 17,
				})}
			>
				<span>Users</span>
				<div style={flex({ alignItems: "center", gap: 18 })}>
					<StepperDot label="−" />
					<span>1</span>
					<StepperDot label="+" />
				</div>
			</div>
			<div
				style={flex({
					marginTop: 26,
					height: 54,
					borderRadius: 13,
					alignItems: "center",
					justifyContent: "center",
					fontSize: 18,
					fontWeight: 500,
					background:
						"linear-gradient(180deg, #F5FAFE 0%, #E3EFFB 52%, #CFE2F6 100%)",
					border: "1px solid rgba(63,127,205,0.65)",
					boxShadow: "0 10px 24px -10px rgba(120,178,240,0.55)",
				})}
			>
				Get Oiaai Pro
			</div>
		</PlanCardArt>
	</MeshFrame>
);

const StepperDot = ({ label }: { label: string }) => (
	<div
		style={flex({
			width: 32,
			height: 32,
			borderRadius: 9999,
			background: "#F1F4F8",
			alignItems: "center",
			justifyContent: "center",
			fontSize: 20,
			color: "rgba(17,17,17,0.6)",
		})}
	>
		{label}
	</div>
);

export const titleFontSize = (title: string) => {
	if (title.length <= 22) return 84;
	if (title.length <= 30) return 70;
	if (title.length <= 56) return 60;
	return 50;
};
