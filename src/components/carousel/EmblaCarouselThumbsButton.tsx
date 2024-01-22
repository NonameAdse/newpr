import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'

type PropType = {
  selected: boolean
  imgSrc: string
  index: number
  number: number
  type?: 'clips' | 'stream'
  onClick: (index: number, type: 'clips' | 'stream') => void
}

export const Thumb: React.FC<PropType> = ({ selected, imgSrc, index, number, onClick }) => {
  return (
    <div
      className={`group relative z-999 mr-4 flex-[0_0_12%] rounded-2xl  ${
        selected
          ? 'border-[2px] border-card opacity-100 '
          : 'border-[2px] opacity-30 hover:opacity-60'
      }`}
    >
      <button
        className="text-decoration-none m-0 block w-full cursor-pointer rounded-2xl border-0 bg-transparent p-0 transition-opacity duration-300 focus:outline-none"
        type="button"
      >
        <div className="absolute mr-1  flex w-full  cursor-pointer justify-end border-0  ">
          <Badge className="flex h-8 w-4 items-center justify-center bg-black/90 p-3">
            <span className="text-lg text-white">{number + 1}</span>
          </Badge>
        </div>
        <img className="ImgCarusel" src={imgSrc} alt="Your alt text" />
      </button>

      <div className="ImgCarusel absolute top-0 z-10 flex w-full flex-col rounded-2xl opacity-0 group-hover:opacity-100">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => onClick(index, 'stream')}
          style={{
            backgroundImage: 'linear-gradient(to top, transparent 50%, rgba(0, 0, 0, 0.9) 100%)',
          }}
          className="relative flex h-[50%] w-full items-center justify-center bg-black/50 hover:bg-black/5"
        >
          <motion.button whileHover={{ scale: 1.1 }} className="mt-5 text-white focus:outline-none">
            <Badge className="text-base text-white xl:text-sm">Stream Online</Badge>
          </motion.button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => onClick(index, 'clips')}
          style={{
            backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9) 100%)',
          }}
          className="relative flex h-[50%] w-full items-center justify-center bg-black/50 hover:bg-black/5"
        >
          <motion.button whileHover={{ scale: 1.1 }} className="mb-5 text-white focus:outline-none">
            <Badge className="text-base text-white xl:text-sm">Top Clips</Badge>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
