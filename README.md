How to Install the Vinyl Visualizer?

This is a custom app for Spicetify.

## What's inside
```
vinyl-visualizer/
├── index.js        # the app (React, via Spicetify.React — no build step needed)
├── manifest.json    # name + sidebar icons
└── style.css        # spinning-disc styling, matches the AbstractBlue palette
```

## Install

1. Go to the Custom Apps folder :
   - **Windows:** `%appdata%\spicetify\CustomApps`
   - **macOS/Linux:** `~/.config/spicetify/CustomApps`

2. Copy the whole `vinyl-visualizer` folder in there.

3. Paste this command in powershell
   spicetify config custom_apps vinyl-visualizer
   spicetify apply

5. A record icon is the Vinyl Visualizer
