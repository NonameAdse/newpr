import { StreamerInfo } from "@/components/Streamer-info";
import { StreamerVideos } from "@/components/Streamer-video";
import {
  getAccessToken,
  getCurrentStreamByUserId,
  getEmotes,
  getUserById,
  getUserClips,
  getUserFollowers,
} from "@/shared/api/axios";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context?.params?.id as string;
  const accessToken = await getAccessToken();

  const user = await getUserById(id, accessToken);
  const userFollowers = await getUserFollowers(id, accessToken);
  const currentStream = await getCurrentStreamByUserId(id, accessToken);
  const emotes = await getEmotes(id, accessToken);
  const clips = await getUserClips(id, accessToken);

  return { props: { user, userFollowers, currentStream, emotes, clips } };
}
const Streamer = ({
  user,
  userFollowers,
  currentStream,
  emotes,
  clips,
}: any) => {
  console.log("USERNEW", user);
  return (
    <article className="container overflow-x-hidden">
      <StreamerInfo
        user={user}
        currentStream={currentStream}
        emotes={emotes}
        userFollowers={userFollowers}
        clips={clips}
      />
      <StreamerVideos />
    </article>
  );
};

export default Streamer;
