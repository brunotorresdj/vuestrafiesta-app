import { ScrollView, Text, View, FlatList } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { useSongRequests, type SongRequest } from "@/hooks/use-song-requests";

export default function GuestHistoryScreen() {
  const router = useRouter();
  const { requests, loadRequests, loadMustPlaySongs, isMustPlaySong } = useSongRequests();

  // Load requests and must-play songs when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadRequests();
      loadMustPlaySongs();
    }, [loadRequests, loadMustPlaySongs])
  );

  const statusEmoji = {
    pending: "⏳",
    playing: "▶️",
    played: "✅",
    rejected: "❌",
  };

  const statusLabel = {
    pending: "Pendiente",
    playing: "En reproducción",
    played: "Reproducida",
    rejected: "No disponible",
  };

  const statusColor = {
    pending: "bg-warning",
    playing: "bg-primary",
    played: "bg-success",
    rejected: "bg-error",
  };

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

  const RequestCard = ({ request }: { request: SongRequest }) => {
    const isPriority = isMustPlaySong(request.song, request.artist);

    return (
      <Card className={`gap-3 mb-3 ${isPriority ? "border-2 border-primary" : ""}`}>
        {/* Priority Badge */}
        {isPriority && (
          <PriorityBadge size="small" showLabel={true} />
        )}

        <View className="flex-row justify-between items-start gap-3">
          <View className="flex-1 gap-1">
            <View className="flex-row items-center gap-2">
              {isPriority && <Text className="text-lg">⭐💍</Text>}
              <Text className="text-lg font-semibold text-foreground flex-1">
                {request.song}
              </Text>
            </View>
            <Text className="text-base text-muted">
              {request.artist}
            </Text>
            <Text className="text-xs text-muted mt-1">
              {formatTime(request.timestamp)}
            </Text>
          </View>
          <View className={`${statusColor[request.status]} rounded-full px-3 py-1`}>
            <Text className="text-sm font-semibold text-white">
              {statusEmoji[request.status]}
            </Text>
          </View>
        </View>
        <View className={`${statusColor[request.status]} rounded-lg p-2`}>
          <Text className="text-sm font-semibold text-white text-center">
            {statusLabel[request.status]}
          </Text>
        </View>
      </Card>
    );
  };

  // Count priority songs
  const priorityCount = requests.filter(r => isMustPlaySong(r.song, r.artist)).length;

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Button
              onPress={() => router.push("/")}
              variant="secondary"
              size="small"
              className="self-start"
            >
              ← Atrás
            </Button>
            <Text className="text-4xl font-bold text-foreground mt-4">
              Tus Peticiones 📋
            </Text>
            <Text className="text-base text-muted">
              Historial de canciones solicitadas
            </Text>
          </View>

          {/* Stats */}
          <View className="gap-2 flex-row">
            <Card className="flex-1 items-center p-3">
              <Text className="text-2xl">⏳</Text>
              <Text className="text-xs text-muted mt-1">Pendientes</Text>
              <Text className="text-xl font-bold text-foreground">
                {requests.filter((r) => r.status === "pending").length}
              </Text>
            </Card>
            <Card className="flex-1 items-center p-3">
              <Text className="text-2xl">✅</Text>
              <Text className="text-xs text-muted mt-1">Reproducidas</Text>
              <Text className="text-xl font-bold text-foreground">
                {requests.filter((r) => r.status === "played").length}
              </Text>
            </Card>
            <Card className="flex-1 items-center p-3">
              <Text className="text-2xl">▶️</Text>
              <Text className="text-xs text-muted mt-1">En reproducción</Text>
              <Text className="text-xl font-bold text-foreground">
                {requests.filter((r) => r.status === "playing").length}
              </Text>
            </Card>
          </View>

          {/* Priority Info */}
          {priorityCount > 0 && (
            <Card className="gap-2 p-4 bg-primary/10 border border-primary">
              <Text className="text-sm font-semibold text-primary text-center">
                ⭐💍 {priorityCount} canción{priorityCount !== 1 ? "es" : ""} favorita{priorityCount !== 1 ? "s" : ""} de los novios
              </Text>
            </Card>
          )}

          {/* Requests List */}
          {requests.length > 0 ? (
            <View>
              {requests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </View>
          ) : (
            <Card className="gap-3 p-6 items-center">
              <Text className="text-4xl">🎵</Text>
              <Text className="text-lg font-semibold text-foreground text-center">
                No has pedido canciones aún
              </Text>
              <Text className="text-sm text-muted text-center">
                ¡Pide tu primera canción ahora!
              </Text>
            </Card>
          )}

          {/* Action Button */}
          <Button
            onPress={() => router.push("/guest")}
            size="large"
            className="w-full"
          >
            Pedir Otra Canción 🎵
          </Button>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
