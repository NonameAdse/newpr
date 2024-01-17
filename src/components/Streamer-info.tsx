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

  // if (!user && !isFetchingUser && !isFetchingStream) {
  //   sessionStorage.setItem("userNotFound", "true");
  //   navigate.push("/");
  // }
  const getRandomPosition = () => ({
    top: `${Math.random() * 32}vh`,
    left: `${Math.random() * 98}vw`,
    transform: `rotate(${Math.random() > 0.5 ? "" : "-"}${Math.random() * 10}deg)`,
  });
  return (
    <>
      <div className="z-1 absolute mt-16 flex h-[60vh] w-full overflow-x-hidden">
        {emotes?.map((emote) => (
          <div
            key={emote.id}
            style={getRandomPosition()}
            className="z-1 absolute m-4"
          >
            <img className="z-1" src={emote.images.url_2x} alt="" />
          </div>
        ))}
      </div>
      <section className="container z-100 flex flex-col items-center justify-center pb-10">
        <div className="z-100 flex w-full flex-col items-center justify-center pt-28">
          <div className="z-100"></div>
          <img
            className="h-60 w-60 rounded-full border-[2px] border-border pb-1"
            src={user?.profile_image_url}
            alt=""
          />
          <h1 className="rounded-xl border-[2px] border-border bg-black px-2 pb-4 text-6xl">
            {user?.display_name}
          </h1>
          <h2 className="rounded-xl border-[2px] border-border bg-black px-2 text-xl">
            {user?.description}
          </h2>
        </div>
        <div className=""></div>
        <DialogIframe type="stream" name={user?.display_name}>
          <div className="relative z-1000 pt-6 cursor-pointer">
            <div className="relative cursor-pointer h-[60vh] w-[50vw]">
              <iframe
                className="relative z-[-100] h-[60vh] w-[50vw] pr-2 "
                src={`https://player.twitch.tv/?channel=${user?.display_name}&autoplay=1&muted=1&parent=localhost&parent=twitchers-next.vercel.app`}
              ></iframe>
            </div>
          </div>
        </DialogIframe>
      </section>
    </>
  );
};
