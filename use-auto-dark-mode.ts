import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ColorScheme } from "@/constants/theme";

const THEME_PREFERENCE_KEY = "@vuestrafiesta_theme_preference";
const AUTO_DARK_MODE_KEY = "@vuestrafiesta_auto_dark_mode";

export type ThemePreference = "light" | "dark" | "auto";

// Night hours: 20:00 (8 PM) to 07:00 (7 AM)
const NIGHT_START_HOUR = 20;
const NIGHT_END_HOUR = 7;

export function useAutoDarkMode() {
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>("auto");
  const [isNightTime, setIsNightTime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if current time is night time
  const checkIsNightTime = useCallback(() => {
    const currentHour = new Date().getHours();
    return currentHour >= NIGHT_START_HOUR || currentHour < NIGHT_END_HOUR;
  }, []);

  // Get the effective color scheme based on preference and time
  const getEffectiveColorScheme = useCallback((): ColorScheme => {
    if (themePreference === "auto") {
      return isNightTime ? "dark" : "light";
    }
    return themePreference;
  }, [themePreference, isNightTime]);

  // Load saved preference from storage
  const loadPreference = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
      if (stored && (stored === "light" || stored === "dark" || stored === "auto")) {
        setThemePreferenceState(stored as ThemePreference);
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save preference to storage
  const savePreference = useCallback(async (preference: ThemePreference) => {
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, preference);
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  }, []);

  // Set theme preference
  const setThemePreference = useCallback(async (preference: ThemePreference) => {
    setThemePreferenceState(preference);
    await savePreference(preference);
  }, [savePreference]);

  // Toggle between light, dark, and auto
  const toggleTheme = useCallback(async () => {
    const nextPreference: ThemePreference = 
      themePreference === "auto" ? "light" :
      themePreference === "light" ? "dark" : "auto";
    await setThemePreference(nextPreference);
  }, [themePreference, setThemePreference]);

  // Cycle through themes: auto -> light -> dark -> auto
  const cycleTheme = useCallback(async () => {
    await toggleTheme();
  }, [toggleTheme]);

  // Load preference on mount
  useEffect(() => {
    loadPreference();
  }, [loadPreference]);

  // Check night time on mount and every minute
  useEffect(() => {
    setIsNightTime(checkIsNightTime());

    const interval = setInterval(() => {
      setIsNightTime(checkIsNightTime());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [checkIsNightTime]);

  return {
    themePreference,
    setThemePreference,
    toggleTheme,
    cycleTheme,
    isNightTime,
    isLoading,
    effectiveColorScheme: getEffectiveColorScheme(),
    nightStartHour: NIGHT_START_HOUR,
    nightEndHour: NIGHT_END_HOUR,
  };
}
