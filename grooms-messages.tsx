import { ScrollView, Text, View, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSongRequests, type CongratulationMessage } from "@/hooks/use-song-requests";

export default function GroomsMessagesScreen() {
  const router = useRouter();
  const { 
    messages, 
    messagesCount,
    loadMessages, 
    deleteMessage,
    clearMessages,
  } = useSongRequests();

  // Load messages when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadMessages();
    }, [loadMessages])
  );

  const handleDeleteMessage = async (id: string) => {
    Alert.alert(
      "Eliminar Mensaje",
      "¿Estás seguro de que quieres eliminar este mensaje?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await deleteMessage(id);
            await loadMessages();
          },
        },
      ]
    );
  };

  const handleClearAll = async () => {
    if (messagesCount === 0) return;

    Alert.alert(
      "Eliminar Todos los Mensajes",
      `¿Estás seguro de que quieres eliminar los ${messagesCount} mensajes?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar Todo",
          style: "destructive",
          onPress: async () => {
            await clearMessages();
            await loadMessages();
          },
        },
      ]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const MessageCard = ({ msg }: { msg: CongratulationMessage }) => (
    <Card className="gap-3 mb-4">
      {/* Header */}
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center gap-2 flex-1">
          <Text className="text-2xl">💌</Text>
          <View className="flex-1">
            <Text className="text-base font-semibold text-foreground">
              {msg.guestName}
            </Text>
            <Text className="text-xs text-muted">
              {formatDate(msg.timestamp)}
            </Text>
          </View>
        </View>
      </View>

      {/* Message */}
      <View className="bg-surface rounded-xl p-4">
        <Text className="text-base text-foreground leading-relaxed italic">
          "{msg.message}"
        </Text>
      </View>

      {/* Song Request Info */}
      {msg.songRequest && (
        <View className="bg-primary/10 rounded-lg p-3 flex-row items-center gap-2">
          <Text className="text-lg">🎵</Text>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-primary">
              {msg.songRequest.song}
            </Text>
            <Text className="text-xs text-primary">
              {msg.songRequest.artist}
            </Text>
          </View>
        </View>
      )}

      {/* Delete Button */}
      <Button
        onPress={() => handleDeleteMessage(msg.id)}
        variant="secondary"
        size="small"
        className="self-end"
      >
        Eliminar 🗑️
      </Button>
    </Card>
  );

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Button
              onPress={() => router.push("/grooms-list")}
              variant="secondary"
              size="small"
              className="self-start"
            >
              ← Atrás
            </Button>
            <Text className="text-4xl font-bold text-foreground mt-4">
              Mensajes 💌
            </Text>
            <Text className="text-base text-muted">
              Mensajes de felicitación de los invitados
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row gap-4">
            <Card className="flex-1 items-center p-4">
              <Text className="text-3xl font-bold text-primary">
                {messagesCount}
              </Text>
              <Text className="text-xs text-muted text-center">
                Mensajes Recibidos
              </Text>
            </Card>
            <Card className="flex-1 items-center p-4">
              <Text className="text-3xl">💕</Text>
              <Text className="text-xs text-muted text-center">
                Con Amor
              </Text>
            </Card>
          </View>

          {/* Clear All Button */}
          {messagesCount > 0 && (
            <Button
              onPress={handleClearAll}
              variant="danger"
              size="small"
              className="self-end"
            >
              Eliminar Todos 🗑️
            </Button>
          )}

          {/* Messages List */}
          {messagesCount > 0 ? (
            <View>
              {messages.map((msg) => (
                <MessageCard key={msg.id} msg={msg} />
              ))}
            </View>
          ) : (
            <Card className="gap-4 p-6 items-center">
              <Text className="text-5xl">💌</Text>
              <Text className="text-lg font-semibold text-foreground text-center">
                No hay mensajes todavía
              </Text>
              <Text className="text-sm text-muted text-center">
                Los invitados pueden dejar mensajes de felicitación cuando pidan canciones
              </Text>
            </Card>
          )}

          {/* Info Card */}
          <Card className="gap-2 p-4 bg-primary/5">
            <Text className="text-sm font-semibold text-foreground">
              💡 Información
            </Text>
            <Text className="text-xs text-muted">
              • Los mensajes aparecen cuando los invitados piden canciones
            </Text>
            <Text className="text-xs text-muted">
              • Cada mensaje incluye el nombre del invitado y la canción pedida
            </Text>
            <Text className="text-xs text-muted">
              • Podéis guardar estos mensajes como recuerdo de vuestra boda 💕
            </Text>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
