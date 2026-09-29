# Vinyl Visualizer — Spicetify Custom App

A sidebar page that shows whatever's currently playing as a spinning vinyl
record: album art in the center label, a tonearm that drops when playback
starts and lifts when it pauses, and a thin progress bar underneath.

This is a **Custom App**, not a theme — it goes in a different folder than
AbstractBlue.

## What's inside
```
vinyl-visualizer/
├── index.js        # the app (React, via Spicetify.React — no build step needed)
├── manifest.json    # name + sidebar icons
└── style.css        # spinning-disc styling, matches the AbstractBlue palette
```

## Install

1. Go to the **CustomApps** folder (not Themes):
   - **Windows:** `%appdata%\spicetify\CustomApps`
   - **macOS/Linux:** `~/.config/spicetify/CustomApps`

2. Copy the whole `vinyl-visualizer` folder in there.

3. Enable it and apply:
   ```bash
   spicetify config custom_apps vinyl-visualizer
   spicetify apply
   ```

4. Restart Spotify. A new record-icon entry appears in the left sidebar —
   click it to open the visualizer.

## How it works
- Reads `Spicetify.Player.data` for the current track's title, artist and
  album art, and listens for `songchange`, `onplaypause`, and `onprogress`
  events to stay in sync — no polling.
- The disc's rotation animation is always running under the hood; pausing
  just freezes it in place (`animation-play-state`), so it never jumps or
  resets when you pause/resume.
- Colors pull from the active theme's `--spice-*` CSS variables, so if
  AbstractBlue is your current theme it'll match automatically. Under any
  other theme it falls back to the same blue palette.

## Troubleshooting
- If the sidebar entry doesn't show up, double check the folder sits in
  `CustomApps`, not `Themes` — that's the most common mix-up.
- If it says "Custom app not found" in `spicetify apply` output, the folder
  name and the name passed to `spicetify config custom_apps` must match
  exactly (`vinyl-visualizer`).
