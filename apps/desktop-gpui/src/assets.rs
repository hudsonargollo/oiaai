//! Embedded assets.
//!
//! There are only a few dozen files, so they are baked in with `include_bytes!`
//! rather than pulling in `rust_embed` for a directory walk we can spell out by
//! hand. The [`AssetSource`] impl is load-bearing, not just tidy: gpui's `svg()`
//! element resolves every icon path through it, and an unregistered path fails
//! silently -- the element lays out at its declared size and draws nothing.

use std::borrow::Cow;

use gpui::{App, AssetSource, Result, SharedString};

/// Expands to `(path, bytes)` pairs rooted at `assets/`.
macro_rules! assets {
    ($dir:literal: $($name:literal),* $(,)?) => {
        &[$((
            concat!($dir, "/", $name),
            include_bytes!(concat!("../assets/", $dir, "/", $name)) as &[u8],
        )),*]
    };
}

/// Exactly the three faces the webview loads -- `unplugin-fonts` is configured
/// for `weights: [400, 500, 700]` (`packages/ui-solid/vite.js:31-33`) and
/// nothing else. Deliberately *not* four: there is no SemiBold here because
/// there is none over there, so a Tailwind `font-semibold` (600) finds no 600
/// face and CSS font-matching resolves it up to 700. Embedding a real 600 would
/// let this app render a weight the original cannot, which is how the two
/// drift apart.
const FONTS: &[(&str, &[u8])] = assets!("fonts":
    "Geist.ttf",
    "Geist-Medium.ttf",
    "Geist-Bold.ttf",
    // Adobe, SIL Open Font License 1.1 (the licence is embedded in the font).
    "SourceSerif4-Light.ttf",
);

