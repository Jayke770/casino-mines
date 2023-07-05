import { useState } from 'react'
import { motion } from "framer-motion"
import emoji from "react-easy-emoji"
import { generateMines } from "@/lib/config"
import { Howl } from 'howler'
import Image from 'next/image'
import BombLogo from "@/public/assets/images/bomb.png"
import TileLogo from "@/public/assets/images/tile.png"
import Head from 'next/head'
const tile = new Howl({ src: ["/assets/sounds/bomb.mp3"], volume: 0.7 })
const bomb = new Howl({ src: ["/assets/sounds/tile.mp3"], volume: 0.7 })
export default function Game() {
  const [gameData, setGameData] = useState<{ mines: number[], isGameOver?: boolean }>({ mines: generateMines() })
  const [clickBlocks, setClickBlocks] = useState<number[]>([])
  const onCheckBlock = (i: number) => {
    if (!gameData?.isGameOver) {
      if (gameData?.mines.includes(i)) {
        tile.play()
        setGameData(e => ({ ...e, isGameOver: true }))
        setClickBlocks(e => ([...e, i]))
      } else {
        bomb.play()
        setClickBlocks(e => ([...e, i]))
      }
    }
  }
  return (
    <>
      <Head>
        <title>Mines</title>
      </Head>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-screen w-screen flex justify-center items-center p-4">
        <div className="w-full md:w-[30rem]  dark:bg-secondary-dark p-4 shadow-xl rounded-lg">
          <div className="flex justify-center gap-2 items-center py-2 text-4xl ">
            {emoji("💣")}
            <h1 className="font-bold">Mines</h1>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-5">
            {Array(25).fill(0).map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 1.1 }}
                onClick={() => onCheckBlock(i)}
                className={`${gameData?.isGameOver || clickBlocks.includes(i) ? gameData?.mines.includes(i) ? "tile-bomb" : "tile-star" : "tile-active"} transition-all`}>
                {gameData?.isGameOver || clickBlocks.includes(i) ? (
                  <motion.div
                    key={`block-${i}`}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.6 }}
                    transition={{ type: "spring", bounce: 0.7, duration: 0.8 }}
                    className="p-0.5 md:p-2">
                    <Image
                      src={gameData?.mines.includes(i) ? BombLogo : TileLogo}
                      priority
                      alt={gameData?.mines.includes(i) ? "bomd" : "tile"}
                      className='object-contain w-full h-full' />
                  </motion.div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.main>
    </>
  )
}