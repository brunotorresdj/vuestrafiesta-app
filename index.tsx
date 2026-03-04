import { ScrollView, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-8 justify-center">
          {/* Hero Section - Mejorado */}
          <View className="items-center gap-3 mb-4">
            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 100, height: 100 }}
            />
            <Text className="text-5xl font-bold text-foreground text-center tracking-tight">
              VUESTRAFIESTA
            </Text>
            <View className="h-1 w-16 bg-primary rounded-full mt-2" />
            <Text className="text-base text-muted text-center mt-2 font-medium">
              La música de tu boda, en tus manos
            </Text>
          </View>

          {/* Main Actions - Mejorado */}
          <View className="gap-4">
            {/* Guest Option */}
            <Card variant="elevated" className="gap-4 p-6 border-0">
              <View className="flex-row items-center gap-3">
                <Text className="text-4xl">🎉</Text>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-foreground">
                    Soy Invitado
                  </Text>
                  <Text className="text-xs text-muted mt-1">
                    Pide tu canción favorita
                  </Text>
                </View>
              </View>
              <Button
                onPress={() => router.push("/guest")}
                size="large"
                className="mt-2"
              >
                Pedir Canción ✨
              </Button>
            </Card>

            {/* Grooms Option */}
            <Card variant="elevated" className="gap-4 p-6 border-0">
              <View className="flex-row items-center gap-3">
                <Text className="text-4xl">💍</Text>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-foreground">
                    Somos Novios
                  </Text>
                  <Text className="text-xs text-muted mt-1">
                    Nuestras canciones imprescindibles
                  </Text>
                </View>
              </View>
              <Button
                onPress={() => router.push("/grooms-code-access")}
                size="large"
                className="mt-2"
              >
                Nuestra Lista 💕
              </Button>
            </Card>

            {/* DJ Option */}
            <Card variant="elevated" className="gap-4 p-6 border-0">
              <View className="flex-row items-center gap-3">
                <Text className="text-4xl">🎧</Text>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-foreground">
                    Soy DJ
                  </Text>
                  <Text className="text-xs text-muted mt-1">
                    Gestiona todas las peticiones
                  </Text>
                </View>
              </View>
              <Button
                onPress={() => router.push("/dj")}
                variant="secondary"
                size="large"
                className="mt-2"
              >
                Panel del DJ 🎵
              </Button>
            </Card>
          </View>

          {/* Features Section */}
          <View className="gap-3 mt-4 px-2">
            <Text className="text-sm font-semibold text-foreground">
              ✨ Características
            </Text>
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Text className="text-primary font-bold">•</Text>
                <Text className="text-xs text-muted flex-1">
                  Sin registro • Acceso inmediato
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-primary font-bold">•</Text>
                <Text className="text-xs text-muted flex-1">
                  Notificaciones en tiempo real
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-primary font-bold">•</Text>
                <Text className="text-xs text-muted flex-1">
                  Mensajes de felicitación personalizados
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-primary font-bold">•</Text>
                <Text className="text-xs text-muted flex-1">
                  Modo oscuro automático
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View className="items-center gap-2 mt-6 pt-4 border-t border-border">
            <Text className="text-xs text-muted text-center font-medium">
              Hecho con 💕 para tu boda perfecta
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
