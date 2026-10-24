"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { createUISoundEngine, type UISound } from "@/lib/ui-audio";
import { portfolioThemeNames, type PortfolioTheme } from "@/lib/portfolio-themes";

const STORAGE_KEY = "portfolio-ui-sound";
const CONTROL_SELECTOR = 'button, a[href], [role="button"], .portfolio-project-card, .about-focus-area';

type UISounds = {
  enabled: boolean;
  mounted: boolean;
  toggleSound: () => void;
  unlock: () => Promise<boolean>;
  play: (sound: UISound, theme?: PortfolioTheme) => void;
  stop: () => void;
};

const UISoundContext = React.createContext<UISounds | null>(null);

function getControl(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  const control = target.closest<HTMLElement>(CONTROL_SELECTOR);
  if (!control || control.closest("[inert]")) return null;
  if (control.hasAttribute("disabled") || control.getAttribute("aria-disabled") === "true") return null;
  return control;
}

export function UISoundProvider({ children }: { children: React.ReactNode }) {
  const { theme: savedTheme } = useTheme();
  const theme = React.useRef<PortfolioTheme>("dark");
  const engine = React.useRef<ReturnType<typeof createUISoundEngine> | null>(null);
  const enabledRef = React.useRef(true);
  const playbackVersion = React.useRef(0);
  const [enabled, setEnabled] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    theme.current = savedTheme === "grimoire" || savedTheme === "rebel" ? savedTheme : "dark";
  }, [savedTheme]);

  const getEngine = React.useCallback(() => {
    if (!engine.current) engine.current = createUISoundEngine();
    return engine.current;
  }, []);

  const unlock = React.useCallback(async () => {
    if (!enabledRef.current || document.hidden) return false;
    const version = playbackVersion.current;
    await getEngine().unlock();
    return version === playbackVersion.current && enabledRef.current && !document.hidden;
  }, [getEngine]);

  const play = React.useCallback((sound: UISound, selectedTheme?: PortfolioTheme) => {
    if (enabledRef.current && !document.hidden) engine.current?.play(sound, selectedTheme ?? theme.current);
  }, []);

  const stop = React.useCallback(() => {
    playbackVersion.current += 1;
    engine.current?.stop();
  }, []);

  const toggleSound = React.useCallback(() => {
    playbackVersion.current += 1;
    const nextEnabled = !enabledRef.current;
    enabledRef.current = nextEnabled;
    setEnabled(nextEnabled);
    const audio = getEngine();
    audio.setEnabled(nextEnabled);
    try { localStorage.setItem(STORAGE_KEY, nextEnabled ? "on" : "off"); } catch {}
    if (nextEnabled) void unlock().then((ready) => { if (ready) play("activate"); });
  }, [getEngine, play, unlock]);

  React.useEffect(() => {
    let initialEnabled = true;
    try { initialEnabled = localStorage.getItem(STORAGE_KEY) !== "off"; } catch {}
    enabledRef.current = initialEnabled;
    setEnabled(initialEnabled);
    getEngine().setEnabled(initialEnabled);
    setMounted(true);
    let keyboardNavigation = false;

    const onPointerDown = (event: PointerEvent) => {
      keyboardNavigation = false;
      if (event.isTrusted) void unlock();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      keyboardNavigation = event.key === "Tab" || event.key.startsWith("Arrow");
      if (event.isTrusted && ["Tab", "Enter", " ", "Escape", "ArrowLeft", "ArrowRight"].includes(event.key)) void unlock();
    };
    const preview = (control: HTMLElement) => {
      if (control.dataset.uiSound === "mute") return;
      if (document.querySelector('.theme-switcher[aria-busy="true"]')) return;
      const option = portfolioThemeNames.find((name) => name === control.dataset.themeOption);
      play("hover", option);
    };
    const onPointerOver = (event: PointerEvent) => {
      if (!event.isTrusted || event.pointerType === "touch") return;
      const control = getControl(event.target);
      if (!control || (event.relatedTarget instanceof Node && control.contains(event.relatedTarget))) return;
      preview(control);
    };
    const onFocus = (event: FocusEvent) => {
      if (!keyboardNavigation) return;
      const control = getControl(event.target);
      if (control) preview(control);
    };
    const onClick = (event: MouseEvent) => {
      if (!event.isTrusted) return;
      const control = getControl(event.target);
      if (!control || control.dataset.uiSound === "mute" || control.dataset.uiSound === "theme") return;
      // Native dialog close handles buttons, backdrop and Escape in one place.
      if (control.getAttribute("aria-label") === "Close") return;
      const sound: UISound = control.getAttribute("aria-haspopup") === "dialog" || control.matches(".portfolio-project-card")
        ? "open"
        : control.closest("nav") || control.hasAttribute("aria-pressed") || /service/i.test(control.getAttribute("aria-label") ?? "")
          ? "navigate"
          : "activate";
      void unlock().then((ready) => { if (ready) play(sound); });
    };
    const onClose = (event: Event) => {
      if (event.target instanceof HTMLDialogElement) {
        stop();
        play("close");
      }
    };
    const onVisibility = () => { if (document.hidden) stop(); };
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      playbackVersion.current += 1;
      const nextEnabled = event.newValue !== "off";
      enabledRef.current = nextEnabled;
      setEnabled(nextEnabled);
      engine.current?.setEnabled(nextEnabled);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("focusin", onFocus, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("close", onClose, true);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("storage", onStorage);
    return () => {
      playbackVersion.current += 1;
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("focusin", onFocus, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("close", onClose, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("storage", onStorage);
      engine.current?.dispose();
      engine.current = null;
    };
  }, [getEngine, play, stop, unlock]);

  const value = React.useMemo(() => ({ enabled, mounted, toggleSound, unlock, play, stop }), [enabled, mounted, toggleSound, unlock, play, stop]);
  return <UISoundContext.Provider value={value}>{children}</UISoundContext.Provider>;
}

export function useUISounds() {
  const context = React.useContext(UISoundContext);
  if (!context) throw new Error("useUISounds must be used within UISoundProvider");
  return context;
}
