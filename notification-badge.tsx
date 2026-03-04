import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface NotificationBadgeProps {
  count: number;
  className?: string;
}

export function NotificationBadge({ count, className }: NotificationBadgeProps) {
  if (count === 0) return null;

  return (
    <View
      className={cn(
        "absolute -top-1 -right-1 bg-error rounded-full min-w-5 h-5 items-center justify-center px-1",
        className
      )}
    >
      <Text className="text-xs font-bold text-white">
        {count > 99 ? "99+" : count}
      </Text>
    </View>
  );
}
