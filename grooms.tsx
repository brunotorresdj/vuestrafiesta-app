import { ScrollView, Text, View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Card } from "@/components/ui/card";

export default function GroomsScreen() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Default PIN for demo (can be changed)
  const DEFAULT_PIN = "1234";

  const handlePinSubmit = () => {
    if (pin === DEFAULT_PIN) {
      setIsAuthenticated(true);
      setError("");
      setPin("");
    } else {
      setError("PIN incorrecto. Intenta de nuevo.");
      setPin("");
    }
  };

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center gap-6">
            {/* Header */}
            <View className="gap-2 items-center">
              <Button
                onPress={() => router.push("/")}
                variant="secondary"
                size="small"
                className="self-start"
              >
                ← Atrás
              </Button>
              <Text className="text-4xl mt-4">💍</Text>
              <Text className="text-3xl font-bold text-foreground text-center">
                Sección de Novios
              </Text>
              <Text className="text-base text-muted text-center">
                Ingresa el PIN para acceder
              </Text>
            </View>

            {/* PIN Input */}
            <Card className="gap-4 p-6">
              <Text className="text-sm font-semibold text-foreground">
                PIN de Acceso
              </Text>
              <TextInput
                placeholder="Ingresa el PIN"
                value={pin}
                onChangeText={setPin}
                numberOfLines={1}
              />

              {error && (
                <View className="bg-error rounded-lg p-3">
                  <Text className="text-sm font-semibold text-white">
                    {error}
                  </Text>
                </View>
              )}

              <Button
                onPress={handlePinSubmit}
                size="large"
                className="w-full"
              >
                Acceder 🔓
              </Button>
            </Card>

            {/* Info */}
            <Card className="gap-2 p-4">
              <Text className="text-sm font-semibold text-foreground">
                💡 Información
              </Text>
              <Text className="text-xs text-muted">
                • Este PIN protege la lista de canciones imprescindibles
              </Text>
              <Text className="text-xs text-muted">
                • Solo los novios deben conocer este PIN
              </Text>
              <Text className="text-xs text-muted">
                • PIN por defecto: 1234 (cambiar después)
              </Text>
            </Card>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  // Authenticated view
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ScreenContainer className="p-6">
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Button
              onPress={() => {
                setIsAuthenticated(false);
                router.push("/");
              }}
              variant="secondary"
              size="small"
              className="self-start"
            >
              ← Cerrar Sesión
            </Button>
            <Text className="text-4xl font-bold text-foreground mt-4">
              💍 Canciones Imprescindibles
            </Text>
            <Text className="text-base text-muted">
              Crea la lista de canciones que no pueden faltar
            </Text>
          </View>

          {/* Navigation Buttons */}
          <View className="gap-3 flex-row">
            <Button
              onPress={() => router.push("/grooms-add")}
              size="medium"
              className="flex-1"
            >
              Añadir Canción ➕
            </Button>
            <Button
              onPress={() => router.push("/grooms-list")}
              variant="secondary"
              size="medium"
              className="flex-1"
            >
              Ver Lista 📋
            </Button>
          </View>

          {/* Quick Info */}
          <Card className="gap-3 p-6">
            <Text className="text-lg font-semibold text-foreground">
              ¿Qué es esta sección?
            </Text>
            <Text className="text-sm text-muted">
              Aquí pueden crear una lista de canciones que no pueden faltar en vuestra boda. Los invitados verán estas canciones destacadas cuando las pidan, y el DJ sabrá que son prioritarias.
            </Text>
          </Card>

          {/* Features */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              Características:
            </Text>
            <Card className="gap-2 p-3">
              <Text className="text-xs text-muted">
                ✨ Añade canciones que no pueden faltar
              </Text>
              <Text className="text-xs text-muted">
                🎵 Organiza tu lista perfecta
              </Text>
              <Text className="text-xs text-muted">
                👀 El DJ verá qué canciones son prioritarias
              </Text>
              <Text className="text-xs text-muted">
                🎉 Los invitados pueden pedir tus canciones favoritas
              </Text>
            </Card>
          </View>
        </View>
      </ScreenContainer>
    </ScrollView>
  );
}
