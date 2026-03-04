import { View, Text, Pressable, Alert } from "react-native";
import { cn } from "@/lib/utils";

export interface DJCodeDisplayProps {
  code: string | null;
  onGenerateNew: () => void;
  isLoading?: boolean;
}

/**
 * Componente para mostrar el código del DJ de forma elegante
 */
export function DJCodeDisplay({
  code,
  onGenerateNew,
  isLoading = false,
}: DJCodeDisplayProps) {
  const handleCopyCode = () => {
    if (code) {
      // En una app real, usaríamos Clipboard API
      Alert.alert("Código copiado", `El código ${code} ha sido copiado al portapapeles`);
    }
  };

  return (
    <View className="gap-4">
      {/* Header */}
      <View className="gap-2">
        <Text className="text-sm font-semibold text-muted uppercase tracking-wide">
          Código de Acceso
        </Text>
        <Text className="text-xs text-muted">
          Comparte este código con tus invitados para que accedan a la app
        </Text>
      </View>

      {/* Code Display */}
      <Pressable onPress={handleCopyCode} disabled={!code}>
        <View className="bg-primary/10 border-2 border-primary rounded-2xl p-6 items-center gap-3">
          {code ? (
            <>
              <Text className="text-xs text-muted">Tu código de boda</Text>
              <View className="flex-row gap-2 justify-center">
                {code.split("").map((digit, index) => (
                  <View
                    key={index}
                    className="w-14 h-14 bg-primary rounded-xl items-center justify-center shadow-lg shadow-primary/30"
                  >
                    <Text className="text-2xl font-bold text-white">{digit}</Text>
                  </View>
                ))}
              </View>
              <Text className="text-xs text-muted mt-2">Toca para copiar</Text>
            </>
          ) : (
            <Text className="text-muted">Cargando código...</Text>
          )}
        </View>
      </Pressable>

      {/* Generate New Button */}
      <Pressable
        onPress={onGenerateNew}
        disabled={isLoading}
        style={({ pressed }) => [
          {
            opacity: pressed && !isLoading ? 0.85 : 1,
            transform: [{ scale: pressed && !isLoading ? 0.96 : 1 }],
          },
        ]}
      >
        <View className="bg-surface border border-border rounded-full py-3 items-center justify-center">
          <Text className="text-primary font-semibold">
            {isLoading ? "Generando..." : "Generar Nuevo Código 🔄"}
          </Text>
        </View>
      </Pressable>

      {/* Info Box */}
      <View className="bg-warning/10 border border-warning rounded-xl p-4">
        <Text className="text-xs text-warning font-medium">
          ⚠️ Importante: Cambiar el código cerrará la sesión actual. Asegúrate de que todos los invitados tengan el nuevo código.
        </Text>
      </View>
    </View>
  );
}
