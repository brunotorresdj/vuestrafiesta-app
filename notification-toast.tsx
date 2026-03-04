import { View, Text, Pressable, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Notification } from "@/hooks/use-notifications";

export interface NotificationToastProps {
  notification: Notification | null;
  visible: boolean;
  onDismiss: () => void;
  className?: string;
}

export function NotificationToast({
  notification,
  visible,
  onDismiss,
  className,
}: NotificationToastProps) {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, opacityAnim]);

  if (!notification) return null;

  const getBackgroundColor = () => {
    switch (notification.type) {
      case "priority_song":
        return "bg-primary";
      case "new_request":
        return "bg-success";
      default:
        return "bg-surface";
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case "priority_song":
        return "⭐💍";
      case "new_request":
        return "🎵";
      default:
        return "ℹ️";
    }
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        opacity: opacityAnim,
        position: "absolute",
        top: 50,
        left: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <Pressable
        onPress={onDismiss}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <View
          className={cn(
            "rounded-2xl p-4 shadow-lg",
            getBackgroundColor(),
            className
          )}
        >
          <View className="flex-row items-start gap-3">
            <Text className="text-2xl">{getIcon()}</Text>
            <View className="flex-1">
              <Text className="text-base font-bold text-white">
                {notification.title}
              </Text>
              <Text className="text-sm text-white/90 mt-1">
                {notification.message}
              </Text>
              {notification.songName && (
                <View className="bg-white/20 rounded-lg px-2 py-1 mt-2 self-start">
                  <Text className="text-xs text-white font-semibold">
                    🎵 {notification.songName} - {notification.artistName}
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-white/70 text-xs">✕</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
