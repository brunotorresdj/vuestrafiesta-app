import { ScrollView, Text, View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Card } from "@/components/ui/card";
import { useSongRequests } from "@/hooks/use-song-requests";

export default function GroomsAddScreen() {
  const router = useRouter();
  const { addMustPlaySong } = useSongRequests();
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAddSong = async () => {
    if (!songName.trim() || !artist.trim()) {
      Alert.alert(
        "Campos requeridos",
        "Por favor completa el nombre de la canción y el artista"
      );
      return;
    }

    setIsLoading(true);
    try {
      await addMustPlaySong(
        songName.trim(),
        artist.trim(),
        notes.trim() || undefined
      );
      setSubmitted(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setSongName("");
        setArtist("");
        setNotes("");
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la canción. Intenta de nuevo.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <ScreenContainer className="p-6">
        <View className="flex-1 justify-center items-center gap-6">
          <Text className="text-6xl">✨</Text>
          <Text className="text-3xl font-bold text-foreground text-center">
            ¡Canción Añadida!
          </Text>
          <Card className="gap-3 p-6 w-full">
            <Text className="text-lg font-semibold text-foreground">
              {songName}
            </Text>
            <Text className="text-base text-muted">{artist}</Text>
            {notes && (
              <Text className="text-sm text-muted italic">
                Nota: {notes}
              </Text>
            )}
          </Card>
          <Text className="text-center text-muted">
            La canción se ha añadido a vuestra lista 🎵
          </Text>
          <Button
            onPress={() => setSubmitted(false)}
            size="large"
            className="w-full"
          >
            Añadir Otra Canción ➕
          </Button>
          <Button
            onPress={() => router.push("/grooms")}
            variant="secondary"
            size="medium"
            className="w-full"
          >
            Volver
          </Button>
        </View>
      </ScreenContainer>
    );
  }

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
              Añadir Canción ➕
            </Text>
            <Text className="text-base text-muted">
              Completa los detalles de la canción
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            <TextInput
              label="Nombre de la Canción"
              placeholder="Ej: Bohemian Rhapsody"
              value={songName}
              onChangeText={setSongName}
            />

            <TextInput
              label="Artista"
              placeholder="Ej: Queen"
              value={artist}
              onChangeText={setArtist}
            />

            <TextInput
              label="Notas (Opcional)"
              placeholder="Ej: Para el primer baile, momento especial..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Submit Button */}
          <Button
            onPress={handleAddSong}
            size="large"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Añadir a la Lista ✨"}
          </Button>

          {/* Tips */}
          <Card className="gap-2 p-4">
            <Text className="text-sm font-semibold text-foreground">
              💡 Consejos
            </Text>
            <Text className="text-xs text-muted">
              • Sé específico con el nombre de la canción
            </Text>
            <Text className="text-xs text-muted">
              • Incluye el artista para evitar confusiones
            </Text>
            <Text className="text-xs text-muted">
              • Las notas ayudan al DJ a entender el contexto
            </Text>
            <Text className="text-xs text-muted">
              • Puedes añadir tantas canciones como quieras
            </Text>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
