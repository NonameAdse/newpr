import { StreamerInfo } from "@/components/Streamer-info";
import s from "./Streamer.module.scss";
import { StreamerVideos } from "@/components/Streamer-video";

const Streamer = () => {
  return (
    <article className="container">
      <StreamerInfo />
      <StreamerVideos />
    </article>
  );
};

export default Streamer;
