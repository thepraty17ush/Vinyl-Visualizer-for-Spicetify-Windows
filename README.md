## Install

**Requirements:** [Spicetify](https://spicetify.app) installed and working with the Spotify desktop app.

1. Open your Spicetify **CustomApps** folder:
   - **Windows:** `%appdata%\spicetify\CustomApps`
   - **macOS / Linux:** `~/.config/spicetify/CustomApps`

2. Copy the whole `vinyl-visualizer` folder into it (or `git clone` this repo there).

3. Open PowerShell (or your terminal) and run:
```bash
   spicetify config custom_apps vinyl-visualizer
   spicetify apply
```
   If this is your first time using Spicetify, run `spicetify backup apply` instead of `spicetify apply`.

4. Restart Spotify. A record icon appears in the left sidebar. Click it to open the Vinyl Visualizer.

## Uninstall

```bash
spicetify config custom_apps vinyl-visualizer-
spicetify apply
```
Then delete the `vinyl-visualizer` folder from `CustomApps`.
