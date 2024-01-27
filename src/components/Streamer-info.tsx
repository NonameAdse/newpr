import { Channel } from 'diagnostics_channel'
import React from 'react'
import { useRouter } from 'next/router'
import { Emotes, TwitchStream, TwitchUser } from '@/shared/api/types'

import DialogIframe from './dialog-iframe'

interface Props {
  user?: TwitchUser
  emotes?: Emotes[]
  clips?: any
}

export const StreamerInfo = ({ user, emotes, clips }: Props) => {
  const router = useRouter()
  const id = router?.query?.id as string
  const navigate = useRouter()

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  // if (!user && !isFetchingUser && !isFetchingStream) {
  //   sessionStorage.setItem("userNotFound", "true");
  //   navigate.push("/");
  // }
  const getRandomPosition = () => ({
    top: `${Math.random() * 32}vh`,
    left: `${Math.random() * 98}vw`,
    transform: `rotate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 10}deg)`,
  })
  return (
    <>
      <div className="z-1 absolute mt-16 flex h-[60vh] w-full overflow-x-hidden">
        {emotes?.map(emote => (
          <div key={emote.id} style={getRandomPosition()} className="z-1 absolute m-4">
            <img className="z-1" src={emote.images.url_2x} alt="" />
          </div>
        ))}
      </div>
      <section className="container z-100 flex flex-col items-center justify-center pb-10">
        <div className="z-[500] flex w-full flex-col items-center justify-center pt-28">
          <div className="z-[500]" />
          <img
            className="z-[500] h-60 w-60 rounded-full border-[2px] border-border pb-1"
            src={user?.profile_image_url}
            alt=""
          />
          <h1 className="rounded-xl border-[2px] border-border bg-black px-2 pb-4 text-6xl lg:text-4xl">
            {user?.display_name}
          </h1>
          <h2 className="rounded-xl border-[2px] border-border bg-black px-2 text-center text-xl lg:text-base">
            {user?.description}
          </h2>
        </div>
        <div className="mt-5 flex items-center justify-center rounded-2xl border-[3px] border-border md:flex-col">
          <iframe
            className="relative h-[68vh] w-[70vw] rounded-2xl pr-2 lg:h-[58vh] lg:w-[75vw] md:h-[50vh] md:w-[96vw] md:pb-1 md:pr-0 sm:h-[30vh]"
            src={`https://player.twitch.tv/?channel=${user?.display_name}&autoplay=1&muted=1&parent=localhost&parent=twitchers-next.vercel.app`}
          />
          <iframe
            className=" h-[68vh] w-[18vw] rounded-2xl lg:h-[58vh] lg:w-[21vw] md:h-[42vh] md:w-[96vw] "
            src={`https://www.twitch.tv/embed/${user?.display_name}/chat?parent=localhost&parent=twitchers-next.vercel.app&darkpopout`}
          ></iframe>
        </div>
      </section>
    </>
  )
}
