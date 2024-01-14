import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import s from "@/styles/Streamer.module.scss";
import { getVideosByUserId } from "@/shared/api/axios";
import { useRouter } from "next/router";
import CardVideo from "./card-video";
import { useInView } from "react-intersection-observer";
import { ReloadIcon } from "@radix-ui/react-icons";

export const StreamerVideos = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  const fetchVideos = async ({
    pageParam = null,
  }: {
    pageParam?: string | null;
  }) => {
    const result = await getVideosByUserId(id, pageParam);
    return result;
  };
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["getVideosByUserId", id],
      queryFn: fetchVideos,
      getNextPageParam: (lastPage) => lastPage.nextCursor || null,
      initialPageParam: undefined,
      refetchOnWindowFocus: false,
    });

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isFetching && !isFetchingNextPage) {
    return (
      <div className={s.loading}>
        <div className={s.ldio}>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (!data || data?.pages?.length === 0) {
    return <div>У пользователя нет видео.</div>;
  }

  const videos = data?.pages.flatMap((page) => page.videos);
  console.log("VIDEO", videos);
  return (
    <section className={s.streamer_video}>
      <div className="grid grid-cols-5 gap-4">
        {videos?.map((video) => (
          <div ref={ref} key={video.id}>
            <CardVideo video={video}></CardVideo>
          </div>
        ))}
        {isFetchingNextPage && (
          <div className={s.loader}>
            <ReloadIcon className="h-10 w-10 animate-spin" />
          </div>
        )}
      </div>
    </section>
  );
};
