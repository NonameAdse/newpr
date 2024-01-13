import { cn } from "@/shared/lib/utils";
import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  url?: string;
  clsn?: string;
  children?: ReactNode;
  name?: string;
};

const DialogIframe = ({ url, clsn, children, name }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-auto max-w-lg rounded-xl border-[3px] border-card bg-black ">
        <DialogHeader className="">
          <DialogTitle className="flex items-center justify-center"></DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <iframe
              src={`https://player.twitch.tv/?channel=${name}&autoplay=1&muted=1&parent=localhost`}
              height="720"
              width="400"
            ></iframe>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogIframe;
