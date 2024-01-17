import React from "react";
import { useRouter } from "next/router";
import { Emotes, TwitchStream, TwitchUser } from "@/shared/api/types";
import { Channel } from "diagnostics_channel";
import s from "@/styles/Streamer.module.scss";
import DialogIframe from "./dialog-iframe";

interface Props {
  user?: TwitchUser;
  emotes?: Emotes[];
  clips?: any;
}

export const StreamerInfo = ({ user, emotes, clips }: Props) => {
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
  const getRandomPosition = () => ({
    top: `${Math.random() * 32}vh`, // Используйте более маленький диапазон для top
    left: `${Math.random() * 100}vw`,
    transform: `rotate(${Math.random() > 0.5 ? "" : "-"}${Math.random() * 10}deg)`,
  });
  console.log("USER", user);
  console.log("EMOTES", emotes);
  return (
    <>
      <div className="z-1 absolute flex h-[60vh] w-full pt-28">
        {emotes?.map((emote) => (
          <div
            key={emote.id}
            style={getRandomPosition()}
            className="z-1 pt-24 absolute"
          >
            <img className="z-1" src={emote.images.url_2x} alt="" />
          </div>
        ))}
      </div>
      <section className="container z-100 flex flex-col items-center justify-center">
        <div className="z-100 flex w-full flex-col items-center justify-center pt-28">
          <div className="z-100"></div>
          <img
            className="h-60 w-60 rounded-full pb-1 border-[2px] border-border"
            src={user?.profile_image_url}
            alt=""
          />
          <h1 className="pb-4 text-6xl bg-black rounded-xl border-[2px] border-border">{user?.display_name}</h1>
          <h2 className="text-xl">{user?.description}</h2>
        </div>
        <div className=""></div>
        <DialogIframe type="stream" name={user?.display_name}>
          <div className="z-100 pt-6">
            <iframe
              className="z-10 h-[60vh] w-[50vw] pr-2 "
              src={`https://player.twitch.tv/?channel=${user?.display_name}&autoplay=1&muted=1&parent=localhost&parent=twitchers-next.vercel.app`}
            ></iframe>
          </div>
        </DialogIframe>
      </section>
    </>
  );
};
