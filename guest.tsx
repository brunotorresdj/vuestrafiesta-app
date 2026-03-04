import { ScrollView, Text, View, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Card } from "@/components/ui/card";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { SuggestionCard } from "@/components/ui/suggestion-card";
import { useSongRequests } from "@/hooks/use-song-requests";
import { useNotifications } from "@/hooks/use-notifications";

export default function GuestScreen() {
  const router = useRouter();
  const { addRequest, loadMustPlaySongs, isMustPlaySong, getMustPlaySongDetails, mustPlaySongs } = useSongRequests();
  const { notifyPrioritySong } = useNotifications();
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPrioritySong, setIsPrioritySong] = useState(false);
  const [suggestions, setSuggestions] = useState<{ song: string; artist: string; notes?: string }[]>([]);
  const [loadingSuggestion, setLoadingSuggestion] = useState<string | null>(null);

  // Load must-play songs when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadMustPlaySongs();
    }, [loadMustPlaySongs])
  );

  // Update suggestions when must-play songs change
  useEffect(() => {
    setSuggestions(mustPlaySongs.slice(0, 3)); // Show top 3 suggestions
  }, [mustPlaySongs]);

  // Check if the current song is a priority song
  useEffect(() => {
    if (songName.trim() && artist.trim()) {
      const isPriority = isMustPlaySong(songName, artist);
      setIsPrioritySong(isPriority);
    } else {
      setIsPrioritySong(false);
    }
  }, [songName, artist, isMustPlaySong]);

  const handleSubmit = async () => {
    if (!songName.trim() || !artist.trim()) {
      Alert.alert("Campos requeridos", "Por favor completa el nombre de la canción y el artista");
      return;
    }

    setIsLoading(true);
    try {
      // Check if it's a priority song before submitting
      const isPriority = isMustPlaySong(songName.trim(), artist.trim());
      
      await addRequest(
        songName.trim(), 
        artist.trim(), 
        guestName.trim() || undefined,
        message.trim() || undefined
      );
      
      // Send notification to DJ if it's a priority song
      if (isPriority) {
        await notifyPrioritySong(
          songName.trim(),
          artist.trim(),
          guestName.trim() || undefined
        );
      }
      
      setSubmitted(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setSongName("");
        setArtist("");
        setGuestName("");
        setMessage("");
        setSubmitted(false);
        setIsPrioritySong(false);
      }, 2000);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la petición. Intenta de nuevo.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickRequest = async (song: string, artist: string) => {
    const suggestionKey = `${song}-${artist}`;
    setLoadingSuggestion(suggestionKey);
    try {
      await addRequest(song, artist, guestName.trim() || undefined, message.trim() || undefined);
      await notifyPrioritySong(song, artist, guestName.trim() || undefined);
      setSubmitted(true);

      setTimeout(() => {
        setSongName("");
        setArtist("");
        setGuestName("");
        setMessage("");
        setSubmitted(false);
        setIsPrioritySong(false);
        setLoadingSuggestion(null);
      }, 2000);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la petición. Intenta de nuevo.");
      console.error(error);
      setLoadingSuggestion(null);
    }
  };

  const priorityDetails = isPrioritySong ? getMustPlaySongDetails(songName, artist) : null;

  if (submitted) {
    return (
      <ScreenContainer className="p-6">
        <View className="flex-1 justify-center items-center gap-6">
          <Text className="text-6xl">{isPrioritySong ? "⭐💍" : "🎉"}</Text>
          <Text className="text-3xl font-bold text-foreground text-center">
            ¡Petición Enviada!
          </Text>
          
          {isPrioritySong && (
            <Card className="gap-2 p-4 bg-primary/10 border border-primary w-full">
              <Text className="text-sm font-semibold text-primary text-center">
                ⭐💍 ¡Esta es una canción favorita de los novios!
              </Text>
              <Text className="text-xs text-primary text-center">
                El DJ ha sido notificado de esta petición especial 🔔
              </Text>
            </Card>
          )}

          <Card className={`gap-3 p-6 w-full ${isPrioritySong ? "border-2 border-primary" : ""}`}>
            {isPrioritySong && <PriorityBadge size="small" />}
            <Text className="text-lg font-semibold text-foreground">
              {songName}
            </Text>
            <Text className="text-base text-muted">
              {artist}
            </Text>
            {guestName && (
              <Text className="text-sm text-muted">
                👤 {guestName}
              </Text>
            )}
            {message && (
              <View className="bg-surface rounded-lg p-3 mt-2">
                <Text className="text-xs text-muted mb-1">💌 Tu mensaje:</Text>
                <Text className="text-sm text-foreground italic">
                  &quot;{message}&quot;
                </Text>
              </View>
            )}
          </Card>
          
          {message && (
            <Text className="text-center text-muted text-sm">
              💕 Tu mensaje llegará a los novios
            </Text>
          )}
          
          <Text className="text-center text-muted">
            El DJ verá tu petición en breve ✨
          </Text>
          <Button
            onPress={() => setSubmitted(false)}
            size="large"
            className="w-full"
          >
            Pedir Otra Canción 🎵
          </Button>
          <Button
            onPress={() => router.push("/")}
            variant="secondary"
            size="medium"
            className="w-full"
          >
            Volver al Inicio
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
              onPress={() => router.push("/")}
              variant="secondary"
              size="small"
              className="self-start"
            >
              ← Atrás
            </Button>
            <Text className="text-4xl font-bold text-foreground mt-4">
              Pide tu Canción 🎵
            </Text>
            <Text className="text-base text-muted">
              Completa el formulario para solicitar una canción
            </Text>
          </View>

          {/* Quick Suggestions Section */}
          {suggestions.length > 0 && (
            <View className="gap-3">
              <View className="flex-row items-center gap-2">
                <Text className="text-lg">💡</Text>
                <Text className="text-sm font-semibold text-foreground">
                  Sugerencias de los Novios
                </Text>
              </View>
              <View className="gap-2">
                {suggestions.map((suggestion, index) => (
                  <SuggestionCard
                    key={`${suggestion.song}-${suggestion.artist}-${index}`}
                    song={suggestion.song}
                    artist={suggestion.artist}
                    notes={suggestion.notes}
                    isLoading={loadingSuggestion === `${suggestion.song}-${suggestion.artist}`}
                    onPress={() => handleQuickRequest(suggestion.song, suggestion.artist)}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Divider */}
          {suggestions.length > 0 && (
            <View className="h-px bg-border my-2" />
          )}

          {/* Priority Song Indicator */}
          {isPrioritySong && (
            <Card className="gap-2 p-4 bg-primary/10 border border-primary">
              <View className="flex-row items-center justify-center gap-2">
                <Text className="text-lg">⭐💍</Text>
                <Text className="text-sm font-semibold text-primary">
                  ¡Canción favorita de los novios!
                </Text>
              </View>
              {priorityDetails?.notes && (
                <Text className="text-xs text-primary text-center">
                  📝 {priorityDetails.notes}
                </Text>
              )}
              <Text className="text-xs text-primary text-center mt-1">
                🔔 El DJ será notificado de esta petición especial
              </Text>
            </Card>
          )}

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
              label="Tu Nombre (Opcional)"
              placeholder="Ej: Juan"
              value={guestName}
              onChangeText={setGuestName}
            />

            {/* Message Field */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">
                💌 Mensaje para los Novios (Opcional)
              </Text>
              <TextInput
                placeholder="Escribe un mensaje de felicitación..."
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={3}
              />
              <Text className="text-xs text-muted">
                Los novios podrán ver tu mensaje junto con tu petición 💕
              </Text>
            </View>
          </View>

          {/* Submit Button */}
          <Button
            onPress={handleSubmit}
            size="large"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : isPrioritySong ? "Enviar Petición ⭐💍" : "Enviar Petición ✨"}
          </Button>

          {/* Info */}
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
              • El DJ revisará tu petición en breve
            </Text>
            <Text className="text-xs text-muted">
              • Las canciones ⭐💍 notifican al DJ automáticamente
            </Text>
            <Text className="text-xs text-muted">
              • 💌 Añade un mensaje especial para los novios
            </Text>
            <Text className="text-xs text-muted">
              • 💡 Usa las sugerencias para pedir rápido
            </Text>
          </Card>

          {/* History Button */}
          <Button
            onPress={() => router.push("/guest-history")}
            variant="secondary"
            size="medium"
            className="w-full"
          >
            Ver Mis Peticiones 📋
          </Button>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
