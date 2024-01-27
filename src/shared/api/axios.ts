import axios, { AxiosError, AxiosResponse } from "axios";

import {
	AccessTokenResponse,
	Channel,
	Emotes,
	SearchChannelsResponse,
	TopGame,
	TwitchCurrent,
	TwitchStream,
	TwitchStreamResponse,
	TwitchUser,
	TwitchUserResponse,
	TwitchVideo,
	TwitchVideoResponse,
} from "./types";

// const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
// const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

// async function getAccessToken() {
//   try {
//     const cachedToken = await redis.get("token");

//     if (cachedToken) {
//       console.log("Токен найден в Redis:", cachedToken);
//       return cachedToken;
//     }

//     const { data } = await axios.post(
//       "https://id.twitch.tv/oauth2/token",
//       null,
//       {
//         params: {
//           client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
//           client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//           grant_type: "client_credentials",
//         },
//       },
//     );

//     // Сохранить новый токен в Redis
//     await redis.set("token", data.access_token);
//     console.log("Новый токен успешно установлен в Redis");

//     return data.access_token;
//   } catch (error) {
//     console.error("Произошла ошибка:", error);
//     throw error; // Если нужно, перебросьте ошибку выше
//   }
// }

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
					client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
					client_secret: clientSecret,
					grant_type: "client_credentials",
				},
			},
		);

		console.log("TOKEWOEKOWEKOW");
		accessToken = response.data.access_token;
		tokenExpirationTime = Date.now() + response.data.expires_in * 1000;

		return accessToken;
	} catch (error) {
		console.error("Error fetching access token:", error);
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
					"Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		return response.data.data;
	} catch (error: any) {
		console.error(error.response?.data || error.message);
		throw error;
	}
}

// export async function getUserFollowers(
//   userId: string,
//   accessToken?: string,
// ): Promise<> {
//   // const accessToken = await getAccessToken();
//   try {
//     const { data } = await axios.get(
//       "https://api.twitch.tv/helix/channels/followers",
//       {
//         params: {
//           broadcaster_id: userId,
//         },
//         headers: {
//           "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
//           Authorization: `Bearer ${accessToken}`,
//         },
//       },
//     );

//     return data;
//   } catch (error: any) {
//     console.error(error.response?.data || error.message);
//     throw error;
//   }
// }

export async function getUserById(
	userId: string,
	accessToken?: string,
): Promise<TwitchUser | null> {
	// if (accessToken) {
	//   const newToken = await getAccessToken();
	// }
	// const accessToken = await getAccessToken();

	try {
		const response = await axios.get<TwitchUserResponse>(
			"https://api.twitch.tv/helix/users",
			{
				params: {
					id: userId,
				},
				headers: {
					"Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
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
	accessToken?: string,
): Promise<TwitchStream | null> {
	// const accessToken = await getAccessToken();

	try {
		const response = await axios.get<TwitchStreamResponse>(
			"https://api.twitch.tv/helix/streams",
			{
				params: {
					user_id: userId,
				},
				headers: {
					"Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		const stream = response.data.data[0];
		return stream || null;
	} catch (error: any) {
		console.error(error.response?.data || error.message);
		throw error;
	}
}

export async function getVideosByUserId(
	userId: string,
	cursor: string | null,
	type: "offline" | "stream" | "clips",
): Promise<{ videos: TwitchVideo[]; nextCursor: string | null }> {
	const accessToken = await getAccessToken();

	try {
		let url;
		if (type === "clips") {
			url = `https://api.twitch.tv/helix/clips?broadcaster_id=${userId}`;
		} else {
			url = `https://api.twitch.tv/helix/videos?user_id=${userId}`;
		}
		const { data } = await axios.get<TwitchVideoResponse>(url, {
			params: {
				first: 40,
				after: cursor,
			},
			headers: {
				"Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const videos = data.data;
		const nextCursor = data.pagination.cursor;

		return { videos, nextCursor };
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function getTopGames(
	accessToken?: string,
): Promise<{ data: TopGame[] }> {
	// const accessToken = await getAccessToken();

	try {
		const { data } = await axios.get("https://api.twitch.tv/helix/games/top", {
			params: {
				first: 50,
			},
			headers: {
				"Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
				Authorization: `Bearer ${accessToken}`,
			},
		});

		// const games = response.data.data;
		return data.data;
	} catch (error: any) {
		console.error(error.response?.data || error.message);
		throw error;
	}
}

export async function getTopStreamsByGame(
	gameId: string,
	type: string,
): Promise<TwitchCurrent[]> {
	const accessToken = await getAccessToken();

	try {
		let url;
		if (type === "clips") {
			url = "https://api.twitch.tv/helix/clips";
		} else {
			url = "https://api.twitch.tv/helix/streams";
		}

		const { data } = await axios.get(url, {
			params: {
				game_id: gameId,
				first: 40,
			},
			headers: {
				"Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return data.data;
	} catch (error: any) {
		console.error(error.response?.data || error.message);
		throw error;
	}
}

export async function getEmotes(
	userId: string,
	accessToken?: string,
): Promise<Emotes[]> {
	// const accessToken = await getAccessToken();

	try {
		const { data } = await axios.get(
			"https://api.twitch.tv/helix/chat/emotes",
			{
				params: {
					broadcaster_id: userId,
				},
				headers: {
					"Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		return data?.data;
	} catch (error: any) {
		console.error(error.response?.data || error.message);
		throw error;
	}
}

export async function getUserClips(
	userId: string,
	accessToken?: string,
): Promise<any> {
	// const accessToken = await getAccessToken();

	try {
		const { data } = await axios.get("https://api.twitch.tv/helix/clips", {
			params: {
				broadcaster_id: userId,
			},
			headers: {
				"Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return data.data;
	} catch (error: any) {
		console.error(error.response?.data || error.message);
		throw error;
	}
}
export async function getGameClips(
	// gameId: string,
	accessToken?: string,
): Promise<any> {
	// const accessToken = await getAccessToken();

	try {
		const { data } = await axios.get("https://api.twitch.tv/helix/clips", {
			// params: {
			//   game_id: gameId,
			// },
			headers: {
				"Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return data.data;
	} catch (error: any) {
		console.error(error.response?.data || error.message);
		throw error;
	}
}
