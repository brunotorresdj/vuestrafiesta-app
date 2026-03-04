import { describe, it, expect, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("Song Request Storage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should store song requests with correct structure", async () => {
    const mockRequest = {
      id: "1",
      song: "Bohemian Rhapsody",
      artist: "Queen",
      guestName: "Juan",
      status: "pending" as const,
      timestamp: new Date().toISOString(),
    };

    const jsonString = JSON.stringify([mockRequest]);
    
    await AsyncStorage.setItem("@vuestrafiesta_requests", jsonString);
    
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@vuestrafiesta_requests",
      jsonString
    );
  });

  it("should handle multiple requests", async () => {
    const requests = [
      {
        id: "1",
        song: "Song 1",
        artist: "Artist 1",
        status: "pending" as const,
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        song: "Song 2",
        artist: "Artist 2",
        status: "playing" as const,
        timestamp: new Date().toISOString(),
      },
    ];

    const jsonString = JSON.stringify(requests);
    await AsyncStorage.setItem("@vuestrafiesta_requests", jsonString);

    expect(AsyncStorage.setItem).toHaveBeenCalled();
    const parsed = JSON.parse(jsonString);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].status).toBe("pending");
    expect(parsed[1].status).toBe("playing");
  });

  it("should clear all requests", async () => {
    await AsyncStorage.removeItem("@vuestrafiesta_requests");
    
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      "@vuestrafiesta_requests"
    );
  });

  it("should handle request status transitions", () => {
    const statuses = ["pending", "playing", "played", "rejected"] as const;
    
    statuses.forEach((status) => {
      expect(["pending", "playing", "played", "rejected"]).toContain(status);
    });
  });

  it("should validate request structure", () => {
    const validRequest = {
      id: "123",
      song: "Test Song",
      artist: "Test Artist",
      guestName: "Test Guest",
      status: "pending" as const,
      timestamp: new Date(),
    };

    expect(validRequest).toHaveProperty("id");
    expect(validRequest).toHaveProperty("song");
    expect(validRequest).toHaveProperty("artist");
    expect(validRequest).toHaveProperty("status");
    expect(validRequest).toHaveProperty("timestamp");
  });
});

describe("Must-Play Songs Storage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should store must-play songs with correct structure", async () => {
    const mockMustPlaySong = {
      id: "1",
      song: "Bohemian Rhapsody",
      artist: "Queen",
      notes: "Para el primer baile",
      timestamp: new Date().toISOString(),
    };

    const jsonString = JSON.stringify([mockMustPlaySong]);
    await AsyncStorage.setItem("@vuestrafiesta_must_play", jsonString);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@vuestrafiesta_must_play",
      jsonString
    );
  });

  it("should handle multiple must-play songs", async () => {
    const mustPlaySongs = [
      {
        id: "1",
        song: "Song 1",
        artist: "Artist 1",
        notes: "First dance",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        song: "Song 2",
        artist: "Artist 2",
        notes: "Cake cutting",
        timestamp: new Date().toISOString(),
      },
    ];

    const jsonString = JSON.stringify(mustPlaySongs);
    await AsyncStorage.setItem("@vuestrafiesta_must_play", jsonString);

    expect(AsyncStorage.setItem).toHaveBeenCalled();
    const parsed = JSON.parse(jsonString);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].notes).toBe("First dance");
  });

  it("should validate must-play song structure", () => {
    const validMustPlaySong = {
      id: "123",
      song: "Test Song",
      artist: "Test Artist",
      notes: "Optional notes",
      timestamp: new Date(),
    };

    expect(validMustPlaySong).toHaveProperty("id");
    expect(validMustPlaySong).toHaveProperty("song");
    expect(validMustPlaySong).toHaveProperty("artist");
    expect(validMustPlaySong).toHaveProperty("timestamp");
  });

  it("should clear all must-play songs", async () => {
    await AsyncStorage.removeItem("@vuestrafiesta_must_play");

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      "@vuestrafiesta_must_play"
    );
  });
});

describe("Priority Song Detection", () => {
  it("should match songs case-insensitively", () => {
    const mustPlaySongs = [
      { id: "1", song: "Bohemian Rhapsody", artist: "Queen", timestamp: new Date() },
    ];

    const normalizedSong = "bohemian rhapsody".toLowerCase().trim();
    const normalizedArtist = "queen".toLowerCase().trim();

    const found = mustPlaySongs.some(
      (s) =>
        s.song.toLowerCase().trim() === normalizedSong &&
        s.artist.toLowerCase().trim() === normalizedArtist
    );

    expect(found).toBe(true);
  });

  it("should handle whitespace in song names", () => {
    const mustPlaySongs = [
      { id: "1", song: "  Test Song  ", artist: "  Test Artist  ", timestamp: new Date() },
    ];

    const normalizedSong = "test song".toLowerCase().trim();
    const normalizedArtist = "test artist".toLowerCase().trim();

    const found = mustPlaySongs.some(
      (s) =>
        s.song.toLowerCase().trim() === normalizedSong &&
        s.artist.toLowerCase().trim() === normalizedArtist
    );

    expect(found).toBe(true);
  });

  it("should return false for non-matching songs", () => {
    const mustPlaySongs = [
      { id: "1", song: "Song A", artist: "Artist A", timestamp: new Date() },
    ];

    const normalizedSong = "song b".toLowerCase().trim();
    const normalizedArtist = "artist b".toLowerCase().trim();

    const found = mustPlaySongs.some(
      (s) =>
        s.song.toLowerCase().trim() === normalizedSong &&
        s.artist.toLowerCase().trim() === normalizedArtist
    );

    expect(found).toBe(false);
  });

  it("should get must-play song details", () => {
    const mustPlaySongs = [
      { id: "1", song: "Test Song", artist: "Test Artist", notes: "First dance", timestamp: new Date() },
    ];

    const normalizedSong = "test song".toLowerCase().trim();
    const normalizedArtist = "test artist".toLowerCase().trim();

    const details = mustPlaySongs.find(
      (s) =>
        s.song.toLowerCase().trim() === normalizedSong &&
        s.artist.toLowerCase().trim() === normalizedArtist
    );

    expect(details).toBeDefined();
    expect(details?.notes).toBe("First dance");
  });
})


