import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";
import type { ThemePreference } from "@/hooks/use-auto-dark-mode";

export interface ThemeToggleProps {
  themePreference: ThemePreference;
  isNightTime: boolean;
  onToggle: () => void;
  className?: string;
}

export function ThemeToggle({
  themePreference,
  isNightTime,
  onToggle,
  className,
}: ThemeToggleProps) {
  const getIcon = () => {
    switch (themePreference) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "auto":
        return isNightTime ? "🌙" : "☀️";
    }
  };

  const getLabel = () => {
    switch (themePreference) {
      case "light":
        return "Claro";
      case "dark":
        return "Oscuro";
      case "auto":
        return "Auto";
    }
  };

  const getDescription = () => {
    if (themePreference === "auto") {
      return isNightTime ? "Modo nocturno activo" : "Modo diurno activo";
    }
    return themePreference === "dark" ? "Modo oscuro fijo" : "Modo claro fijo";
  };

  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View
        className={cn(
          "flex-row items-center gap-3 bg-surface rounded-xl p-3 border border-border",
          className
        )}
      >
        <View className="bg-primary/10 rounded-full w-10 h-10 items-center justify-center">
          <Text className="text-xl">{getIcon()}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold text-foreground">
            Tema: {getLabel()}
          </Text>
          <Text className="text-xs text-muted">
            {getDescription()}
          </Text>
        </View>
        <View className="bg-primary/20 rounded-full px-2 py-1">
          <Text className="text-xs text-primary font-semibold">
            Cambiar
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export function ThemeToggleCompact({
  themePreference,
  isNightTime,
  onToggle,
  className,
}: ThemeToggleProps) {
  const getIcon = () => {
    switch (themePreference) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "auto":
        return isNightTime ? "🌙" : "☀️";
    }
  };

  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View
        className={cn(
          "flex-row items-center gap-2 bg-surface rounded-full px-3 py-2 border border-border",
          className
        )}
      >
        <Text className="text-lg">{getIcon()}</Text>
        <Text className="text-xs font-semibold text-foreground">
          {themePreference === "auto" ? "Auto" : themePreference === "dark" ? "Oscuro" : "Claro"}
        </Text>
      </View>
    </Pressable>
  );
}
