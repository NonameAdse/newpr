import { GetServerSidePropsContext } from "next";
import {
	getAccessToken,
	getEmotes,
	getUserById,
	getUserClips,
} from "@/shared/api/axios";
import { Channel, Emotes, TwitchUser } from "@/shared/api/types";

import { StreamerInfo } from "@/components/Streamer-info";
import { StreamerVideos } from "@/components/Streamer-video";

interface Props {
	user?: TwitchUser;
	// userFollowers?: Channel[];
	emotes?: Emotes[];
	clips?: any;
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const id = context?.params?.id as string;
	const accessToken = await getAccessToken();

	const user = await getUserById(id, accessToken);
	// const userFollowers = await getUserFollowers(id, accessToken);
	const emotes = await getEmotes(id, accessToken);
	const clips = await getUserClips(id, accessToken);

	return { props: { user, emotes, clips } };
}
const Streamer = ({ user, emotes, clips }: Props) => {
	return (
		<article className="overflow-hidden">
			<StreamerInfo user={user} emotes={emotes} clips={clips} />
			<StreamerVideos />
		</article>
	);
};

export default Streamer;
