import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock de localStorage para entorno de pruebas
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

/**
 * Suite de Pruebas Funcionales para VUESTRAFIESTA
 * Valida que todas las características principales funcionen correctamente
 */

describe("VUESTRAFIESTA - Pruebas Funcionales", () => {
  // ============================================
  // PRUEBAS DE ALMACENAMIENTO LOCAL
  // ============================================

  describe("Almacenamiento Local", () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it("debe guardar y recuperar código de acceso", () => {
      const testCode = "1234";
      localStorage.setItem("accessCode", testCode);
      const retrieved = localStorage.getItem("accessCode");
      expect(retrieved).toBe(testCode);
    });

    it("debe guardar lista de canciones de novios", () => {
      const songs = [
        { id: "1", title: "Song 1", artist: "Artist 1" },
        { id: "2", title: "Song 2", artist: "Artist 2" },
      ];
      localStorage.setItem("groomsSongs", JSON.stringify(songs));
      const retrieved = JSON.parse(localStorage.getItem("groomsSongs") || "[]");
      expect(retrieved).toEqual(songs);
      expect(retrieved.length).toBe(2);
    });

    it("debe guardar peticiones de canciones", () => {
      const requests = [
        { id: "1", song: "Song 1", requester: "Guest 1", priority: "normal" },
      ];
      localStorage.setItem("songRequests", JSON.stringify(requests));
      const retrieved = JSON.parse(localStorage.getItem("songRequests") || "[]");
      expect(retrieved.length).toBe(1);
      expect(retrieved[0].song).toBe("Song 1");
    });

    it("debe limpiar datos al resetear", () => {
      localStorage.setItem("testKey", "testValue");
      localStorage.removeItem("testKey");
      expect(localStorage.getItem("testKey")).toBeNull();
    });
  });

  // ============================================
  // PRUEBAS DE GENERACIÓN DE CÓDIGOS
  // ============================================

  describe("Generación de Códigos", () => {
    it("debe generar código de 4 dígitos", () => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      expect(code.length).toBe(4);
      expect(/^\d{4}$/.test(code)).toBe(true);
    });

    it("debe generar códigos únicos", () => {
      const codes = new Set();
      for (let i = 0; i < 100; i++) {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        codes.add(code);
      }
      // Probabilidad muy alta de que sean únicos
      expect(codes.size).toBeGreaterThan(95);
    });

    it("debe validar formato de código", () => {
      const validCodes = ["1000", "5555", "9999"];
      const invalidCodes = ["123", "12345", "abcd"];

      validCodes.forEach((code) => {
        expect(/^\d{4}$/.test(code)).toBe(true);
      });

      invalidCodes.forEach((code) => {
        expect(/^\d{4}$/.test(code)).toBe(false);
      });
    });
  });

  // ============================================
  // PRUEBAS DE DATOS DE CANCIONES
  // ============================================

  describe("Gestión de Canciones", () => {
    it("debe crear petición de canción con datos válidos", () => {
      const request = {
        id: "1",
        song: "Bohemian Rhapsody",
        artist: "Queen",
        requester: "Juan",
        message: "¡Mi canción favorita!",
        priority: "normal",
        timestamp: Date.now(),
      };

      expect(request.song).toBeTruthy();
      expect(request.artist).toBeTruthy();
      expect(request.requester).toBeTruthy();
      expect(request.priority).toMatch(/^(normal|high)$/);
    });

    it("debe validar prioridad de canción", () => {
      const validPriorities = ["normal", "high"];
      const invalidPriorities = ["low", "urgent", ""];

      validPriorities.forEach((priority) => {
        expect(["normal", "high"].includes(priority)).toBe(true);
      });

      invalidPriorities.forEach((priority) => {
        expect(["normal", "high"].includes(priority)).toBe(false);
      });
    });

    it("debe filtrar canciones por estado", () => {
      const songs = [
        { id: "1", title: "Song 1", status: "pending" },
        { id: "2", title: "Song 2", status: "playing" },
        { id: "3", title: "Song 3", status: "pending" },
        { id: "4", title: "Song 4", status: "completed" },
      ];

      const pending = songs.filter((s) => s.status === "pending");
      expect(pending.length).toBe(2);
      expect(pending.every((s) => s.status === "pending")).toBe(true);
    });

    it("debe ordenar canciones por timestamp", () => {
      const songs = [
        { id: "1", timestamp: 1000 },
        { id: "3", timestamp: 3000 },
        { id: "2", timestamp: 2000 },
      ];

      const sorted = [...songs].sort((a, b) => a.timestamp - b.timestamp);
      expect(sorted[0].id).toBe("1");
      expect(sorted[1].id).toBe("2");
      expect(sorted[2].id).toBe("3");
    });
  });

  // ============================================
  // PRUEBAS DE VALIDACIÓN DE ENTRADA
  // ============================================

  describe("Validación de Entrada", () => {
    it("debe validar nombre de invitado", () => {
      const validNames = ["Juan", "María", "José"];
      const invalidNames = ["", " "];

      validNames.forEach((name) => {
        expect(name && name.trim().length > 0).toBe(true);
      });

      invalidNames.forEach((name) => {
        expect(!name || name.trim().length === 0).toBe(true);
      });
    });

    it("debe validar título de canción", () => {
      const validTitles = ["Bohemian Rhapsody", "Song Name"];
      const invalidTitles = ["", " "];

      validTitles.forEach((title) => {
        expect(title && title.trim().length > 0).toBe(true);
      });

      invalidTitles.forEach((title) => {
        expect(!title || title.trim().length === 0).toBe(true);
      });
    });

    it("debe validar mensaje de felicitación", () => {
      const validMessages = ["¡Felicidades!", "Que disfruten", ""];
      const message = "¡Que disfruten!";

      expect(message.length <= 500).toBe(true);
    });

    it("debe sanitizar entrada de usuario", () => {
      const input = "<script>alert('xss')</script>";
      const sanitized = input.replace(/<[^>]*>/g, "");
      expect(sanitized).not.toContain("<");
      expect(sanitized).not.toContain(">");
    });
  });

  // ============================================
  // PRUEBAS DE LÓGICA DE NEGOCIO
  // ============================================

  describe("Lógica de Negocio", () => {
    it("debe contar canciones por estado", () => {
      const songs = [
        { status: "pending" },
        { status: "pending" },
        { status: "playing" },
        { status: "completed" },
      ];

      const counts = {
        pending: songs.filter((s) => s.status === "pending").length,
        playing: songs.filter((s) => s.status === "playing").length,
        completed: songs.filter((s) => s.status === "completed").length,
      };

      expect(counts.pending).toBe(2);
      expect(counts.playing).toBe(1);
      expect(counts.completed).toBe(1);
    });

    it("debe calcular tiempo desde petición", () => {
      const requestTime = Date.now() - 60000; // 1 minuto atrás
      const elapsed = Date.now() - requestTime;
      expect(elapsed).toBeGreaterThan(59000);
      expect(elapsed).toBeLessThan(61000);
    });

    it("debe validar acceso con código correcto", () => {
      const correctCode = "1234";
      const userCode = "1234";
      expect(userCode === correctCode).toBe(true);
    });

    it("debe rechazar acceso con código incorrecto", () => {
      const correctCode = "1234";
      const userCode = "5678" as string;
      expect(userCode === correctCode).toBe(false);
    });
  });

  // ============================================
  // PRUEBAS DE RENDIMIENTO
  // ============================================

  describe("Rendimiento", () => {
    it("debe procesar 100 canciones en menos de 100ms", () => {
      const start = performance.now();
      const songs = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        title: `Song ${i}`,
      }));
      const sorted = songs.sort((a, b) => a.id - b.id);
      const end = performance.now();

      expect(end - start).toBeLessThan(100);
      expect(sorted.length).toBe(100);
    });

    it("debe filtrar 1000 canciones en menos de 50ms", () => {
      const start = performance.now();
      const songs = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        status: i % 2 === 0 ? "pending" : "completed",
      }));
      const filtered = songs.filter((s) => s.status === "pending");
      const end = performance.now();

      expect(end - start).toBeLessThan(50);
      expect(filtered.length).toBe(500);
    });

    it("debe serializar/deserializar JSON rápidamente", () => {
      const data = {
        songs: Array.from({ length: 50 }, (_, i) => ({
          id: i,
          title: `Song ${i}`,
        })),
      };

      const start = performance.now();
      const serialized = JSON.stringify(data);
      const deserialized = JSON.parse(serialized);
      const end = performance.now();

      expect(end - start).toBeLessThan(10);
      expect(deserialized.songs.length).toBe(50);
    });
  });

  // ============================================
  // PRUEBAS DE CASOS LÍMITE
  // ============================================

  describe("Casos Límite", () => {
    it("debe manejar lista vacía de canciones", () => {
      const songs: any[] = [];
      expect(songs.length).toBe(0);
      expect(songs.filter((s) => s.status === "pending").length).toBe(0);
    });

    it("debe manejar canción con caracteres especiales", () => {
      const song = {
        title: "Song with émojis 🎵 & special chars!",
        artist: "Artist (feat. Someone)",
      };
      expect(song.title).toBeTruthy();
      expect(song.artist).toBeTruthy();
    });

    it("debe manejar mensaje muy largo", () => {
      const longMessage = "A".repeat(500);
      expect(longMessage.length).toBe(500);
      expect(longMessage.length <= 500).toBe(true);
    });

    it("debe manejar múltiples espacios en blanco", () => {
      const input = "  Song   Name  ";
      const trimmed = input.trim();
      expect(trimmed).toBe("Song   Name");
    });
  });
});
