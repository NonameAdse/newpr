import React, { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

type Props = {
  url?: string;
  clsn?: string;
  children?: ReactNode;
  name?: string;
  type?: "stream" | "offline" | "clips";
  videoId?: number;
};

const DialogIframe = ({ url, clsn, children, name, type, videoId }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className="" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="z-1000 flex h-[82vh] w-[84vw] items-center justify-center rounded-xl border-[3px] border-card bg-background">
        <div className="flex">
          {type === "stream" ? (
            <>
              <iframe
                className="h-[74vh] w-[64vw] pr-2 "
                src={`https://player.twitch.tv/?channel=${name}&autoplay=1&muted=1&parent=localhost&parent=twitchers-next.vercel.app`}
              ></iframe>
              <iframe
                className="h-[74vh] w-[18vw] rounded-2xl "
                src={`https://www.twitch.tv/embed/${name}/chat?parent=localhost&parent=twitchers-next.vercel.app&darkpopout`}
              ></iframe>
            </>
          ) : type === "offline" ? (
              <iframe
                className="h-[76vh] w-[78vw] aspect-video"
                src={`https://player.twitch.tv/?video=v${name}&parent=localhost&parent=twitchers-next.vercel.app&autoplay=false`}
              ></iframe>
          ) : (
            <iframe
              className="h-[76vh] w-[78vw] aspect-video"
              src={`${url}&parent=localhost&parent=twitchers-next.vercel.app`}
            ></iframe>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogIframe;
