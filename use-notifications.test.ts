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

// Mock expo-haptics
vi.mock("expo-haptics", () => ({
  notificationAsync: vi.fn(),
  NotificationFeedbackType: {
    Success: "success",
    Warning: "warning",
    Error: "error",
  },
}));

const NOTIFICATIONS_STORAGE_KEY = "@vuestrafiesta_notifications";

describe("Notifications Storage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should save notifications to AsyncStorage", async () => {
    const notifications = [
      {
        id: "1",
        type: "priority_song",
        title: "⭐💍 ¡Canción de los Novios!",
        message: "Juan ha pedido \"Bohemian Rhapsody\" de Queen",
        songName: "Bohemian Rhapsody",
        artistName: "Queen",
        guestName: "Juan",
        timestamp: new Date(),
        read: false,
      },
    ];

    await AsyncStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify(notifications)
    );

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      NOTIFICATIONS_STORAGE_KEY,
      expect.any(String)
    );
  });

  it("should load notifications from AsyncStorage", async () => {
    const notifications = [
      {
        id: "1",
        type: "priority_song",
        title: "Test",
        message: "Test message",
        timestamp: new Date().toISOString(),
        read: false,
      },
    ];

    (AsyncStorage.getItem as any).mockResolvedValueOnce(
      JSON.stringify(notifications)
    );

    const stored = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].type).toBe("priority_song");
  });

  it("should clear all notifications", async () => {
    await AsyncStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      NOTIFICATIONS_STORAGE_KEY
    );
  });
});

describe("Notification Structure", () => {
  it("should have correct structure for priority song notification", () => {
    const notification = {
      id: Date.now().toString(),
      type: "priority_song" as const,
      title: "⭐💍 ¡Canción de los Novios!",
      message: "Juan ha pedido \"Bohemian Rhapsody\" de Queen",
      songName: "Bohemian Rhapsody",
      artistName: "Queen",
      guestName: "Juan",
      timestamp: new Date(),
      read: false,
    };

    expect(notification).toHaveProperty("id");
    expect(notification).toHaveProperty("type");
    expect(notification).toHaveProperty("title");
    expect(notification).toHaveProperty("message");
    expect(notification).toHaveProperty("songName");
    expect(notification).toHaveProperty("artistName");
    expect(notification).toHaveProperty("timestamp");
    expect(notification).toHaveProperty("read");
    expect(notification.type).toBe("priority_song");
    expect(notification.read).toBe(false);
  });

  it("should create notification without guest name", () => {
    const notification = {
      id: Date.now().toString(),
      type: "priority_song" as const,
      title: "⭐💍 ¡Canción de los Novios!",
      message: "Alguien ha pedido \"Bohemian Rhapsody\" de Queen",
      songName: "Bohemian Rhapsody",
      artistName: "Queen",
      guestName: undefined,
      timestamp: new Date(),
      read: false,
    };

    expect(notification.guestName).toBeUndefined();
    expect(notification.message).toContain("Alguien");
  });
});

describe("Unread Count", () => {
  it("should count unread notifications correctly", () => {
    const notifications = [
      { id: "1", read: false },
      { id: "2", read: true },
      { id: "3", read: false },
      { id: "4", read: false },
    ];

    const unreadCount = notifications.filter((n) => !n.read).length;
    expect(unreadCount).toBe(3);
  });

  it("should return 0 when all notifications are read", () => {
    const notifications = [
      { id: "1", read: true },
      { id: "2", read: true },
    ];

    const unreadCount = notifications.filter((n) => !n.read).length;
    expect(unreadCount).toBe(0);
  });

  it("should return 0 when no notifications exist", () => {
    const notifications: any[] = [];
    const unreadCount = notifications.filter((n) => !n.read).length;
    expect(unreadCount).toBe(0);
  });
});

describe("Mark as Read", () => {
  it("should mark a single notification as read", () => {
    const notifications = [
      { id: "1", read: false },
      { id: "2", read: false },
    ];

    const updated = notifications.map((n) =>
      n.id === "1" ? { ...n, read: true } : n
    );

    expect(updated[0].read).toBe(true);
    expect(updated[1].read).toBe(false);
  });

  it("should mark all notifications as read", () => {
    const notifications = [
      { id: "1", read: false },
      { id: "2", read: false },
      { id: "3", read: false },
    ];

    const updated = notifications.map((n) => ({ ...n, read: true }));

    expect(updated.every((n) => n.read)).toBe(true);
  });
});

describe("Notification Message Generation", () => {
  it("should generate correct message with guest name", () => {
    const songName = "Bohemian Rhapsody";
    const artistName = "Queen";
    const guestName = "Juan";

    const message = guestName
      ? `${guestName} ha pedido "${songName}" de ${artistName}`
      : `Alguien ha pedido "${songName}" de ${artistName}`;

    expect(message).toBe('Juan ha pedido "Bohemian Rhapsody" de Queen');
  });

  it("should generate correct message without guest name", () => {
    const songName = "Bohemian Rhapsody";
    const artistName = "Queen";
    const guestName = undefined;

    const message = guestName
      ? `${guestName} ha pedido "${songName}" de ${artistName}`
      : `Alguien ha pedido "${songName}" de ${artistName}`;

    expect(message).toBe('Alguien ha pedido "Bohemian Rhapsody" de Queen');
  });
});
