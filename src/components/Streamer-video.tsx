import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getVideosByUserId } from "@/shared/api/axios";
import { useRouter } from "next/router";
import CardVideo from "./card-video";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

export const StreamerVideos = () => {
  const router = useRouter();
  const id = router?.query?.id as string;
  const [type, setType] = useState<"offline" | "stream" | "clips">("offline");

  const fetchVideos = async ({
    pageParam = null,
  }: {
    pageParam?: string | null;
  }) => {
    const result = await getVideosByUserId(id, pageParam, type);
    return result;
  };

  const {
    data,
    fetchNextPage,
    refetch,
    hasNextPage,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getVideosByUserId", id],
    queryFn: fetchVideos,
    getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
    initialPageParam: undefined,
    refetchOnWindowFocus: false,
  });
  const ToggleType = async (type: "offline" | "stream" | "clips") => {
    await setType(type);
    await refetch();
  };

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!data || data?.pages?.length === 0) {
    return <div>У пользователя нет видео.</div>;
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const videos = data?.pages?.flatMap((page) => page?.videos);
  return (
    <section className="container pt-4 ">
      <div className="rounded-xl  border-[2px] border-border">
        <div className="flex items-center justify-evenly py-8">
          <Button
            onClick={() => ToggleType("offline")}
            variant="ghost"
            className={`border-[2px] border-border px-32 py-6 text-white ${
              type === "offline" ? "bg-primary" : ""
            }`}
          >
            Streams
          </Button>
          <Button
            onClick={() => ToggleType("clips")}
            variant="ghost"
            className={`border-[2px] border-border px-32 py-6 text-white ${
              type === "clips" ? "bg-primary" : ""
            }`}
          >
            Clips
          </Button>
        </div>
        <div className="gridCard">
          {isRefetching
            ? Array.from({ length: 40 }, (_, index) => (
                <React.Fragment key={`skeleton-${index}`}>
                  <motion.div
                    initial={{ opacity: 0.9, scale: 1 }}
                    animate="visible"
                    exit={{ opacity: 0.8, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative mr-4 w-full overflow-hidden rounded-2xl"
                    style={{ paddingBottom: "52%" }}
                  >
                    <div className="absolute inset-0 px-3">
                      <Skeleton className="h-full w-full" />
                    </div>
                  </motion.div>
                </React.Fragment>
              ))
            : videos?.map((video) => (
                <motion.div
                  ref={ref}
                  key={video.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                >
                  <CardVideo type={type} video={video}></CardVideo>
                </motion.div>
              ))}

          <AnimatePresence>
            {isFetchingNextPage &&
              Array.from({ length: 40 }, (_, index) => (
                <React.Fragment key={`skeleton-${index}`}>
                  <motion.div
                    initial={{ opacity: 0.9, scale: 1 }}
                    animate="visible"
                    exit={{ opacity: 0.8, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative mr-4 w-full overflow-hidden rounded-2xl"
                    style={{ paddingBottom: "52%" }}
                  >
                    <div className="absolute inset-0 px-3">
                      <Skeleton className="h-full w-full" />
                    </div>
                  </motion.div>
                </React.Fragment>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
