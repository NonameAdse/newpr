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
      <DialogContent className="z-1000 flex h-[82vh] w-[92vw] items-center justify-center rounded-xl border-[3px] border-card bg-background">
        <div className="flex">
          {type === "stream" ? (
            <>
              <iframe
                className="h-[76vh] w-[70vw] pr-2  "
                src={`https://player.twitch.tv/?channel=${name}&autoplay=1&muted=1&parent=localhost`}
              ></iframe>
              <iframe
                className="h-[76vh] w-[20vw] rounded-2xl pt-2 "
                src={`https://www.twitch.tv/embed/${name}/chat?parent=localhost&darkpopout`}
              ></iframe>
            </>
          ) : type === "offline" ? (
            <iframe
              className="h-[76vh] w-[90vw]"
              src={`https://player.twitch.tv/?video=v${name}&parent=localhost&parent=twitchers.vercel.app&autoplay=false`}
              allowFullScreen
            ></iframe>
          ) : (
            <iframe
              className="h-[76vh] w-[90vw]"
              src={`${url}&parent=localhost`}
            ></iframe>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogIframe;
