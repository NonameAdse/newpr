import React from "react";
import { Badge } from "../ui/badge";

type PropType = {
  selected: boolean;
  imgSrc: string;
  index: number;
  number: number;
  type?: "clips" | "stream";
  onClick: (index: number, type: "clips" | "stream") => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, index, number, onClick } = props;

  return (
    <div
      className={`group relative z-999 mr-4 flex-[0_0_11%] rounded-2xl ${
        selected
          ? "border-[2px] border-card opacity-100 "
          : "border-[2px] opacity-20 hover:opacity-60"
      }`}
    >
      <button
        className=" text-decoration-none m-0 block w-full cursor-pointer appearance-none rounded-2xl border-0 bg-transparent p-0 transition-opacity duration-200 focus:outline-none"
        type="button"
      >
        <div className="absolute mr-1  flex w-full  cursor-pointer justify-end border-0  ">
          <Badge className="flex h-8 w-4 items-center justify-center bg-black/90 p-3">
            <span className="text-lg text-white">{number + 1}</span>
          </Badge>
        </div>
        <img
          className=" h-[220px] rounded-2xl"
          src={imgSrc}
          alt="Your alt text"
        />
      </button>

      <div className="absolute top-0 z-10 flex h-[220px] w-full flex-col rounded-2xl opacity-0 group-hover:opacity-100">
        <div
          onClick={() => onClick(index, "stream")}
          className="flex h-[50%] w-full items-center justify-center bg-blue-600/30"
        >
          <div>
            <h1>Watch stream online</h1>
          </div>
        </div>
        <div
          onClick={() => onClick(index, "clips")}
          className="flex h-[50%] w-full items-center justify-center bg-green-600/40"
        >
          <div>Top Clips</div>
        </div>
      </div>
    </div>
  );
};
