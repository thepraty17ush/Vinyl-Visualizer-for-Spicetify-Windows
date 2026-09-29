// Vinyl Visualizer — a Spicetify Custom App
// Shows the currently playing track as a spinning vinyl record with a
// tonearm that lifts and drops depending on playback state.
//
// No JSX support here — Spicetify concatenates this file as plain JS and
// looks for a top-level `render()` function, so everything is written with
// react.createElement.

const react = Spicetify.React;
const reactDOM = Spicetify.ReactDOM;
const { useState, useEffect } = Spicetify.React;

const PLACEHOLDER_ART =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>" +
      "<rect width='200' height='200' fill='#0b1530'/>" +
      "<circle cx='100' cy='100' r='55' fill='none' stroke='#3b5cc9' stroke-width='2'/>" +
      "<circle cx='100' cy='100' r='8' fill='#3b5cc9'/>" +
      "</svg>"
  );

// Pull whatever we can out of Spicetify.Player.data in a version-tolerant way.
function getTrackFromPlayer() {
  const data = Spicetify.Player.data;
  const item = data && data.item;
  if (!item) return null;

  let art = null;
  if (item.images && item.images.length) {
    art = item.images[0].url;
  } else if (
    item.metadata &&
    item.metadata.image_xlarge_url &&
    item.metadata.image_xlarge_url.indexOf("http") === 0
  ) {
    art = item.metadata.image_xlarge_url;
  } else if (
    item.metadata &&
    item.metadata.image_url &&
    item.metadata.image_url.indexOf("http") === 0
  ) {
    art = item.metadata.image_url;
  }

  const title =
    item.name || (item.metadata && item.metadata.title) || "Unknown title";

  let artist = "";
  if (item.artists && item.artists.length) {
    artist = item.artists.map((a) => a.name).join(", ");
  } else if (item.metadata && item.metadata.artist_name) {
    artist = item.metadata.artist_name;
  }

  return { title: title, artist: artist, art: art };
}

function safeIsPlaying() {
  try {
    return !!Spicetify.Player.isPlaying();
  } catch (e) {
    return false;
  }
}

function safeProgressPercent() {
  try {
    return Spicetify.Player.getProgressPercent
      ? Spicetify.Player.getProgressPercent()
      : 0;
  } catch (e) {
    return 0;
  }
}

function safeFormatTime(ms) {
  try {
    return Spicetify.Player.formatTime(ms);
  } catch (e) {
    return "";
  }
}

function VinylVisualizer() {
  const [track, setTrack] = useState(getTrackFromPlayer());
  const [isPlaying, setIsPlaying] = useState(safeIsPlaying());
  const [progress, setProgress] = useState(safeProgressPercent());

  useEffect(() => {
    const onSongChange = () => setTrack(getTrackFromPlayer());
    const onPlayPause = () => setIsPlaying(safeIsPlaying());
    const onProgress = () => setProgress(safeProgressPercent());

    Spicetify.Player.addEventListener("songchange", onSongChange);
    Spicetify.Player.addEventListener("onplaypause", onPlayPause);
    Spicetify.Player.addEventListener("onprogress", onProgress);

    return () => {
      Spicetify.Player.removeEventListener("songchange", onSongChange);
      Spicetify.Player.removeEventListener("onplaypause", onPlayPause);
      Spicetify.Player.removeEventListener("onprogress", onProgress);
    };
  }, []);

  const hasTrack = !!track;
  const art = (track && track.art) || PLACEHOLDER_ART;
  const title = (track && track.title) || "Nothing playing";
  const artist = (track && track.artist) || "Press play on something in Spotify";
  const progressPct = Math.min(100, Math.round((progress || 0) * 100));
  const elapsed = hasTrack ? safeFormatTime(Spicetify.Player.getProgress()) : "";
  const duration = hasTrack ? safeFormatTime(Spicetify.Player.getDuration()) : "";

  return react.createElement(
    "div",
    { className: "vinyl-app contentSpacing" },
    react.createElement(
      "div",
      { className: "vinyl-stage" },
      react.createElement(
        "div",
        { className: "vinyl-disc" + (isPlaying ? " spinning" : "") },
        react.createElement("div", { className: "vinyl-grooves" }),
        react.createElement(
          "div",
          {
            className: "vinyl-label",
            style: { backgroundImage: "url(" + art + ")" },
          },
          react.createElement("div", { className: "vinyl-spindle" })
        ),
        react.createElement("div", { className: "vinyl-shine" })
      ),
      react.createElement(
        "div",
        {
          className:
            "vinyl-tonearm " + (isPlaying && hasTrack ? "is-down" : "is-up"),
        },
        react.createElement("div", { className: "vinyl-tonearm-base" }),
        react.createElement("div", { className: "vinyl-tonearm-bar" }),
        react.createElement("div", { className: "vinyl-tonearm-head" })
      )
    ),
    react.createElement(
      "div",
      { className: "vinyl-meta" },
      react.createElement("div", { className: "vinyl-title" }, title),
      react.createElement("div", { className: "vinyl-artist" }, artist),
      react.createElement(
        "div",
        { className: "vinyl-progress" },
        react.createElement("div", {
          className: "vinyl-progress-fill",
          style: { width: progressPct + "%" },
        })
      ),
      hasTrack
        ? react.createElement(
            "div",
            { className: "vinyl-time" },
            react.createElement("span", null, elapsed),
            react.createElement("span", null, duration)
          )
        : null
    )
  );
}

// Spicetify looks for this top-level function and mounts whatever it returns.
function render() {
  return react.createElement(VinylVisualizer, null);
}
