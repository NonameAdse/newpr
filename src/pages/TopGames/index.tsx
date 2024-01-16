// import { getTopGames } from "@/shared/api/axios";
// import { useQuery } from "@tanstack/react-query";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React from "react";

// // type Props = {};

// const TopGames = () => {
//   const router = useRouter();
//   // const id = router?.query?.id as string;

//   const [isModalOpen, setIsModalOpen] = React.useState(false);
//   const { data: games, isFetching: isFetchingGames } = useQuery({
//     queryKey: ["getUser"],
//     queryFn: async () => getTopGames(),
//     refetchOnWindowFocus: false,
//   });

//   // console.log("GAME", games?.data);

//   return (
//     <div>
//       <div></div>
//       {games?.data?.map((game) => (
//         <Link href={`game/${game.id}`} key={game.name}>
//           <div>{game.name}</div>
//           <img
//             src={game.box_art_url
//               .replace("{width}", "320")
//               .replace("{height}", "180")}
//             alt=""
//           />
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default TopGames;
