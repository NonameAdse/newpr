export interface SearchChannelsResponse {
  data: Channel[];
}
export interface AccessTokenResponse {
  access_token: string;
  expires_in?: number;
}

export interface Channel {
  id: string;
  display_name: string;
  thumbnail_url: string;
  broadcaster_language: string;
  is_live: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  display_name: string;
  broadcaster_type: string;
  created_at: string;
  description: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: string;
  view_count: string;
}

export interface SearchChannelsResponse {
  accessToken: string;
  channels: Channel[];
}

export interface SearchCategoriesResponse {
  categories: Category[];
}

export interface SearchUsersResponse {
  users: User[];
}

export interface GetUserByIdResponse {
  user: User;
}

export interface Video {
  id: string;
  title: string;
  created_at: string;
  description: string;
  duration: string;
  language: string;
  muted_segments: string;
  published_at: string;
  stream_id: string;
  thumbnail_url: string;
  type: string;
  url: string;
  user_id: string;
  user_login: string;
  user_name: string;
  view_count: string;
  viewable: string;
}
type Pages = {
  nextCursor?: string;
  videos?: Video[];
};
type VideoType = {
  pagesParams?: string[] | undefined;
  pages?: Pages[] | undefined;
};
export interface StreamerVideosProps {
  videoData?: VideoType;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export interface TwitchVideo {
  id: string;
  user_id: string;
  title: string;
  thumbnail_url: string;
  duration: string;
  view_count: number;
  language: string;
  user_login: string;
}
export interface TwitchUserResponse {
  data: TwitchUser[];
}

export interface TwitchVideoResponse {
  data: TwitchVideo[];
  pagination: {
    cursor: string;
  };
}
export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
  created_at: string;
  description: string;
}

export interface TwitchUserResponse {
  data: TwitchUser[];
}

export interface TwitchStream {
  id: string;
  user_id: string;
  user_name: string;
  game_id: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
}

export interface TwitchStreamResponse {
  data: TwitchStream[];
}

export interface TwitchCurrent {
  game_id: string;
  game_name: string;
  id: string;
  is_mature: boolean;
  language: string;
  started_at: string;
  tag_ids?: string[];
  tags: string[];
  thumbnail_url: string;
  title: string;
  type: string;
  user_id: string;
  user_login: string;
  user_name: string;
  viewer_count: number;
}
export interface StreamerInfoProps {
  user: User;
  currentStream: TwitchCurrent;
}
