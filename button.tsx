import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "large" | "medium" | "small";
  children: string;
  className?: string;
}

export function Button({
  onPress,
  disabled = false,
  variant = "primary",
  size = "large",
  children,
  className,
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-primary shadow-lg shadow-primary/30",
    secondary: "bg-surface border border-border shadow-md",
    danger: "bg-error shadow-lg shadow-error/30",
  };

  const sizeStyles = {
    large: "px-6 py-4 rounded-full",
    medium: "px-4 py-3 rounded-full",
    small: "px-3 py-2 rounded-full",
  };

  const textSizeStyles = {
    large: "text-lg",
    medium: "text-base",
    small: "text-sm",
  };

  const textColorStyles = {
    primary: "text-white",
    secondary: "text-primary",
    danger: "text-white",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          opacity: pressed && !disabled ? 0.8 : 1,
          transform: [{ scale: pressed && !disabled ? 0.97 : 1 }],
        },
      ]}
    >
      <View
        className={cn(
          "items-center justify-center",
          variantStyles[variant],
          sizeStyles[size],
          disabled && "opacity-50",
          className
        )}
      >
        <Text
          className={cn(
            "font-semibold",
            textSizeStyles[size],
            textColorStyles[variant]
          )}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}