/// Mostly Cap's own icon set, lifted from `packages/ui-solid/icons`. gpui
/// rasterises an SVG and keeps only its alpha, tinting the result with the
/// element's text colour, so these must be single-colour glyphs -- a full-colour
/// illustration would come out as a filled silhouette.
const ICONS: &[(&str, &[u8])] = assets!("icons":
    "app-window-mac.svg",
    "app-window.svg",
    "ban.svg",
    "globe.svg",
    "area.svg",
    "arrows.svg",
    "audio-on.svg",
    "bell.svg",
    "camera.svg",
    "caret-down.svg",
    "captions.svg",
    "caption-close-windows.svg",
    "caption-maximize-windows.svg",
    "caption-minimize-windows.svg",
    "caption-restore-windows.svg",
    "circle.svg",
    "check.svg",
    "clapperboard.svg",
    "chevron-down.svg",
    "chevrons-up-down.svg",
    "crop.svg",
    "cursor.svg",
    "chevron-left.svg",
    "chevron-right.svg",
    "circle-help.svg",
    "circle-plus.svg",
    "circle-x.svg",
    "enlarge.svg",
    "eye-off.svg",
    "film-cut.svg",
    "flip-horizontal-2.svg",
    "folder.svg",
    "gauge.svg",
    "gear.svg",
    "hint-arrow-down.svg",
    "hint-arrow-left.svg",
    "hint-arrow-right.svg",
    "hint-arrow-up.svg",
    // The config sidebar's field glyphs. Four are Cap's own
    // (`packages/ui-solid/icons/{padding,corners,shadow,bg-blur}.svg`); the
    // rest of the background section's are Lucide, drawn here from the same
    // 24x24 originals `~icons/lucide/*` resolves to -- laptop (MacBook notch),
    // wind (motion blur), image-off (the "None" source tile). `shuffle` is the
    // gradient editor's own inline randomise glyph (`GradientEditor.tsx:237-253`),
    // which is Lucide `shuffle` with its paths spelled out in the TSX.
    "padding.svg",
    "corners.svg",
    "shadow.svg",
    "bg-blur.svg",
    "laptop.svg",
    "shuffle.svg",
    "gift.svg",
    "hotkeys.svg",
    "image.svg",
    "info.svg",
    "instant.svg",
    "keyboard.svg",
    "layers.svg",
    "layout.svg",
    "logo-full-dark.svg",
    "logo-full.svg",
    "logo-mark.svg",
    "message-bubble.svg",
    "message-square-plus.svg",
    "mic-off.svg",
    "microphone.svg",
    "minus.svg",
    "monitor.svg",
    "more-vertical.svg",
    "move-left.svg",
    "next.svg",
    // The timeline's track glyphs. `trackIcons` (`TL/index.tsx:70-80`) and
    // `getSceneIcon` (`TL/SceneTrack.tsx:80-96`) are Lucide, and the app has
    // no Cap equivalent for most of them, so these nine are the Lucide 24x24
    // originals: type, box-select (an alias of square-dashed since Lucide
    // 0.5xx), music, video, rotate-3d, clock, monitor, columns-2, panel-right.
    "box-select.svg",
    "columns-2.svg",
    "monitor-outline.svg",
    "music.svg",
    "panel-right.svg",
    "rotate-3d.svg",
    "type.svg",
    "video.svg",
    "pause.svg",
    "pause-circle.svg",
    "person-standing.svg",
    "play.svg",
    "play-circle.svg",
    "plus.svg",
    "presets.svg",
    "prev.svg",
    "rectangle-horizontal.svg",
    "redo.svg",
    "restart.svg",
    "scissors.svg",
    "square.svg",
    "square-play.svg",
    "terminal.svg",
    "trash.svg",
    "triangle-alert.svg",
    "scan-text.svg",
    "screen.svg",
    "screenshot.svg",
    "stop-circle.svg",
    "search.svg",
    "settings.svg",
    "settings-2.svg",
    "undo.svg",
    "unplug.svg",
    "upload-arrow.svg",
    "user-round.svg",
    "window.svg",
    "x.svg",
    // E5b's field glyphs: the rest of the sidebar's Lucide set, drawn from the
    // same 24x24 originals `~icons/lucide/*` resolves to. `ease-curve` stands
    // in for `~icons/hugeicons/ease-curve-control-points`, which is the one
    // non-Lucide glyph in the sidebar (Smooth Movement's header).
    "align-center.svg",
    "align-left.svg",
    "align-right.svg",
    "arrow-left-right.svg",
    "download.svg",
    "flip-vertical-2.svg",
    "maximize.svg",
    "mouse-pointer-2.svg",
    "mouse-pointer-ban.svg",
    "move.svg",
    "move-right.svg",
    "palette.svg",
    "ratio.svg",
    "refresh-cw.svg",
    "rotate-ccw.svg",
    "volume-x.svg",
    "gem.svg",
    "sliders-horizontal.svg",
    "zap.svg",
    "zoom-in.svg",
    "zoom-out.svg",
    // The settings Recordings page. `link` is Cap's own
    // (`packages/ui-solid/icons/link.svg`, which is Lucide's glyph); `import`
    // and `edit` are the Lucide 24x24 originals `~icons/lucide/*` resolves to;
    // `record-fill` and `warning-bold` are Phosphor's 256x256 originals, which
    // is what `IconPhRecordFill` / `IconPhWarningBold` are in `recordings.tsx`.
    "link.svg",
    "import.svg",
    "edit.svg",
    "copy.svg",
    "clipboard-paste.svg",
    "record-fill.svg",
    "warning-bold.svg",
    "traffic-close.svg",
    // The remaining settings pages (`settings_pages.rs`). `circle-check` is
    // Cap's own (`packages/ui-solid/icons/circle-check.svg`, hotkeys.tsx's
    // IconCapCircleCheck); the rest are the Lucide 24x24 originals the pages'
    // `~icons/lucide/*` imports resolve to, except `google-drive`, which is
    // integrations/index.tsx's inline multi-colour logo flattened to one fill
    // (gpui's `svg()` keeps only the alpha).
    "circle-check.svg",
    "lock.svg",
    "lock-open.svg",
    // The screenshot editor's annotation toolbar, layers panel and header
    // (`AnnotationTools.tsx`, `LayersPanel.tsx`, `Header.tsx`). Lucide 24x24
    // originals, matching the `~icons/lucide/*` imports over there.
    "pencil.svg",
    "arrow-up-right.svg",
    "more-horizontal.svg",
    "save.svg",
    "grip-vertical.svg",
    "chevron-up.svg",
    "arrow-left.svg",
    "arrow-left-to-line.svg",
    "arrow-right-to-line.svg",
    "film.svg",
    "folder-open.svg",
    "folder-down.svg",
    "cloud-upload.svg",
    "webhook.svg",
    "database.svg",
    "google-drive.svg",
);

/// Full-colour art, which `svg()` cannot draw -- it keeps only the alpha. The
/// three theme previews in the settings window's Appearance section are the
/// app's own `~/assets/theme-previews/*.jpg`, drawn with `img()`.
const IMAGES: &[(&str, &[u8])] = assets!("images":
    "auto.jpg",
    "light.jpg",
    "dark.jpg",
);

