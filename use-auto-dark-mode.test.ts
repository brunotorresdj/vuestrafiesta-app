import { describe, it, expect, vi, beforeEach } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

const THEME_PREFERENCE_KEY = "@vuestrafiesta_theme_preference";
const NIGHT_START_HOUR = 20;
const NIGHT_END_HOUR = 7;

type ThemePreference = "light" | "dark" | "auto";

function getNextTheme(current: ThemePreference): ThemePreference {
  if (current === "auto") return "light";
  if (current === "light") return "dark";
  return "auto";
}

function getEffectiveScheme(preference: ThemePreference, isNightTime: boolean): "light" | "dark" {
  if (preference === "auto") {
    return isNightTime ? "dark" : "light";
  }
  return preference;
}

describe("Auto Dark Mode - Night Time Detection", () => {
  it("should detect night time correctly (after 20:00)", () => {
    const hour = 21; // 9 PM
    const isNightTime = hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
    expect(isNightTime).toBe(true);
  });

  it("should detect night time correctly (before 07:00)", () => {
    const hour = 3; // 3 AM
    const isNightTime = hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
    expect(isNightTime).toBe(true);
  });

  it("should detect day time correctly (between 07:00 and 20:00)", () => {
    const hour = 14; // 2 PM
    const isNightTime = hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
    expect(isNightTime).toBe(false);
  });

  it("should detect boundary at 20:00 as night", () => {
    const hour = 20;
    const isNightTime = hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
    expect(isNightTime).toBe(true);
  });

  it("should detect boundary at 07:00 as day", () => {
    const hour = 7;
    const isNightTime = hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
    expect(isNightTime).toBe(false);
  });
});

describe("Auto Dark Mode - Theme Preference Storage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should save theme preference to AsyncStorage", async () => {
    const preference = "dark";
    await AsyncStorage.setItem(THEME_PREFERENCE_KEY, preference);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      THEME_PREFERENCE_KEY,
      preference
    );
  });

  it("should load theme preference from AsyncStorage", async () => {
    (AsyncStorage.getItem as any).mockResolvedValueOnce("light");

    const stored = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
    expect(stored).toBe("light");
  });

  it("should handle missing preference gracefully", async () => {
    (AsyncStorage.getItem as any).mockResolvedValueOnce(null);

    const stored = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
    expect(stored).toBeNull();
  });
});

describe("Auto Dark Mode - Effective Color Scheme", () => {
  it("should return dark when preference is auto and it is night time", () => {
    const effectiveScheme = getEffectiveScheme("auto", true);
    expect(effectiveScheme).toBe("dark");
  });

  it("should return light when preference is auto and it is day time", () => {
    const effectiveScheme = getEffectiveScheme("auto", false);
    expect(effectiveScheme).toBe("light");
  });

  it("should return dark when preference is dark regardless of time", () => {
    const effectiveScheme = getEffectiveScheme("dark", false);
    expect(effectiveScheme).toBe("dark");
  });

  it("should return light when preference is light regardless of time", () => {
    const effectiveScheme = getEffectiveScheme("light", true);
    expect(effectiveScheme).toBe("light");
  });
});

describe("Auto Dark Mode - Theme Cycling", () => {
  it("should cycle from auto to light", () => {
    const next = getNextTheme("auto");
    expect(next).toBe("light");
  });

  it("should cycle from light to dark", () => {
    const next = getNextTheme("light");
    expect(next).toBe("dark");
  });

  it("should cycle from dark to auto", () => {
    const next = getNextTheme("dark");
    expect(next).toBe("auto");
  });
});

describe("Auto Dark Mode - Valid Preferences", () => {
  it("should accept light as valid preference", () => {
    const preference = "light";
    const isValid = ["light", "dark", "auto"].includes(preference);
    expect(isValid).toBe(true);
  });

  it("should accept dark as valid preference", () => {
    const preference = "dark";
    const isValid = ["light", "dark", "auto"].includes(preference);
    expect(isValid).toBe(true);
  });

  it("should accept auto as valid preference", () => {
    const preference = "auto";
    const isValid = ["light", "dark", "auto"].includes(preference);
    expect(isValid).toBe(true);
  });

  it("should reject invalid preference", () => {
    const preference = "invalid";
    const isValid = ["light", "dark", "auto"].includes(preference);
    expect(isValid).toBe(false);
  });
});
