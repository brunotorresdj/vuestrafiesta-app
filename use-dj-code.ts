import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface DJSession {
  code: string;
  createdAt: number;
  isActive: boolean;
}

const DJ_CODE_KEY = "dj_session_code";
const DJ_SESSIONS_KEY = "dj_sessions";

/**
 * Hook para gestionar códigos de 4 dígitos para DJ
 * Cada DJ puede crear un código único para su boda
 */
export function useDJCode() {
  const [currentCode, setCurrentCode] = useState<string | null>(null);
  const [sessions, setSessions] = useState<DJSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar código actual al iniciar
  useEffect(() => {
    loadCurrentCode();
  }, []);

  /**
   * Generar un código de 4 dígitos aleatorio
   */
  const generateCode = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  /**
   * Cargar el código actual del almacenamiento
   */
  const loadCurrentCode = async () => {
    try {
      setIsLoading(true);
      const code = await AsyncStorage.getItem(DJ_CODE_KEY);
      if (code) {
        setCurrentCode(code);
      }
      await loadSessions();
    } catch (error) {
      console.error("Error loading DJ code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cargar todas las sesiones de DJ
   */
  const loadSessions = async () => {
    try {
      const data = await AsyncStorage.getItem(DJ_SESSIONS_KEY);
      if (data) {
        setSessions(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
    }
  };

  /**
   * Crear un nuevo código de DJ
   */
  const createNewCode = async (): Promise<string> => {
    try {
      const newCode = generateCode();
      const session: DJSession = {
        code: newCode,
        createdAt: Date.now(),
        isActive: true,
      };

      // Guardar código actual
      await AsyncStorage.setItem(DJ_CODE_KEY, newCode);
      setCurrentCode(newCode);

      // Guardar en historial de sesiones
      const updatedSessions = [...sessions, session];
      await AsyncStorage.setItem(DJ_SESSIONS_KEY, JSON.stringify(updatedSessions));
      setSessions(updatedSessions);

      return newCode;
    } catch (error) {
      console.error("Error creating new code:", error);
      throw error;
    }
  };

  /**
   * Cambiar a un código anterior
   */
  const switchToSession = async (code: string): Promise<boolean> => {
    try {
      const session = sessions.find((s) => s.code === code);
      if (!session) {
        return false;
      }

      await AsyncStorage.setItem(DJ_CODE_KEY, code);
      setCurrentCode(code);
      return true;
    } catch (error) {
      console.error("Error switching session:", error);
      return false;
    }
  };

  /**
   * Validar si un código es válido
   */
  const validateCode = (code: string): boolean => {
    // Validar formato: 4 dígitos
    if (!/^\d{4}$/.test(code)) {
      return false;
    }

    // Validar que el código existe en las sesiones o es el código actual
    return code === currentCode || sessions.some((s) => s.code === code);
  };

  /**
   * Obtener información de una sesión
   */
  const getSessionInfo = (code: string): DJSession | undefined => {
    return sessions.find((s) => s.code === code);
  };

  /**
   * Eliminar una sesión
   */
  const deleteSession = async (code: string): Promise<boolean> => {
    try {
      const updatedSessions = sessions.filter((s) => s.code !== code);
      await AsyncStorage.setItem(DJ_SESSIONS_KEY, JSON.stringify(updatedSessions));
      setSessions(updatedSessions);

      // Si eliminamos el código actual, generar uno nuevo
      if (code === currentCode) {
        await createNewCode();
      }

      return true;
    } catch (error) {
      console.error("Error deleting session:", error);
      return false;
    }
  };

  /**
   * Limpiar todos los datos
   */
  const clearAllData = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(DJ_CODE_KEY);
      await AsyncStorage.removeItem(DJ_SESSIONS_KEY);
      setCurrentCode(null);
      setSessions([]);
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  return {
    currentCode,
    sessions,
    isLoading,
    createNewCode,
    switchToSession,
    validateCode,
    getSessionInfo,
    deleteSession,
    clearAllData,
  };
}
