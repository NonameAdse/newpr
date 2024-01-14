import React from "react";

type PropType = {
  selected: boolean;
  imgSrc: string;
  index: number;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, index, onClick } = props;

  return (
    <div
      className={`relative flex-[0_0_11%] rounded-2xl mr-4 ${
        selected ? "opacity-100 border-card border-[4px] "  : "opacity-20"
      }`}
    >
      <button
        onClick={onClick}
        className="rounded-2xl text-decoration-none m-0 block w-full cursor-pointer appearance-none border-0 bg-transparent p-0 transition-opacity duration-200 focus:outline-none"
        type="button"
      >
        {/* <div className="embla-thumbs__slide__number">
          <span>{index + 1}</span>
        </div> */}
        <img

          className=" h-[220px] rounded-2xl"
          src={imgSrc}
          alt="Your alt text"
        />
      </button>
    </div>
  );
};