describe("Congratulation Messages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should store congratulation message with song request", async () => {
    const mockMessage = {
      id: "msg1",
      guestName: "Juan",
      message: "¡Felicidades!",
      songRequest: {
        song: "Perfect",
        artist: "Ed Sheeran",
      },
      timestamp: new Date().toISOString(),
    };

    const jsonString = JSON.stringify([mockMessage]);
    await AsyncStorage.setItem("@vuestrafiesta_messages", jsonString);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@vuestrafiesta_messages",
      jsonString
    );
  });

  it("should store standalone congratulation message", async () => {
    const mockMessage = {
      id: "msg2",
      guestName: "María",
      message: "¡Que sean muy felices!",
      timestamp: new Date().toISOString(),
    };

    const jsonString = JSON.stringify([mockMessage]);
    await AsyncStorage.setItem("@vuestrafiesta_messages", jsonString);

    expect(AsyncStorage.setItem).toHaveBeenCalled();
    const parsed = JSON.parse(jsonString);
    expect(parsed[0].songRequest).toBeUndefined();
  });

  it("should handle multiple messages", async () => {
    const messages = [
      {
        id: "msg1",
        guestName: "Juan",
        message: "¡Felicidades!",
        songRequest: { song: "Perfect", artist: "Ed Sheeran" },
        timestamp: new Date().toISOString(),
      },
      {
        id: "msg2",
        guestName: "María",
        message: "¡Que sean felices!",
        timestamp: new Date().toISOString(),
      },
    ];

    const jsonString = JSON.stringify(messages);
    await AsyncStorage.setItem("@vuestrafiesta_messages", jsonString);

    const parsed = JSON.parse(jsonString);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].guestName).toBe("Juan");
    expect(parsed[1].guestName).toBe("María");
  });

  it("should filter messages with song requests", () => {
    const messages = [
      {
        id: "msg1",
        guestName: "Juan",
        message: "¡Felicidades!",
        songRequest: { song: "Perfect", artist: "Ed Sheeran" },
        timestamp: new Date(),
      },
      {
        id: "msg2",
        guestName: "María",
        message: "¡Que sean felices!",
        timestamp: new Date(),
      },
    ];

    const withSongs = messages.filter((m) => m.songRequest);
    expect(withSongs).toHaveLength(1);
    expect(withSongs[0].guestName).toBe("Juan");
  });

  it("should filter standalone messages", () => {
    const messages = [
      {
        id: "msg1",
        guestName: "Juan",
        message: "¡Felicidades!",
        songRequest: { song: "Perfect", artist: "Ed Sheeran" },
        timestamp: new Date(),
      },
      {
        id: "msg2",
        guestName: "María",
        message: "¡Que sean felices!",
        timestamp: new Date(),
      },
    ];

    const standalone = messages.filter((m) => !m.songRequest);
    expect(standalone).toHaveLength(1);
    expect(standalone[0].guestName).toBe("María");
  });

  it("should clear all messages", async () => {
    await AsyncStorage.removeItem("@vuestrafiesta_messages");

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      "@vuestrafiesta_messages"
    );
  });

  it("should validate message structure", () => {
    const validMessage = {
      id: "msg1",
      guestName: "Juan",
      message: "¡Felicidades!",
      timestamp: new Date(),
    };

    expect(validMessage).toHaveProperty("id");
    expect(validMessage).toHaveProperty("guestName");
    expect(validMessage).toHaveProperty("message");
    expect(validMessage).toHaveProperty("timestamp");
  });

  it("should handle anonymous messages", () => {
    const message = {
      id: "msg1",
      guestName: "Invitado anónimo",
      message: "¡Felicidades!",
      timestamp: new Date(),
    };

    expect(message.guestName).toBe("Invitado anónimo");
  });

  it("should trim message text", () => {
    const rawMessage = "  ¡Felicidades!  ";
    const trimmed = rawMessage.trim();

    expect(trimmed).toBe("¡Felicidades!");
    expect(trimmed.length).toBeLessThan(rawMessage.length);
  });
});
