import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SongRequest {
  id: string;
  song: string;
  artist: string;
  guestName?: string;
  message?: string; // Optional congratulation message
  status: "pending" | "playing" | "played" | "rejected";
  timestamp: Date;
}

export interface MustPlaySong {
  id: string;
  song: string;
  artist: string;
  notes?: string;
  timestamp: Date;
}

export interface CongratulationMessage {
  id: string;
  guestName: string;
  message: string;
  songRequest?: {
    song: string;
    artist: string;
  };
  timestamp: Date;
}

const STORAGE_KEY = "@vuestrafiesta_requests";
const MUST_PLAY_STORAGE_KEY = "@vuestrafiesta_must_play";
const MESSAGES_STORAGE_KEY = "@vuestrafiesta_messages";

export function useSongRequests() {
  const [requests, setRequests] = useState<SongRequest[]>([]);
  const [mustPlaySongs, setMustPlaySongs] = useState<MustPlaySong[]>([]);
  const [messages, setMessages] = useState<CongratulationMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Load requests from storage
  const loadRequests = useCallback(async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        const requests = parsed.map((r: any) => ({
          ...r,
          timestamp: new Date(r.timestamp),
        }));
        setRequests(requests);
      }
    } catch (error) {
      console.error("Error loading requests:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load must-play songs from storage
  const loadMustPlaySongs = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(MUST_PLAY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const songs = parsed.map((s: any) => ({
          ...s,
          timestamp: new Date(s.timestamp),
        }));
        setMustPlaySongs(songs);
      }
    } catch (error) {
      console.error("Error loading must-play songs:", error);
    }
  }, []);

  // Load congratulation messages from storage
  const loadMessages = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(MESSAGES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const msgs = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(msgs);
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  }, []);

  // Save requests to storage
  const saveRequests = useCallback(async (newRequests: SongRequest[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRequests));
      setRequests(newRequests);
    } catch (error) {
      console.error("Error saving requests:", error);
    }
  }, []);

  // Save messages to storage
  const saveMessages = useCallback(async (newMessages: CongratulationMessage[]) => {
    try {
      await AsyncStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(newMessages));
      setMessages(newMessages);
    } catch (error) {
      console.error("Error saving messages:", error);
    }
  }, []);

  // Add new request with optional message
  const addRequest = useCallback(
    async (song: string, artist: string, guestName?: string, message?: string) => {
      const newRequest: SongRequest = {
        id: Date.now().toString(),
        song,
        artist,
        guestName,
        message,
        status: "pending",
        timestamp: new Date(),
      };
      const updated = [...requests, newRequest];
      await saveRequests(updated);

      // If there's a message, also save it to the messages list
      if (message && message.trim()) {
        const newMessage: CongratulationMessage = {
          id: Date.now().toString() + "_msg",
          guestName: guestName || "Invitado anónimo",
          message: message.trim(),
          songRequest: {
            song,
            artist,
          },
          timestamp: new Date(),
        };
        const updatedMessages = [...messages, newMessage];
        await saveMessages(updatedMessages);
      }

      return newRequest;
    },
    [requests, messages, saveRequests, saveMessages]
  );

  // Add standalone message (without song request)
  const addMessage = useCallback(
    async (guestName: string, message: string) => {
      const newMessage: CongratulationMessage = {
        id: Date.now().toString(),
        guestName: guestName || "Invitado anónimo",
        message: message.trim(),
        timestamp: new Date(),
      };
      const updated = [...messages, newMessage];
      await saveMessages(updated);
      return newMessage;
    },
    [messages, saveMessages]
  );

  // Delete message
  const deleteMessage = useCallback(
    async (id: string) => {
      const updated = messages.filter((m) => m.id !== id);
      await saveMessages(updated);
    },
    [messages, saveMessages]
  );

  // Clear all messages
  const clearMessages = useCallback(async () => {
    await AsyncStorage.removeItem(MESSAGES_STORAGE_KEY);
    setMessages([]);
  }, []);

  // Update request status
  const updateStatus = useCallback(
    async (id: string, status: SongRequest["status"]) => {
      const updated = requests.map((r) =>
        r.id === id ? { ...r, status } : r
      );
      await saveRequests(updated);
    },
    [requests, saveRequests]
  );

  // Delete request
  const deleteRequest = useCallback(
    async (id: string) => {
      const updated = requests.filter((r) => r.id !== id);
      await saveRequests(updated);
    },
    [requests, saveRequests]
  );

  // Clear all requests
  const clearAll = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setRequests([]);
  }, []);

  // Save must-play songs to storage
  const saveMustPlaySongs = useCallback(async (songs: MustPlaySong[]) => {
    try {
      await AsyncStorage.setItem(MUST_PLAY_STORAGE_KEY, JSON.stringify(songs));
      setMustPlaySongs(songs);
    } catch (error) {
      console.error("Error saving must-play songs:", error);
    }
  }, []);

  // Add must-play song
  const addMustPlaySong = useCallback(
    async (song: string, artist: string, notes?: string) => {
      const newSong: MustPlaySong = {
        id: Date.now().toString(),
        song,
        artist,
        notes,
        timestamp: new Date(),
      };
      const updated = [...mustPlaySongs, newSong];
      await saveMustPlaySongs(updated);
      return newSong;
    },
    [mustPlaySongs, saveMustPlaySongs]
  );

  // Delete must-play song
  const deleteMustPlaySong = useCallback(
    async (id: string) => {
      const updated = mustPlaySongs.filter((s) => s.id !== id);
      await saveMustPlaySongs(updated);
    },
    [mustPlaySongs, saveMustPlaySongs]
  );

  // Clear all must-play songs
  const clearMustPlaySongs = useCallback(async () => {
    await AsyncStorage.removeItem(MUST_PLAY_STORAGE_KEY);
    setMustPlaySongs([]);
  }, []);

  // Check if a song is in the must-play list
  const isMustPlaySong = useCallback(
    (song: string, artist: string) => {
      const normalizedSong = song.toLowerCase().trim();
      const normalizedArtist = artist.toLowerCase().trim();
      
      return mustPlaySongs.some(
        (s) =>
          s.song.toLowerCase().trim() === normalizedSong &&
          s.artist.toLowerCase().trim() === normalizedArtist
      );
    },
    [mustPlaySongs]
  );

  // Get must-play song details if exists
  const getMustPlaySongDetails = useCallback(
    (song: string, artist: string) => {
      const normalizedSong = song.toLowerCase().trim();
      const normalizedArtist = artist.toLowerCase().trim();
      
      return mustPlaySongs.find(
        (s) =>
          s.song.toLowerCase().trim() === normalizedSong &&
          s.artist.toLowerCase().trim() === normalizedArtist
      );
    },
    [mustPlaySongs]
  );

  // Get messages count
  const messagesCount = messages.length;

  // Get messages with song requests
  const messagesWithSongs = messages.filter((m) => m.songRequest);

  // Get standalone messages (without song requests)
  const standaloneMessages = messages.filter((m) => !m.songRequest);

  return {
    requests,
    mustPlaySongs,
    messages,
    messagesCount,
    messagesWithSongs,
    standaloneMessages,
    loading,
    loadRequests,
    loadMustPlaySongs,
    loadMessages,
    addRequest,
    addMessage,
    deleteMessage,
    clearMessages,
    updateStatus,
    deleteRequest,
    clearAll,
    addMustPlaySong,
    deleteMustPlaySong,
    clearMustPlaySongs,
    isMustPlaySong,
    getMustPlaySongDetails,
  };
}
