"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useUISounds } from "./ui-sound-provider";
import "./theme-switcher.css";

export function SoundToggle() {
  const { enabled, mounted, toggleSound } = useUISounds();
  return (
    <button
      type="button"
      className="sound-toggle"
      data-ui-sound="mute"
      aria-label="Interface sounds"
      aria-pressed={enabled}
      title={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      disabled={!mounted}
      onClick={toggleSound}
    >
      {enabled ? <Volume2 size={17} aria-hidden="true" /> : <VolumeX size={17} aria-hidden="true" />}
    </button>
  );
}
