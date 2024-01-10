import React from "react";
import { useQuery } from "@tanstack/react-query";
// import { HiOutlineStatusOffline } from "react-icons/hi";
// import { useNavigate, useParams } from "react-router-dom";
import { TwitchPlayer, TwitchChat } from "react-twitch-embed";
import s from "@/styles/Streamer.module.scss";
import {
  getCurrentStreamByUserId,
  getUserById,
  getUserFollowers,
} from "@/shared/api/axios";
import { useRouter } from "next/router";

export const StreamerInfo = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  const navigate = useRouter();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data: user, isFetching: isFetchingUser } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => getUserById(id),
    refetchOnWindowFocus: false,
  });

  const { data: userFollowers } = useQuery({
    queryKey: ["getUserFollowers"],
    queryFn: async () => getUserFollowers(id),
    refetchOnWindowFocus: false,
  });
  console.log("Followers", userFollowers);

  const { data: currentStream, isFetching: isFetchingStream } = useQuery({
    queryKey: ["getCurrentStream"],
    queryFn: async () => getCurrentStreamByUserId(id),
    refetchOnWindowFocus: false,
  });

  console.log("STREAM", currentStream);
  if (!user && !isFetchingUser && !isFetchingStream) {
    sessionStorage.setItem("userNotFound", "true");
    navigate.push("/");
  }
  return (
    <>
      <section className={s.streamer}>
        <div className={s.streamer_logo}>
          <img src={user?.profile_image_url} alt="" />
          <div className={s.streamer_name}>{user?.display_name}</div>
        </div>
        <div
          className={s.twitch_player}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {currentStream && !isModalOpen ? (
            <div className={s.twitch_player2}>
              <iframe
                className={s.twitch_player_main}
                src={`https://player.twitch.tv/?channel=${user?.display_name}&autoplay=1&muted=1&parent=localhost`}
                height="320"
                width="580"
                allowFullScreen={true}
              ></iframe>
            </div>
          ) : (
            // <HiOutlineStatusOffline className={s.twitch_offline} />
            <div></div>
          )}
        </div>
      </section>
      {isModalOpen && currentStream && (
        <div className={s.modal_overlay}>
          <div className={s.modal_content}>
            <div
              className={s.close_button}
              onClick={() => setIsModalOpen(false)}
            ></div>
            <iframe
              src={`https://www.twitch.tv/embed/${user?.display_name}/chat?parent=localhost&darkpopout`}
              height="720"
              width="400" // Вы можете настроить ширину чата по своему усмотрению
            ></iframe>
            {currentStream && (
              <div>
                <iframe
                  className={s.twitch_player_main_2}
                  src={`https://player.twitch.tv/?channel=${user?.display_name}&autoplay=1&muted=1&parent=localhost`}
                  height="720"
                  width="1280"
                  // frameBorder="0"
                  allowFullScreen={true}
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
