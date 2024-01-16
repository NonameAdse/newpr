import React from "react";
import { useRouter } from "next/router";
import { TwitchStream, TwitchUser } from "@/shared/api/types";
import { Channel } from "diagnostics_channel";
import s from "@/styles/Streamer.module.scss";
import DialogIframe from "./dialog-iframe";

interface Props {
  user?: TwitchUser;
  userFollowers?: Channel[];
  currentStream?: TwitchStream;
  emotes?: any;
  clips?: any;
}

export const StreamerInfo = ({
  user,
  userFollowers,
  currentStream,
  emotes,
  clips,
}: Props) => {
  const router = useRouter();
  const id = router?.query?.id as string;
  const navigate = useRouter();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  console.log("Clips", clips);

  // console.log("STREAM", currentStream);
  // if (!user && !isFetchingUser && !isFetchingStream) {
  //   sessionStorage.setItem("userNotFound", "true");
  //   navigate.push("/");
  // }
  return (
    <>
      <section className={s.streamer}>
        <div className={s.streamer_logo}>
          <img src={user?.profile_image_url} alt="" />
          <div className={s.streamer_name}>{user?.display_name}</div>
        </div>
        <div className={s.twitch_player}></div>
        <DialogIframe type="stream" name={user?.display_name}>
          <span className="z-100">
            <iframe
              className="z[-1000] h-[76vh] w-[70vw] pr-2 "
              src={`https://player.twitch.tv/?channel=${user?.display_name}&autoplay=1&muted=1&parent=localhost&parent=twitchers-next.vercel.app`}
            ></iframe>
          </span>
        </DialogIframe>
      </section>
    </>
  );
};
