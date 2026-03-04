import { ScrollView, Text, View, Alert, Pressable } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSongRequests, type MustPlaySong } from "@/hooks/use-song-requests";

export default function GroomsListScreen() {
  const router = useRouter();
  const { 
    mustPlaySongs, 
    messagesCount,
    loadMustPlaySongs, 
    loadMessages,
    deleteMustPlaySong, 
    clearMustPlaySongs 
  } = useSongRequests();

  // Load songs and messages when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadMustPlaySongs();
      loadMessages();
    }, [loadMustPlaySongs, loadMessages])
  );

  const handleDeleteSong = (id: string, songName: string) => {
    Alert.alert(
      "Eliminar canción",
      `¿Estás seguro de que quieres eliminar "${songName}"?`,
      [
        { text: "Cancelar", onPress: () => {} },
        {
          text: "Eliminar",
          onPress: async () => {
            await deleteMustPlaySong(id);
            await loadMustPlaySongs();
          },
          style: "destructive",
        },
      ]
    );
  };

  const SongCard = ({ song }: { song: MustPlaySong }) => (
    <Card className="gap-3 mb-3">
      <View className="gap-1">
        <Text className="text-lg font-semibold text-foreground">
          {song.song}
        </Text>
        <Text className="text-base text-muted">{song.artist}</Text>
        {song.notes && (
          <Text className="text-sm text-muted italic mt-2">
            📝 {song.notes}
          </Text>
        )}
      </View>

      <View className="gap-2">
        <Button
          onPress={() => handleDeleteSong(song.id, song.song)}
          variant="danger"
          size="small"
          className="w-full"
        >
          Eliminar 🗑️
        </Button>
      </View>
    </Card>
  );

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Button
              onPress={() => router.push("/grooms")}
              variant="secondary"
              size="small"
              className="self-start"
            >
              ← Atrás
            </Button>
            <Text className="text-4xl font-bold text-foreground mt-4">
              Vuestra Lista 📋
            </Text>
            <Text className="text-base text-muted">
              Canciones imprescindibles para vuestra boda
            </Text>
          </View>

          {/* Messages Card - New Feature */}
          <Pressable
            onPress={() => router.push("/grooms-messages")}
            style={({ pressed }) => [
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Card className="gap-3 p-4 bg-primary/10 border border-primary">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Text className="text-3xl">💌</Text>
                  <View>
                    <Text className="text-base font-semibold text-primary">
                      Mensajes de Felicitación
                    </Text>
                    <Text className="text-sm text-primary">
                      {messagesCount > 0 
                        ? `${messagesCount} mensaje${messagesCount !== 1 ? "s" : ""} de los invitados`
                        : "Los invitados pueden dejaros mensajes"}
                    </Text>
                  </View>
                </View>
                <View className="bg-primary rounded-full px-3 py-1">
                  <Text className="text-sm font-bold text-white">
                    {messagesCount > 0 ? messagesCount : "→"}
                  </Text>
                </View>
              </View>
            </Card>
          </Pressable>

          {/* Stats */}
          {mustPlaySongs.length > 0 && (
            <Card className="gap-2 p-4 bg-primary">
              <Text className="text-sm font-semibold text-white text-center">
                Total de canciones: {mustPlaySongs.length}
              </Text>
            </Card>
          )}

          {/* Songs List */}
          {mustPlaySongs.length > 0 ? (
            <View>
              {mustPlaySongs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </View>
          ) : (
            <Card className="gap-3 p-6 items-center">
              <Text className="text-4xl">🎵</Text>
              <Text className="text-lg font-semibold text-foreground text-center">
                No hay canciones en la lista
              </Text>
              <Text className="text-sm text-muted text-center">
                ¡Añade las canciones que no pueden faltar en vuestra boda!
              </Text>
            </Card>
          )}

          {/* Action Buttons */}
          <View className="gap-3">
            <Button
              onPress={() => router.push("/grooms-add")}
              size="large"
              className="w-full"
            >
              Añadir Otra Canción ➕
            </Button>

            {mustPlaySongs.length > 0 && (
              <Button
                onPress={() => {
                  Alert.alert(
                    "Limpiar lista",
                    "¿Estás seguro de que quieres eliminar todas las canciones?",
                    [
                      { text: "Cancelar", onPress: () => {} },
                      {
                        text: "Eliminar todo",
                        onPress: async () => {
                          await clearMustPlaySongs();
                          await loadMustPlaySongs();
                        },
                        style: "destructive",
                      },
                    ]
                  );
                }}
                variant="secondary"
                size="medium"
                className="w-full"
              >
                Limpiar Lista 🗑️
              </Button>
            )}
          </View>

          {/* Info */}
          <Card className="gap-2 p-4">
            <Text className="text-sm font-semibold text-foreground">
              💡 Información
            </Text>
            <Text className="text-xs text-muted">
              • Estas canciones aparecerán destacadas para el DJ
            </Text>
            <Text className="text-xs text-muted">
              • Los invitados verán que son canciones prioritarias
            </Text>
            <Text className="text-xs text-muted">
              • Puedes editar la lista en cualquier momento
            </Text>
            <Text className="text-xs text-muted">
              • 💌 Los invitados pueden dejaros mensajes de felicitación
            </Text>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
