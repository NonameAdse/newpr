import { getTopStreamsByGame } from "@/shared/api/axios";
import { redis } from "@/shared/lib/redis";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

// type Props = {};

const Game = () => {
  const router = useRouter();
  const id = router?.query?.id as string;
  console.log("Id", id);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data: game, isFetching: isFetchingGames } = useQuery({
    queryKey: ["getPopStreams"],
    queryFn: async () => getTopStreamsByGame(id),
    refetchOnWindowFocus: false,
  });
  console.log("GameONE", game?.data);

  return <div className="pt-96">add</div>;
};

export default Game;
