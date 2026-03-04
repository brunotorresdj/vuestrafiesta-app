import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export interface Notification {
  id: string;
  type: "priority_song" | "new_request" | "info";
  title: string;
  message: string;
  songName?: string;
  artistName?: string;
  guestName?: string;
  timestamp: Date;
  read: boolean;
}

const NOTIFICATIONS_STORAGE_KEY = "@vuestrafiesta_notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [currentToast, setCurrentToast] = useState<Notification | null>(null);

  // Load notifications from storage
  const loadNotifications = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const notifs = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
        setNotifications(notifs);
        setUnreadCount(notifs.filter((n: Notification) => !n.read).length);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  }, []);

  // Save notifications to storage
  const saveNotifications = useCallback(async (notifs: Notification[]) => {
    try {
      await AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifs));
      setNotifications(notifs);
      setUnreadCount(notifs.filter((n) => !n.read).length);
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  }, []);

  // Add a new notification
  const addNotification = useCallback(
    async (
      type: Notification["type"],
      title: string,
      message: string,
      extra?: {
        songName?: string;
        artistName?: string;
        guestName?: string;
      }
    ) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type,
        title,
        message,
        songName: extra?.songName,
        artistName: extra?.artistName,
        guestName: extra?.guestName,
        timestamp: new Date(),
        read: false,
      };

      const updated = [newNotification, ...notifications];
      await saveNotifications(updated);

      // Show toast notification
      setCurrentToast(newNotification);
      setShowToast(true);

      // Trigger haptic feedback for priority songs
      if (type === "priority_song" && Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      // Auto-hide toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
        setCurrentToast(null);
      }, 4000);

      return newNotification;
    },
    [notifications, saveNotifications]
  );

  // Add priority song notification
  const notifyPrioritySong = useCallback(
    async (songName: string, artistName: string, guestName?: string) => {
      return addNotification(
        "priority_song",
        "⭐💍 ¡Canción de los Novios!",
        guestName
          ? `${guestName} ha pedido "${songName}" de ${artistName}`
          : `Alguien ha pedido "${songName}" de ${artistName}`,
        { songName, artistName, guestName }
      );
    },
    [addNotification]
  );

  // Mark notification as read
  const markAsRead = useCallback(
    async (id: string) => {
      const updated = notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      await saveNotifications(updated);
    },
    [notifications, saveNotifications]
  );

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    await saveNotifications(updated);
  }, [notifications, saveNotifications]);

  // Delete notification
  const deleteNotification = useCallback(
    async (id: string) => {
      const updated = notifications.filter((n) => n.id !== id);
      await saveNotifications(updated);
    },
    [notifications, saveNotifications]
  );

  // Clear all notifications
  const clearAllNotifications = useCallback(async () => {
    await AsyncStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  // Dismiss toast
  const dismissToast = useCallback(() => {
    setShowToast(false);
    setCurrentToast(null);
  }, []);

  return {
    notifications,
    unreadCount,
    showToast,
    currentToast,
    loadNotifications,
    addNotification,
    notifyPrioritySong,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    dismissToast,
  };
}
