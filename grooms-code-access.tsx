import { useState } from "react";
import { ScrollView, Text, View, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDJCode } from "@/hooks/use-dj-code";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GROOMS_CODE_KEY = "grooms_access_code";

export default function GroomsCodeAccessScreen() {
  const router = useRouter();
  const { validateCode } = useDJCode();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAccessWithCode = async () => {
    if (code.length !== 4) {
      Alert.alert("Código inválido", "El código debe tener 4 dígitos");
      return;
    }

    if (!validateCode(code)) {
      Alert.alert("Código no encontrado", "El código ingresado no existe. Verifica que sea correcto.");
      return;
    }

    try {
      setIsLoading(true);
      // Guardar el código de acceso de los novios
      await AsyncStorage.setItem(GROOMS_CODE_KEY, code);
      // Navegar a la pantalla de novios
      router.push("/grooms-list");
    } catch (error) {
      Alert.alert("Error", "No se pudo acceder con este código");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Permitir acceso sin código (para testing)
    router.push("/grooms-list");
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-8 justify-center">
          {/* Header */}
          <View className="items-center gap-4">
            <Text className="text-6xl">💍</Text>
            <Text className="text-4xl font-bold text-foreground text-center">
              Bienvenidos
            </Text>
            <Text className="text-base text-muted text-center">
              Ingresa el código de tu boda para acceder
            </Text>
          </View>

          {/* Code Input Card */}
          <Card variant="elevated" className="gap-4">
            <View className="gap-2">
              <Text className="text-sm font-semibold text-muted uppercase tracking-wide">
                Código de Acceso
              </Text>
              <Text className="text-xs text-muted">
                Es el mismo código que generaste en el panel del DJ
              </Text>
            </View>

            {/* Code Input */}
            <View className="flex-row gap-2 justify-center">
              {[0, 1, 2, 3].map((index) => (
                <View
                  key={index}
                  className="w-16 h-16 bg-surface border-2 border-border rounded-xl items-center justify-center"
                >
                  <TextInput
                    maxLength={1}
                    keyboardType="numeric"
                    value={code[index] || ""}
                    onChangeText={(text) => {
                      if (/^\d*$/.test(text)) {
                        const newCode = code.split("");
                        newCode[index] = text;
                        setCode(newCode.join(""));
                      }
                    }}
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                    className="text-foreground"
                  />
                </View>
              ))}
            </View>

            {/* Access Button */}
            <Button
              onPress={handleAccessWithCode}
              size="large"
              disabled={code.length !== 4 || isLoading}
              className="w-full mt-4"
            >
              {isLoading ? "Verificando..." : "Acceder 💕"}
            </Button>
          </Card>

          {/* Info Box */}
          <View className="bg-primary/10 border border-primary rounded-xl p-4">
            <Text className="text-xs text-primary font-medium">
              💡 Usa el código que generaste en el panel del DJ para acceder a tu área de novios. Aquí podrás ver tu lista de canciones imprescindibles y los mensajes de tus invitados.
            </Text>
          </View>

          {/* Skip Option */}
          <Pressable onPress={handleSkip}>
            <Text className="text-center text-sm text-muted underline">
              Continuar sin código
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