const ONBOARDING: &[(&str, &[u8])] = &[
    // Grain is one sheet, never tiled: snapped tiles overlap and draw seams.
    ("onboarding/clouds/cumulus-a.webp", include_bytes!("../../web/public/backgrounds/clouds/cumulus-a.webp")),
    ("onboarding/clouds/cumulus-b.webp", include_bytes!("../../web/public/backgrounds/clouds/cumulus-b.webp")),
    ("onboarding/clouds/tuft-a.webp", include_bytes!("../../web/public/backgrounds/clouds/tuft-a.webp")),
    ("onboarding/clouds/bank-a.webp", include_bytes!("../../web/public/backgrounds/clouds/bank-a.webp")),
    ("onboarding/clouds/wisp-a.webp", include_bytes!("../../web/public/backgrounds/clouds/wisp-a.webp")),
    ("onboarding/sky.svg", br##"<svg viewBox="0 0 100 100" width="400" height="300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A3BFEA"/><stop offset="0.38" stop-color="#C8DBF4"/><stop offset="0.74" stop-color="#E2EAF5"/><stop offset="1" stop-color="#EDF1F6"/></linearGradient><radialGradient id="sun" cx="0.7" cy="0.02" r="0.36" gradientTransform="translate(0.7 0.02) scale(1 0.889) translate(-0.7 -0.02)"><stop offset="0" stop-color="#FFE0C0" stop-opacity="0.8"/><stop offset="0.7" stop-color="#FFE0C0" stop-opacity="0"/></radialGradient><radialGradient id="low" cx="0.5" cy="0.74" r="0.8" gradientTransform="translate(0.5 0.74) scale(1 0.525) translate(-0.5 -0.74)"><stop offset="0" stop-color="#FFF0E0" stop-opacity="0.5"/><stop offset="0.72" stop-color="#FFF0E0" stop-opacity="0"/></radialGradient></defs><rect width="100" height="100" fill="url(#base)"/><rect width="100" height="100" fill="url(#low)"/><rect width="100" height="100" fill="url(#sun)"/></svg>"##),
    ("onboarding/grain.svg", br##"<svg viewBox="0 0 1300 1000" width="1300" height="1000" xmlns="http://www.w3.org/2000/svg"><filter id="n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.26"/></feComponentTransfer></filter><rect width="1300" height="1000" filter="url(#n)"/></svg>"##),
    // These are drawn with their edges outside the window: gpui shows an
    // image's edge as a faint line where it falls on screen.
    ("onboarding/rays-far.svg", br##"<svg viewBox="0 0 100 100" width="400" height="300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="r" gradientUnits="userSpaceOnUse" x1="84" y1="-6" x2="30" y2="104"><stop offset="0" stop-color="#FFF6E6" stop-opacity="1"/><stop offset="0.55" stop-color="#FFF6E6" stop-opacity="0.5"/><stop offset="1" stop-color="#FFF4E2" stop-opacity="0"/></linearGradient><filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.2"/></filter></defs><g filter="url(#b)" fill="url(#r)"><polygon points="84,-6 -20,104 -8,104" opacity="0.45"/><polygon points="84,-6 2,104 10,104" opacity="0.7"/><polygon points="84,-6 18,104 24,104" opacity="0.5"/><polygon points="84,-6 30,104 38,104" opacity="0.85"/><polygon points="84,-6 46,104 50,104" opacity="0.55"/><polygon points="84,-6 58,104 66,104" opacity="0.75"/><polygon points="84,-6 74,104 78,104" opacity="0.4"/></g></svg>"##),
    ("onboarding/rays-near.svg", br##"<svg viewBox="0 0 100 100" width="400" height="300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="r" gradientUnits="userSpaceOnUse" x1="84" y1="-6" x2="30" y2="104"><stop offset="0" stop-color="#FFF6E6" stop-opacity="1"/><stop offset="0.55" stop-color="#FFF6E6" stop-opacity="0.5"/><stop offset="1" stop-color="#FFF4E2" stop-opacity="0"/></linearGradient><filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2"/></filter></defs><g filter="url(#b)" fill="url(#r)"><polygon points="84,-6 -12,104 -2,104" opacity="0.5"/><polygon points="84,-6 10,104 16,104" opacity="0.6"/><polygon points="84,-6 26,104 30,104" opacity="0.8"/><polygon points="84,-6 40,104 46,104" opacity="0.45"/><polygon points="84,-6 52,104 56,104" opacity="0.7"/><polygon points="84,-6 66,104 72,104" opacity="0.5"/></g></svg>"##),
    ("onboarding/sun.svg", br##"<svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="g" r="0.1875"><stop offset="0" stop-color="#FFF8EC" stop-opacity="0.95"/><stop offset="0.35" stop-color="#FFE3C4" stop-opacity="0.5"/><stop offset="1" stop-color="#FFE3C4" stop-opacity="0"/></radialGradient></defs><rect width="200" height="200" fill="url(#g)"/></svg>"##),
    ("onboarding/mist.svg", br##"<svg viewBox="0 0 100 150" width="300" height="450" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="m"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.8"/><stop offset="0.5" stop-color="#F4F8FD" stop-opacity="0.35"/><stop offset="1" stop-color="#F4F8FD" stop-opacity="0"/></radialGradient></defs><ellipse cx="41.7" cy="52.5" rx="66.7" ry="22.5" fill="url(#m)" opacity="0.35"/><ellipse cx="62.5" cy="84.5" rx="66.7" ry="22.5" fill="url(#m)" opacity="0.28"/></svg>"##),
    ("onboarding/vignette.svg", br##"<svg viewBox="0 0 100 100" width="200" height="200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="g" r="0.75"><stop offset="0.5" stop-color="#34507A" stop-opacity="0"/><stop offset="1" stop-color="#34507A" stop-opacity="0.5"/></radialGradient></defs><rect width="100" height="100" fill="url(#g)"/></svg>"##),
    ("onboarding/wordmark.svg", br##"<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none"><defs><clipPath id="m-clip"><rect x="0.25" y="0.25" width="39.5" height="39.5" rx="7.75"></rect></clipPath><radialGradient id="m-dome" cx="20" cy="6" r="34" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="0.62" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#C4D6FA" stop-opacity="0.14"></stop></radialGradient><linearGradient id="m-top" x1="20" y1="0" x2="20" y2="9" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><filter id="m-top-blur" x="-80%" y="-80%" width="260%" height="260%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0.8"></feGaussianBlur></filter><linearGradient id="m-rim" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0.58"></stop><stop offset="0.32" stop-color="#fff" stop-opacity="0.087"></stop><stop offset="0.68" stop-color="#fff" stop-opacity="0.02"></stop><stop offset="1" stop-color="#fff" stop-opacity="0.52"></stop></linearGradient><filter id="m-glow-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1"></feGaussianBlur></filter><filter id="m-glint-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="0.35"></feGaussianBlur></filter><linearGradient id="m-ring-rim-1" x1="8.48" y1="8.48" x2="31.52" y2="31.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0.9"></stop><stop offset="0.38" stop-color="#fff" stop-opacity="0"></stop><stop offset="0.72" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="0.4"></stop></linearGradient><linearGradient id="m-ring-rim-2" x1="10.64" y1="10.64" x2="29.36" y2="29.36" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0.9"></stop><stop offset="0.38" stop-color="#fff" stop-opacity="0"></stop><stop offset="0.72" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="0.3"></stop></linearGradient><linearGradient id="m-ring-rim-3" x1="12.8" y1="12.8" x2="27.2" y2="27.2" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0.6"></stop><stop offset="0.38" stop-color="#fff" stop-opacity="0"></stop><stop offset="0.72" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="0.2"></stop></linearGradient><filter id="m-ring-lift-1" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="0.8"></feGaussianBlur><feOffset dy="0.35"></feOffset><feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.27  0 0 0 0 0.75  0 0 0 0.24 0"></feColorMatrix><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><filter id="m-ring-lift-2" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="0.7"></feGaussianBlur><feOffset dy="0.3"></feOffset><feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.27  0 0 0 0 0.75  0 0 0 0.26 0"></feColorMatrix><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><filter id="m-ring-lift-3" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="0.7"></feGaussianBlur><feOffset dy="0.3"></feOffset><feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.27  0 0 0 0 0.75  0 0 0 0.28 0"></feColorMatrix><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><rect x="0.25" y="0.25" width="39.5" height="39.5" rx="7.75" fill="#fff"></rect><g clip-path="url(#m-clip)"><rect width="40" height="40" fill="url(#m-dome)"></rect><rect x="3" y="1.2" width="34" height="5" rx="2.5" fill="url(#m-top)" opacity="0.9" filter="url(#m-top-blur)"></rect><rect x="0.25" y="0.25" width="39.5" height="39.5" rx="7.75" stroke="#4785FF" stroke-opacity="0.24" stroke-width="2.8" filter="url(#m-glow-blur)"></rect></g><rect x="1.225" y="1.225" width="37.55" height="37.55" rx="6.775" stroke="url(#m-rim)" stroke-width="1.15"></rect><g filter="url(#m-glint-blur)" stroke="#fff" stroke-linecap="round" stroke-width="0.9" opacity="0.21"><path d="M1.25 14V8.6A6.75 6.75 0 0 1 8 1.25H15"></path><path d="M38.75 26V31.4A6.75 6.75 0 0 1 32 38.75H25" opacity="0.7"></path></g><rect x="0.35" y="0.35" width="39.3" height="39.3" rx="7.65" stroke="#4785FF" stroke-opacity="0.16" stroke-width="0.7"></rect><circle cx="20" cy="20" r="16" fill="#4785FF" filter="url(#m-ring-lift-1)"></circle><circle cx="20" cy="20" r="15.7" stroke="url(#m-ring-rim-1)" stroke-width="0.6"></circle><circle cx="20" cy="20" r="13" fill="#ADC9FF" filter="url(#m-ring-lift-2)"></circle><circle cx="20" cy="20" r="12.75" stroke="url(#m-ring-rim-2)" stroke-width="0.5"></circle><circle cx="20" cy="20" r="10" fill="#fff" filter="url(#m-ring-lift-3)"></circle><circle cx="20" cy="20" r="9.75" stroke="url(#m-ring-rim-3)" stroke-width="0.5"></circle><g transform="translate(-3.764 -1.517) scale(1.05)"><defs><linearGradient id="w-ink" x1="0" y1="9" x2="0" y2="35" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2A3243"></stop><stop offset="0.55" stop-color="#12161F"></stop><stop offset="1" stop-color="#05070B"></stop></linearGradient><filter id="w-ink-lift" x="-10%" y="-30%" width="120%" height="160%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="0.55"></feGaussianBlur><feOffset dy="0.6"></feOffset><feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.22  0 0 0 0 0.6  0 0 0 0.2 0"></feColorMatrix><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><mask id="w-shine-mask" maskUnits="userSpaceOnUse" x="40" y="0" width="80" height="40"><path fill="#fff" d="M59.606 30.448C65.864 30.448 69.452 26.054 69.452 20.046C69.452 14.066 65.864 9.672 59.606 9.672C53.292 9.672 49.76 14.066 49.76 20.046C49.76 26.054 53.292 30.448 59.606 30.448ZM59.606 26.36C55.962 26.36 54.767 23.523 54.767 20.046C54.767 16.597 55.962 13.76 59.606 13.76C63.222 13.76 64.445 16.597 64.445 20.046C64.445 23.523 63.222 26.36 59.606 26.36ZM73.318 14.066C74.569 14.066 75.543 13.399 75.543 12.092C75.543 10.812 74.569 10.117 73.318 10.117C72.066 10.117 71.093 10.812 71.093 12.092C71.093 13.399 72.066 14.066 73.318 14.066ZM71.093 15.763V30.003H75.543V15.763ZM86.111 19.712C86.111 20.908 84.303 21.186 82.468 21.548C79.13 22.215 77.044 23.523 77.044 26.36C77.044 28.751 78.713 30.448 81.717 30.448C83.608 30.448 85.277 29.558 86.195 28.501H86.25C86.25 29.502 86.807 30.448 88.809 30.448C89.699 30.448 90.506 30.337 91.396 30.003V28.946C90.839 28.946 90.561 28.64 90.561 27.889V21.353C90.561 16.875 88.336 15.318 84.331 15.318C79.687 15.318 77.74 17.626 77.601 20.352H81.773C81.912 18.989 82.69 18.377 84.303 18.377C85.527 18.377 86.111 18.878 86.111 19.712ZM83.274 27.389C82.19 27.389 81.494 26.888 81.494 25.72C81.494 24.83 82.078 24.107 83.831 23.717C84.86 23.495 85.555 23.3 86.111 23.078V24.802C86.111 26.165 85.193 27.389 83.274 27.389ZM101.492 19.712C101.492 20.908 99.684 21.186 97.848 21.548C94.511 22.215 92.425 23.523 92.425 26.36C92.425 28.751 94.094 30.448 97.097 30.448C98.989 30.448 100.657 29.558 101.575 28.501H101.631C101.631 29.502 102.187 30.448 104.189 30.448C105.079 30.448 105.886 30.337 106.776 30.003V28.946C106.22 28.946 105.942 28.64 105.942 27.889V21.353C105.942 16.875 103.717 15.318 99.712 15.318C95.067 15.318 93.12 17.626 92.981 20.352H97.153C97.292 18.989 98.071 18.377 99.684 18.377C100.908 18.377 101.492 18.878 101.492 19.712ZM98.655 27.389C97.57 27.389 96.875 26.888 96.875 25.72C96.875 24.83 97.459 24.107 99.211 23.717C100.24 23.495 100.935 23.3 101.492 23.078V24.802C101.492 26.165 100.574 27.389 98.655 27.389ZM110.698 14.066C111.949 14.066 112.923 13.399 112.923 12.092C112.923 10.812 111.949 10.117 110.698 10.117C109.446 10.117 108.473 10.812 108.473 12.092C108.473 13.399 109.446 14.066 110.698 14.066ZM108.473 15.763V30.003H112.923V15.763Z"></path><path fill="#000" stroke="#000" stroke-width="0.22" stroke-linejoin="round" transform="translate(0 0.3)" d="M59.606 30.448C65.864 30.448 69.452 26.054 69.452 20.046C69.452 14.066 65.864 9.672 59.606 9.672C53.292 9.672 49.76 14.066 49.76 20.046C49.76 26.054 53.292 30.448 59.606 30.448ZM59.606 26.36C55.962 26.36 54.767 23.523 54.767 20.046C54.767 16.597 55.962 13.76 59.606 13.76C63.222 13.76 64.445 16.597 64.445 20.046C64.445 23.523 63.222 26.36 59.606 26.36ZM73.318 14.066C74.569 14.066 75.543 13.399 75.543 12.092C75.543 10.812 74.569 10.117 73.318 10.117C72.066 10.117 71.093 10.812 71.093 12.092C71.093 13.399 72.066 14.066 73.318 14.066ZM71.093 15.763V30.003H75.543V15.763ZM86.111 19.712C86.111 20.908 84.303 21.186 82.468 21.548C79.13 22.215 77.044 23.523 77.044 26.36C77.044 28.751 78.713 30.448 81.717 30.448C83.608 30.448 85.277 29.558 86.195 28.501H86.25C86.25 29.502 86.807 30.448 88.809 30.448C89.699 30.448 90.506 30.337 91.396 30.003V28.946C90.839 28.946 90.561 28.64 90.561 27.889V21.353C90.561 16.875 88.336 15.318 84.331 15.318C79.687 15.318 77.74 17.626 77.601 20.352H81.773C81.912 18.989 82.69 18.377 84.303 18.377C85.527 18.377 86.111 18.878 86.111 19.712ZM83.274 27.389C82.19 27.389 81.494 26.888 81.494 25.72C81.494 24.83 82.078 24.107 83.831 23.717C84.86 23.495 85.555 23.3 86.111 23.078V24.802C86.111 26.165 85.193 27.389 83.274 27.389ZM101.492 19.712C101.492 20.908 99.684 21.186 97.848 21.548C94.511 22.215 92.425 23.523 92.425 26.36C92.425 28.751 94.094 30.448 97.097 30.448C98.989 30.448 100.657 29.558 101.575 28.501H101.631C101.631 29.502 102.187 30.448 104.189 30.448C105.079 30.448 105.886 30.337 106.776 30.003V28.946C106.22 28.946 105.942 28.64 105.942 27.889V21.353C105.942 16.875 103.717 15.318 99.712 15.318C95.067 15.318 93.12 17.626 92.981 20.352H97.153C97.292 18.989 98.071 18.377 99.684 18.377C100.908 18.377 101.492 18.878 101.492 19.712ZM98.655 27.389C97.57 27.389 96.875 26.888 96.875 25.72C96.875 24.83 97.459 24.107 99.211 23.717C100.24 23.495 100.935 23.3 101.492 23.078V24.802C101.492 26.165 100.574 27.389 98.655 27.389ZM110.698 14.066C111.949 14.066 112.923 13.399 112.923 12.092C112.923 10.812 111.949 10.117 110.698 10.117C109.446 10.117 108.473 10.812 108.473 12.092C108.473 13.399 109.446 14.066 110.698 14.066ZM108.473 15.763V30.003H112.923V15.763Z"></path></mask><filter id="w-shine-blur" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.12"></feGaussianBlur></filter></defs><g><path fill="url(#w-ink)" filter="url(#w-ink-lift)" d="M59.606 30.448C65.864 30.448 69.452 26.054 69.452 20.046C69.452 14.066 65.864 9.672 59.606 9.672C53.292 9.672 49.76 14.066 49.76 20.046C49.76 26.054 53.292 30.448 59.606 30.448ZM59.606 26.36C55.962 26.36 54.767 23.523 54.767 20.046C54.767 16.597 55.962 13.76 59.606 13.76C63.222 13.76 64.445 16.597 64.445 20.046C64.445 23.523 63.222 26.36 59.606 26.36ZM73.318 14.066C74.569 14.066 75.543 13.399 75.543 12.092C75.543 10.812 74.569 10.117 73.318 10.117C72.066 10.117 71.093 10.812 71.093 12.092C71.093 13.399 72.066 14.066 73.318 14.066ZM71.093 15.763V30.003H75.543V15.763ZM86.111 19.712C86.111 20.908 84.303 21.186 82.468 21.548C79.13 22.215 77.044 23.523 77.044 26.36C77.044 28.751 78.713 30.448 81.717 30.448C83.608 30.448 85.277 29.558 86.195 28.501H86.25C86.25 29.502 86.807 30.448 88.809 30.448C89.699 30.448 90.506 30.337 91.396 30.003V28.946C90.839 28.946 90.561 28.64 90.561 27.889V21.353C90.561 16.875 88.336 15.318 84.331 15.318C79.687 15.318 77.74 17.626 77.601 20.352H81.773C81.912 18.989 82.69 18.377 84.303 18.377C85.527 18.377 86.111 18.878 86.111 19.712ZM83.274 27.389C82.19 27.389 81.494 26.888 81.494 25.72C81.494 24.83 82.078 24.107 83.831 23.717C84.86 23.495 85.555 23.3 86.111 23.078V24.802C86.111 26.165 85.193 27.389 83.274 27.389ZM101.492 19.712C101.492 20.908 99.684 21.186 97.848 21.548C94.511 22.215 92.425 23.523 92.425 26.36C92.425 28.751 94.094 30.448 97.097 30.448C98.989 30.448 100.657 29.558 101.575 28.501H101.631C101.631 29.502 102.187 30.448 104.189 30.448C105.079 30.448 105.886 30.337 106.776 30.003V28.946C106.22 28.946 105.942 28.64 105.942 27.889V21.353C105.942 16.875 103.717 15.318 99.712 15.318C95.067 15.318 93.12 17.626 92.981 20.352H97.153C97.292 18.989 98.071 18.377 99.684 18.377C100.908 18.377 101.492 18.878 101.492 19.712ZM98.655 27.389C97.57 27.389 96.875 26.888 96.875 25.72C96.875 24.83 97.459 24.107 99.211 23.717C100.24 23.495 100.935 23.3 101.492 23.078V24.802C101.492 26.165 100.574 27.389 98.655 27.389ZM110.698 14.066C111.949 14.066 112.923 13.399 112.923 12.092C112.923 10.812 111.949 10.117 110.698 10.117C109.446 10.117 108.473 10.812 108.473 12.092C108.473 13.399 109.446 14.066 110.698 14.066ZM108.473 15.763V30.003H112.923V15.763Z"></path><g filter="url(#w-shine-blur)"><rect x="40" y="0" width="80" height="40" fill="#fff" opacity="0.45" mask="url(#w-shine-mask)"></rect></g></g></g></svg>"##),
    ("onboarding/music.mp3", include_bytes!("../assets/onboarding/tears-and-fireflies-adi-goldstein.mp3")),
    ("onboarding/cursor-macos.svg", include_bytes!("../assets/onboarding/cursor-macos.svg")),
    ("onboarding/cursor-windows.svg", include_bytes!("../assets/onboarding/cursor-windows.svg")),
    ("onboarding/volume-2.svg", include_bytes!("../assets/icons/volume-2.svg")),
    ("onboarding/volume-x.svg", include_bytes!("../assets/icons/volume-x.svg")),
];

pub struct Assets;

impl Assets {
    fn all() -> impl Iterator<Item = &'static (&'static str, &'static [u8])> {
        FONTS
            .iter()
            .chain(ICONS.iter())
            .chain(IMAGES.iter())
            .chain(ONBOARDING.iter())
    }
}

impl AssetSource for Assets {
    fn load(&self, path: &str) -> Result<Option<Cow<'static, [u8]>>> {
        Ok(Self::all()
            .find(|(name, _)| *name == path)
            .map(|(_, bytes)| Cow::Borrowed(*bytes)))
    }

    fn list(&self, path: &str) -> Result<Vec<SharedString>> {
        Ok(Self::all()
            .filter(|(name, _)| name.starts_with(path))
            .map(|(name, _)| SharedString::from(*name))
            .collect())
    }
}

impl Assets {
    /// Register the embedded Geist faces with the text system.
    ///
    /// gpui resolves `.font_family("Geist")` against whatever the platform text
    /// system knows about, so this has to run before the first window renders or
    /// text silently falls back to the system UI font.
    pub fn load_fonts(&self, cx: &App) -> Result<()> {
        cx.text_system().add_fonts(
            FONTS
                .iter()
                .map(|(_, bytes)| Cow::Borrowed(*bytes))
                .collect(),
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Every source file that draws icons; both directions of the asset checks
    /// scan the same list.
    const ICON_SOURCES: &[&str] = &[
        include_str!("main_window.rs"),
        // Not a window: the Recents card's per-kind pill and fallback glyphs
        // are named on `MediaKind`, next to the `Recents.tsx` lines they come
        // from, so the table has to scan here too.
        include_str!("library.rs"),
        include_str!("controls_window.rs"),
        include_str!("camera_window.rs"),
        include_str!("target_overlay.rs"),
        include_str!("settings_window.rs"),
        include_str!("settings_pages.rs"),
        include_str!("mode_select_window.rs"),
        include_str!("teleprompter_window.rs"),
        include_str!("editor_window.rs"),
        include_str!("editor_window/frame.rs"),
        include_str!("editor_window/scenes.rs"),
        // The timeline's nine track glyphs and its scene-mode icons are named
        // in the strip's own module, not in the window that hosts it.
        include_str!("editor_timeline.rs"),
        // The config sidebar's field glyphs and the background section's
        // source tiles, same split.
        include_str!("editor_sidebar.rs"),
        // The five later tabs, the colour-grade section and the eight segment
        // panels each name their own glyphs.
        include_str!("editor_tabs.rs"),
        // The cursor tab's style picker and ripple section live one directory
        // down, and the ripple field names its own glyph.
        include_str!("editor_sidebar/cursor.rs"),
        include_str!("editor_color.rs"),
        include_str!("editor_panels.rs"),
        // The crop dialog's ratio / Full / Reset glyphs and the chevron
        // between its two panes.
        include_str!("editor_crop.rs"),
        // The clips sidebar's cards, import menu and record modal.
        include_str!("editor_clips.rs"),
        // The export page's destination cards and share-status glyphs.
        include_str!("editor_export.rs"),
        // The screenshot editor's toolbar, popovers and zoom HUD; the
        // annotation module names the tool and layer glyphs.
        include_str!("screenshot_editor.rs"),
        include_str!("screenshot_annotations.rs"),
        // The crop overlay's own ratio glyph.
        include_str!("screenshot_crop.rs"),
        // `ui::SelectionHeader` names the check and the trash itself.
        include_str!("ui/selection_header.rs"),
        include_str!("ui/radio_cards.rs"),
        include_str!("ui/windows_caption.rs"),
        include_str!("ui/hint.rs"),
        include_str!("ui/select.rs"),
        // The onboarding window's welcome cards and permissions surface; the
        // per-permission row glyphs are named on `OSPermission::icon`.
        include_str!("onboarding_window.rs"),
        include_str!("permissions.rs"),
    ];

    /// Every icon a window asks for must be in the table. gpui draws
    /// nothing at all for a path it cannot resolve, and does not log, so a typo
    /// here is otherwise only visible by looking at the window.
    #[test]
    fn every_referenced_icon_is_embedded() {
        let source = ICON_SOURCES.concat();
        let source = source.as_str();

        let referenced: Vec<&str> = source
            .match_indices("\"icons/")
            .filter_map(|(start, _)| {
                let rest = &source[start + 1..];
                rest.split('"').next()
            })
            .filter(|path| path.ends_with(".svg"))
            .collect();

        assert!(
            !referenced.is_empty(),
            "found no icon references to check -- has main_window.rs stopped \
             spelling paths as string literals?"
        );

        let missing: Vec<&str> = referenced
            .into_iter()
            .filter(|path| Assets.load(path).unwrap().is_none())
            .collect();

        assert!(
            missing.is_empty(),
            "icons referenced but not embedded: {missing:?}"
        );
    }

    /// And the other direction: an icon that stopped being drawn during a
    /// refactor is dead weight in the binary, and nothing else would notice.
    #[test]
    fn every_embedded_icon_is_referenced() {
        let source = ICON_SOURCES.concat();
        let source = source.as_str();

        let unused: Vec<&str> = ICONS
            .iter()
            .map(|(path, _)| *path)
            .filter(|path| !source.contains(path))
            .collect();

        assert!(
            unused.is_empty(),
            "icons embedded but never drawn: {unused:?}"
        );
    }

    /// Same contract for the bitmaps, which `img()` resolves through the
    /// identical `AssetSource` path and fails just as silently.
    #[test]
    fn every_referenced_image_is_embedded_and_vice_versa() {
        let source = ICON_SOURCES.concat();
        let source = source.as_str();

        let referenced: Vec<&str> = source
            .match_indices("\"images/")
            .filter_map(|(start, _)| source[start + 1..].split('"').next())
            .collect();
        assert!(!referenced.is_empty(), "found no image references to check");

        let missing: Vec<&str> = referenced
            .into_iter()
            .filter(|path| Assets.load(path).unwrap().is_none())
            .collect();
        assert!(
            missing.is_empty(),
            "images referenced but not embedded: {missing:?}"
        );

        let unused: Vec<&str> = IMAGES
            .iter()
            .map(|(path, _)| *path)
            .filter(|path| !source.contains(path))
            .collect();
        assert!(
            unused.is_empty(),
            "images embedded but never drawn: {unused:?}"
        );
    }

    #[test]
    fn fonts_and_icons_resolve() {
        assert!(Assets.load("fonts/Geist.ttf").unwrap().is_some());
        assert!(Assets.load("icons/camera.svg").unwrap().is_some());
        assert!(Assets.load("icons/nope.svg").unwrap().is_none());
        assert!(Assets.load("images/auto.jpg").unwrap().is_some());
        assert_eq!(Assets.list("fonts").unwrap().len(), FONTS.len());
        assert_eq!(Assets.list("icons").unwrap().len(), ICONS.len());
        assert_eq!(Assets.list("images").unwrap().len(), IMAGES.len());
    }
}
