import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { Lang } from "../types";
import { DICTIONARIES, LOCALE_TAGS, type UiDictionary } from "./dictionary";

const STORAGE_KEY = "velvetbloom-lang";

function isLang(value: string | null): value is Lang {
  return value === "en" || value === "uk" || value === "ru";
}

function urlLang(): Lang | null {
  if (typeof window === "undefined") return null;
  const param = new URLSearchParams(window.location.search).get("lang");
  return isLang(param) ? param : null;
}

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Lang {
  // The bot deep-links into the mini app with ?lang=, matching whatever the
  // user already picked in the chat. Once here, a manual switch in the UI
  // takes over via localStorage.
  const fromUrl = urlLang();
  if (fromUrl) return fromUrl;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLang(stored) ? stored : "uk";
}

function getServerSnapshot(): Lang {
  return "uk";
}

interface LangContextValue {
  lang: Lang;
  t: UiDictionary;
  locale: string;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function setLang(next: Lang) {
    window.localStorage.setItem(STORAGE_KEY, next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
    emitChange();
  }

  return (
    <LangContext.Provider value={{ lang, t: DICTIONARIES[lang], locale: LOCALE_TAGS[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return ctx;
}
