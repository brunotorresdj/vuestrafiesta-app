import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { NotificationToast } from "@/components/ui/notification-toast";
import { NotificationBadge } from "@/components/ui/notification-badge";
import { ThemeToggleCompact } from "@/components/ui/theme-toggle";
import { useSongRequests, type SongRequest } from "@/hooks/use-song-requests";
import { useNotifications } from "@/hooks/use-notifications";
import { useAutoDarkMode } from "@/hooks/use-auto-dark-mode";
import { useDJCode } from "@/hooks/use-dj-code";
import { DJCodeDisplay } from "@/components/ui/dj-code-display";
import { useThemeContext } from "@/lib/theme-provider";

export default function DJScreen() {
  const router = useRouter();
  const {
    currentCode,
    createNewCode,
  } = useDJCode();
  const { 
    requests, 
    loadRequests, 
    updateStatus, 
    deleteRequest,
    loadMustPlaySongs,
    isMustPlaySong,
    getMustPlaySongDetails,
  } = useSongRequests();
  const {
    notifications,
    unreadCount,
    showToast,
    currentToast,
    loadNotifications,
    markAllAsRead,
    dismissToast,
  } = useNotifications();
  const {
    themePreference,
    isNightTime,
    cycleTheme,
    effectiveColorScheme,
  } = useAutoDarkMode();
  const { setColorScheme } = useThemeContext();
  const [activeTab, setActiveTab] = useState<"pending" | "playing" | "played" | "rejected" | "notifications">("pending");

  // Apply theme when effectiveColorScheme changes
  useEffect(() => {
    setColorScheme(effectiveColorScheme);
  }, [effectiveColorScheme, setColorScheme]);

  // Load requests, must-play songs, and notifications when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadRequests();
      loadMustPlaySongs();
      loadNotifications();
    }, [loadRequests, loadMustPlaySongs, loadNotifications])
  );

  const filteredRequests = requests.filter((r) => r.status === activeTab);
  
  // Sort requests: priority songs first
  const sortedRequests = activeTab !== "notifications" ? [...filteredRequests].sort((a, b) => {
    const aIsPriority = isMustPlaySong(a.song, a.artist);
    const bIsPriority = isMustPlaySong(b.song, b.artist);
    if (aIsPriority && !bIsPriority) return -1;
    if (!aIsPriority && bIsPriority) return 1;
    return 0;
  }) : [];

  const handleStatusChange = async (id: string, newStatus: SongRequest["status"]) => {
    await updateStatus(id, newStatus);
    await loadRequests();
  };

  const handleDelete = async (id: string) => {
    await deleteRequest(id);
    await loadRequests();
  };

  const handleMarkAllNotificationsRead = async () => {
    await markAllAsRead();
    await loadNotifications();
  };

  const statusEmoji = {
    pending: "⏳",
    playing: "▶️",
    played: "✅",
    rejected: "❌",
  };

  const tabs = [
    { id: "pending" as const, label: "Pendientes", emoji: "⏳" },
    { id: "playing" as const, label: "En Reproducción", emoji: "▶️" },
    { id: "played" as const, label: "Reproducidas", emoji: "✅" },
    { id: "rejected" as const, label: "Rechazadas", emoji: "❌" },
    { id: "notifications" as const, label: "Alertas", emoji: "🔔" },
  ];

  const RequestCard = ({ request }: { request: SongRequest }) => {
    const isPriority = isMustPlaySong(request.song, request.artist);
    const priorityDetails = isPriority ? getMustPlaySongDetails(request.song, request.artist) : null;

    return (
      <Card className={`gap-3 mb-3 ${isPriority ? "border-2 border-primary" : ""}`}>
        {/* Priority Badge */}
        {isPriority && (
          <PriorityBadge size="small" showLabel={true} />
        )}

        <View className="gap-1">
          <View className="flex-row items-center gap-2">
            {isPriority && <Text className="text-lg">⭐💍</Text>}
            <Text className="text-lg font-semibold text-foreground flex-1">
              {request.song}
            </Text>
          </View>
          <Text className="text-base text-muted">
            {request.artist}
          </Text>
          {request.guestName && (
            <Text className="text-sm text-muted">
              👤 {request.guestName}
            </Text>
          )}
          {priorityDetails?.notes && (
            <View className="bg-primary/10 rounded-lg p-2 mt-2">
              <Text className="text-xs text-primary font-semibold">
                📝 Nota de los novios: {priorityDetails.notes}
              </Text>
            </View>
          )}
        </View>

        {activeTab === "pending" && (
          <View className="gap-2">
            <Button
              onPress={() => handleStatusChange(request.id, "playing")}
              size="medium"
              className="w-full"
            >
              Reproducir ▶️
            </Button>
            <Button
              onPress={() => handleStatusChange(request.id, "rejected")}
              variant="danger"
              size="medium"
              className="w-full"
            >
              Rechazar ❌
            </Button>
          </View>
        )}

        {activeTab === "playing" && (
          <View className="gap-2">
            <Button
              onPress={() => handleStatusChange(request.id, "played")}
              size="medium"
              className="w-full"
            >
              Reproducida ✅
            </Button>
            <Button
              onPress={() => handleDelete(request.id)}
              variant="secondary"
              size="medium"
              className="w-full"
            >
              Eliminar 🗑️
            </Button>
          </View>
        )}

        {(activeTab === "played" || activeTab === "rejected") && (
          <Button
            onPress={() => handleDelete(request.id)}
            variant="secondary"
            size="medium"
            className="w-full"
          >
            Eliminar 🗑️
          </Button>
        )}
      </Card>
    );
  };

  const NotificationCard = ({ notification }: { notification: any }) => {
    const formatTime = (date: Date) => {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);

      if (minutes < 1) return "Hace un momento";
      if (minutes < 60) return `Hace ${minutes}m`;
      if (hours < 24) return `Hace ${hours}h`;
      return date.toLocaleDateString();
    };

    return (
      <Card className={`gap-3 mb-3 ${!notification.read ? "border-2 border-primary bg-primary/5" : ""}`}>
        <View className="flex-row items-start gap-3">
          <Text className="text-2xl">
            {notification.type === "priority_song" ? "⭐💍" : "🔔"}
          </Text>
          <View className="flex-1">
            <Text className="text-base font-semibold text-foreground">
              {notification.title}
            </Text>
            <Text className="text-sm text-muted mt-1">
              {notification.message}
            </Text>
            {notification.songName && (
              <View className="bg-primary/10 rounded-lg px-2 py-1 mt-2 self-start">
                <Text className="text-xs text-primary font-semibold">
                  🎵 {notification.songName} - {notification.artistName}
                </Text>
              </View>
            )}
            <Text className="text-xs text-muted mt-2">
              {formatTime(notification.timestamp)}
            </Text>
          </View>
          {!notification.read && (
            <View className="bg-primary rounded-full w-3 h-3" />
          )}
        </View>
      </Card>
    );
  };

  // Count priority songs in current tab
  const priorityCount = sortedRequests.filter(r => isMustPlaySong(r.song, r.artist)).length;

  return (
    <ScreenContainer className="p-6">
      {/* Toast Notification */}
      <NotificationToast
        notification={currentToast}
        visible={showToast}
        onDismiss={dismissToast}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <View className="flex-row items-center justify-between gap-2">
              <Button
                onPress={() => router.push("/")}
                variant="secondary"
                size="small"
              >
                ← Atrás
              </Button>
              <Button
                onPress={() => router.push("/dj-history")}
                variant="secondary"
                size="small"
              >
                Historial 📄
              </Button>
              <ThemeToggleCompact
                themePreference={themePreference}
                isNightTime={isNightTime}
                onToggle={cycleTheme}
              />
            </View>
            <View className="flex-row items-center justify-between mt-4">
              <Text className="text-4xl font-bold text-foreground">
                Panel del DJ 🎧
              </Text>
              {unreadCount > 0 && (
                <View className="bg-primary rounded-full px-3 py-1">
                  <Text className="text-sm font-bold text-white">
                    {unreadCount} 🔔
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-base text-muted">
              Gestiona las peticiones de canciones
            </Text>
          </View>

          {/* DJ Code Display */}
          <Card variant="elevated" className="gap-4">
            <DJCodeDisplay
              code={currentCode}
              onGenerateNew={createNewCode}
            />
          </Card>

          {/* Tab Navigation */}
          <View className="gap-3">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="gap-2 flex-row">
                {tabs.map((tab) => (
                  <Pressable
                    key={tab.id}
                    onPress={() => setActiveTab(tab.id)}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                  >
                    <View
                      className={`px-4 py-2 rounded-full ${
                        activeTab === tab.id
                          ? "bg-primary"
                          : "bg-surface border border-border"
                      }`}
                    >
                      <View className="flex-row items-center gap-1">
                        <Text
                          className={`font-semibold ${
                            activeTab === tab.id
                              ? "text-white"
                              : "text-foreground"
                          }`}
                        >
                          {tab.emoji} {tab.label}
                        </Text>
                        {tab.id === "notifications" && unreadCount > 0 && (
                          <View className="bg-error rounded-full min-w-5 h-5 items-center justify-center px-1 ml-1">
                            <Text className="text-xs font-bold text-white">
                              {unreadCount}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </ScrollView>

            {/* Request Count or Notifications Header */}
            {activeTab !== "notifications" ? (
              <View className="bg-warning rounded-lg p-3">
                <Text className="text-sm font-semibold text-foreground">
                  {sortedRequests.length} petición{sortedRequests.length !== 1 ? "es" : ""} en esta sección
                  {priorityCount > 0 && ` (${priorityCount} ⭐💍 prioritaria${priorityCount !== 1 ? "s" : ""})`}
                </Text>
              </View>
            ) : (
              <View className="flex-row items-center justify-between">
                <View className="bg-primary/10 rounded-lg p-3 flex-1">
                  <Text className="text-sm font-semibold text-primary">
                    🔔 {notifications.length} notificación{notifications.length !== 1 ? "es" : ""}
                    {unreadCount > 0 && ` (${unreadCount} sin leer)`}
                  </Text>
                </View>
                {unreadCount > 0 && (
                  <Button
                    onPress={handleMarkAllNotificationsRead}
                    variant="secondary"
                    size="small"
                    className="ml-2"
                  >
                    Marcar leídas
                  </Button>
                )}
              </View>
            )}
          </View>

          {/* Content */}
          {activeTab === "notifications" ? (
            // Notifications List
            notifications.length > 0 ? (
              <View>
                {notifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </View>
            ) : (
              <Card className="gap-3 p-6 items-center">
                <Text className="text-4xl">🔔</Text>
                <Text className="text-lg font-semibold text-foreground text-center">
                  No hay notificaciones
                </Text>
                <Text className="text-sm text-muted text-center">
                  Recibirás alertas cuando alguien pida una canción de los novios
                </Text>
              </Card>
            )
          ) : (
            // Requests List
            sortedRequests.length > 0 ? (
              <View>
                {sortedRequests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </View>
            ) : (
              <Card className="gap-3 p-6 items-center">
                <Text className="text-4xl">
                  {activeTab === "pending" ? "🎉" : "✨"}
                </Text>
                <Text className="text-lg font-semibold text-foreground text-center">
                  {activeTab === "pending"
                    ? "No hay peticiones pendientes"
                    : "Sección vacía"}
                </Text>
                <Text className="text-sm text-muted text-center">
                  {activeTab === "pending"
                    ? "Los invitados verán tus peticiones aquí"
                    : "Las peticiones aparecerán cuando cambien de estado"}
                </Text>
              </Card>
            )
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
