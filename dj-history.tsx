import { useState } from "react";
import { ScrollView, Text, View, Pressable, Alert, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDJCode } from "@/hooks/use-dj-code";

export default function DJHistoryScreen() {
  const router = useRouter();
  const { sessions, currentCode, switchToSession, deleteSession } = useDJCode();
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const handleSwitchSession = async (code: string) => {
    const success = await switchToSession(code);
    if (success) {
      Alert.alert("Éxito", `Cambiado a boda con código ${code}`);
      router.back();
    } else {
      Alert.alert("Error", "No se pudo cambiar a esta boda");
    }
  };

  const handleDeleteSession = (code: string) => {
    Alert.alert(
      "Eliminar Boda",
      `¿Estás seguro de que deseas eliminar el historial de la boda con código ${code}?`,
      [
        { text: "Cancelar", onPress: () => {}, style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            const success = await deleteSession(code);
            if (success) {
              Alert.alert("Éxito", "Boda eliminada del historial");
            } else {
              Alert.alert("Error", "No se pudo eliminar la boda");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedSessions = [...sessions].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-4">
          {/* Header */}
          <View className="gap-2 mb-4">
            <Pressable onPress={() => router.back()}>
              <Text className="text-lg text-primary font-semibold">← Atrás</Text>
            </Pressable>
            <Text className="text-4xl font-bold text-foreground">
              Historial de Bodas 📚
            </Text>
            <Text className="text-sm text-muted">
              Revisa y gestiona tus bodas anteriores
            </Text>
          </View>

          {/* Current Session */}
          {currentCode && (
            <Card variant="elevated" className="gap-3 border-2 border-primary">
              <View className="gap-1">
                <Text className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Boda Actual
                </Text>
                <Text className="text-2xl font-bold text-foreground">
                  Código: {currentCode}
                </Text>
              </View>
              <View className="bg-primary/10 rounded-lg p-3">
                <Text className="text-xs text-primary font-medium">
                  💡 Esta es tu boda actual. Los invitados usan este código para pedir canciones.
                </Text>
              </View>
            </Card>
          )}

          {/* Previous Sessions */}
          {sortedSessions.length > 0 ? (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Bodas Anteriores ({sortedSessions.length})
              </Text>
              <FlatList
                scrollEnabled={false}
                data={sortedSessions}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <Card
                    variant="elevated"
                    className={`gap-3 mb-3 ${
                      item.code === currentCode ? "border-2 border-primary" : ""
                    }`}
                  >
                    <View className="gap-2">
                      <View className="flex-row justify-between items-start">
                        <View className="flex-1">
                          <Text className="text-lg font-bold text-foreground">
                            Código: {item.code}
                          </Text>
                          <Text className="text-xs text-muted mt-1">
                            📅 {formatDate(item.createdAt)}
                          </Text>
                        </View>
                        <View className="bg-primary/10 rounded-lg px-3 py-1">
                          <Text className="text-xs font-semibold text-primary">
                            {item.code === currentCode ? "ACTIVA" : "ANTERIOR"}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    {item.code !== currentCode && (
                      <View className="gap-2 flex-row">
                        <Button
                          onPress={() => handleSwitchSession(item.code)}
                          size="small"
                          className="flex-1"
                        >
                          Cambiar a esta 🎵
                        </Button>
                        <Pressable
                          onPress={() => handleDeleteSession(item.code)}
                          className="flex-1 bg-error/10 rounded-lg items-center justify-center py-2"
                        >
                          <Text className="text-error font-semibold text-sm">
                            Eliminar ❌
                          </Text>
                        </Pressable>
                      </View>
                    )}
                  </Card>
                )}
              />
            </View>
          ) : (
            <Card variant="elevated" className="gap-3 items-center py-8">
              <Text className="text-6xl">📭</Text>
              <Text className="text-center text-foreground font-semibold">
                No hay bodas anteriores
              </Text>
              <Text className="text-center text-sm text-muted">
                Cuando crees un nuevo código, aparecerá aquí el historial de bodas anteriores.
              </Text>
            </Card>
          )}

          {/* Info Box */}
          <View className="bg-warning/10 border border-warning rounded-xl p-4 mt-4">
            <Text className="text-xs text-warning font-medium">
              ℹ️ Puedes cambiar entre bodas anteriores para revisar las peticiones de canciones. Los datos se guardan automáticamente.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
