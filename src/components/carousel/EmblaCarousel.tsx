import React, { useState, useEffect, useCallback } from "react";
// import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import { getTopStreamsByGame } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
// import imageByIndex from "./imageByIndex";

type PropType = {
  slides: any;
  // options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides } = props;
  const router = useRouter();
  const id = router?.query?.id as string;
  const [selectedIndex, setSelectedIndex] = useState(slides[0]?.id);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const [idGame, setIdGame] = useState<string>(slides[0]?.id);

  const {
    data: game,
    isFetching: isFetchingGames,
    refetch,
  } = useQuery({
    queryKey: ["getPopStreams"],
    queryFn: async () => getTopStreamsByGame(idGame),
    refetchOnWindowFocus: false,
  });
  console.log("NEWWW", game);

  return (
    <div className="embla">
      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((game: any, index: number) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={game.box_art_url
                  .replace("{width}", "320")
                  .replace("{height}", "180")}
                key={game.id}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="grid grid-cols-4 gap-4">
          {game?.map((game: any) => (
            <div className="embla__slide" key={game.id}>
              <div className="embla__slide__number"></div>
              <img
                className="embla__slide__img"
                src={game.thumbnail_url

                  .replace("{width}", "320")
                  .replace("{height}", "180")}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
