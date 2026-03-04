import { describe, it, expect } from 'vitest';

// Función para obtener token de Spotify
async function getSpotifyToken(clientId: string, clientSecret: string): Promise<string | null> {
  try {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      console.error('Spotify auth failed:', response.statusText);
      return null;
    }

    const data = await response.json() as { access_token: string };
    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    return null;
  }
}

describe('Spotify Integration', () => {
  it('should authenticate with Spotify API', async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    expect(clientId).toBeDefined();
    expect(clientSecret).toBeDefined();

    if (!clientId || !clientSecret) {
      throw new Error('Spotify credentials not provided');
    }

    const token = await getSpotifyToken(clientId, clientSecret);
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    expect(token?.length).toBeGreaterThan(0);
  });

  it('should search for a song on Spotify', async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Spotify credentials not provided');
    }

    const token = await getSpotifyToken(clientId, clientSecret);
    expect(token).toBeTruthy();

    if (!token) return;

    const response = await fetch('https://api.spotify.com/v1/search?q=Perfect%20Ed%20Sheeran&type=track&limit=1', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    expect(response.ok).toBe(true);
    const data = await response.json() as { tracks: { items: Array<{ name: string; artists: Array<{ name: string }> }> } };
    expect(data.tracks.items.length).toBeGreaterThan(0);
    expect(data.tracks.items[0].name).toBeDefined();
  });
});
