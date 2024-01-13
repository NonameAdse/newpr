import React, { useState, useEffect, useCallback } from "react";
// import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import { getTopStreamsByGame } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import DialogIframe from "../dialog-iframe";
// import imageByIndex from "./imageByIndex";

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

  const { data: game, refetch } = useQuery({
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
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  console.log("GAME", game);

  return (
    <div className="embla">
      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((game: any, index: number) => (
              <Thumb
                onClick={() => onThumbClick(Number(game.id))}
                selected={Number(game.id) === selectedIndex}
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
        <div className="embla__slide">
          <div className="grid grid-cols-4 gap-4">
            {game?.map((game: any) => (
              <DialogIframe url="" name={game.user_name} key={game.id}>
                <div>
                  <div className="embla__slide__number"></div>
                  <img
                    className="embla__slide__img"
                    src={game.thumbnail_url

                      .replace("{width}", "320")
                      .replace("{height}", "180")}
                    alt="Your alt text"
                  />
                </div>
              </DialogIframe>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
