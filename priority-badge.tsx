import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface PriorityBadgeProps {
  notes?: string;
  size?: "small" | "medium" | "large";
  showLabel?: boolean;
  className?: string;
}

export function PriorityBadge({
  notes,
  size = "medium",
  showLabel = true,
  className,
}: PriorityBadgeProps) {
  const sizeStyles = {
    small: "px-2 py-1",
    medium: "px-3 py-1.5",
    large: "px-4 py-2",
  };

  const textSizeStyles = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };

  return (
    <View
      className={cn(
        "bg-primary rounded-full flex-row items-center gap-1",
        sizeStyles[size],
        className
      )}
    >
      <Text className={cn("text-white", textSizeStyles[size])}>⭐💍</Text>
      {showLabel && (
        <Text className={cn("text-white font-semibold", textSizeStyles[size])}>
          Favorita de los novios
        </Text>
      )}
    </View>
  );
}

export function PriorityIndicator({ className }: { className?: string }) {
  return (
    <View className={cn("flex-row items-center gap-1", className)}>
      <Text className="text-lg">⭐💍</Text>
    </View>
  );
}
