import axios, { AxiosError, AxiosResponse } from "axios";
import {
  AccessTokenResponse,
  Channel,
  SearchChannelsResponse,
  TwitchStream,
  TwitchStreamResponse,
  TwitchUser,
  TwitchUserResponse,
  TwitchVideo,
  TwitchVideoResponse,
  User,
  Video,
} from "./types";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

export async function getAccessToken(): Promise<string> {
  if (accessToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
    return accessToken;
  }

  try {
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
    const response: AxiosResponse<AccessTokenResponse> = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials",
        },
      },
    );

    accessToken = response.data.access_token;
    tokenExpirationTime = Date.now() + response.data.expires_in! * 1000;

    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem(
      "tokenExpirationTime",
      tokenExpirationTime.toString(),
    );

    return accessToken;
  } catch (error: any) {
    console.error(
      error.response?.data || error.message,
    );
    throw error;
  }
}

export async function searchChannels(searchQuery: string): Promise<Channel[]> {
  const accessToken = await getAccessToken();
  try {
    const response: AxiosResponse<SearchChannelsResponse> = await axios.get(
      "https://api.twitch.tv/helix/search/channels",
      {
        params: {
          query: searchQuery,
          first: 5,
        },
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data.data;
  } catch (error: any) {
    console.error(
      error.response?.data || error.message,
    );
    throw error;
  }
}

export async function getUserById(userId: string): Promise<TwitchUser | null> {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.get<TwitchUserResponse>(
      "https://api.twitch.tv/helix/users",
      {
        params: {
          id: userId,
        },
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const user = response.data.data[0];
    return user || null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCurrentStreamByUserId(
  userId: string,
): Promise<TwitchStream | null> {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.get<TwitchStreamResponse>(
      "https://api.twitch.tv/helix/streams",
      {
        params: {
          user_id: userId,
        },
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const stream = response.data.data[0];
    return stream || null;
  } catch (error: any) {
    console.error(
      error.response?.data || error.message,
    );
    throw error;
  }
}

export async function getVideosByUserId(
  userId: string,
  cursor: string | null = null,
): Promise<{ videos: TwitchVideo[]; nextCursor: string | null }> {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.get<TwitchVideoResponse>(
      "https://api.twitch.tv/helix/videos",
      {
        params: {
          user_id: userId,
          first: 20,
          after: cursor,
        },
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const videos = response.data.data;
    const nextCursor = response.data.pagination.cursor;

    return { videos, nextCursor };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
