import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import { getTopStreamsByGame } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import CardVideo from "../card-video";
import { Skeleton } from "../ui/skeleton";

type PropType = {
  slides: any;
  // options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides }) => {
  const router = useRouter();
  const id = router?.query?.id as string;
  const [selectedIndex, setSelectedIndex] = useState(Number(slides[0]?.id));
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [idGame, setIdGame] = useState<string>(slides[0]?.id);

  const {
    data: game,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [`getPopStreams${selectedIndex}`],
    queryFn: async () => getTopStreamsByGame(idGame),
    refetchOnWindowFocus: false,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      setSelectedIndex(index);
      setIdGame(index.toString());

      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    refetch();
    // emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  console.log("GAME", game);
  console.log("SLIDES", slides);

  return (
    <div className="relative rounded-xl p-5">
      <div className="pb-4">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex flex-row">
            {slides.map((game: any, index: number) => (
              <Thumb
                onClick={() => onThumbClick(Number(game.id))}
                selected={Number(game.id) === selectedIndex}
                index={Number(game.id)}
                number={index}
                imgSrc={game.box_art_url
                  .replace("{width}", "2000")
                  .replace("{height}", "2000")}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="z-999" ref={emblaMainRef}>
        <div className="grid grid-cols-5 gap-3">
          {isLoading
            ? Array.from({ length: 50 }, (_, index) => (
                <React.Fragment key={`skeleton-${index}`}>
                  <div
                    className="relative mr-4 w-full overflow-hidden rounded-2xl"
                    style={{ paddingBottom: "52%" }}
                  >
                    <div className="absolute inset-0 px-3">
                      <Skeleton className="h-full w-full" />
                    </div>
                  </div>
                </React.Fragment>
              ))
            : game?.map((game: any) => (
                <CardVideo key={game.id} video={game} type="online"></CardVideo>
              ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
