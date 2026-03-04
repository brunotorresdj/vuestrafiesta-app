import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";

export interface SuggestionCardProps {
  song: string;
  artist: string;
  notes?: string;
  onPress: () => void;
  isLoading?: boolean;
}

/**
 * Componente de tarjeta de sugerencia para mostrar canciones imprescindibles
 * de los novios que los invitados pueden pedir rápidamente.
 */
export function SuggestionCard({
  song,
  artist,
  notes,
  onPress,
  isLoading,
}: SuggestionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View
        className={cn(
          "bg-surface border border-border rounded-xl p-4 mb-3",
          "active:bg-primary/10"
        )}
      >
        {/* Icono de sugerencia */}
        <View className="flex-row items-center gap-2 mb-2">
          <Text className="text-2xl">💡</Text>
          <Text className="text-xs text-muted font-medium">Sugerencia de los novios</Text>
        </View>

        {/* Nombre de la canción */}
        <Text className="text-lg font-bold text-foreground mb-1" numberOfLines={2}>
          {song}
        </Text>

        {/* Artista */}
        <Text className="text-sm text-muted mb-3">{artist}</Text>

        {/* Notas si existen */}
        {notes && (
          <Text className="text-xs text-muted italic mb-3 leading-relaxed">
            &quot;{notes}&quot;
          </Text>
        )}

        {/* Botón de acción */}
        <View
          className={cn(
            "bg-primary rounded-lg py-2 px-3 items-center",
            isLoading && "opacity-50"
          )}
        >
          <Text className="text-white font-semibold text-sm">
            {isLoading ? "Pidiendo..." : "Pedir Ahora ✨"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
