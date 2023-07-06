import React, { useCallback, useState, useMemo, Fragment } from 'react'
import { motion } from "framer-motion"
import emoji from "react-easy-emoji"
import { generateMines } from "@/lib/config"
import { Howl } from 'howler'
import Image from 'next/image'
import BombLogo from "@/public/assets/images/bomb.png"
import TileLogo from "@/public/assets/images/tile.png"
import Head from 'next/head'
import Background from '@/components/background-effect'
export default function Game() {
  const tile = useMemo(() => new Howl({ src: ["/assets/sounds/tile.mp3"], volume: 0.7, preload: true }), []);
  const bomb = useMemo(() => new Howl({ src: ["/assets/sounds/bomb.mp3"], volume: 0.7, preload: true }), []);
  const [gameData, setGameData] = useState<{ mines: number[], isGameOver?: boolean }>({ mines: generateMines() })
  const [clickBlocks, setClickBlocks] = useState<number[]>([])
  const onCheckBlock = useCallback((i: number) => {
    if (!gameData.isGameOver && !clickBlocks.includes(i)) {
      tile.play()
      if (gameData.mines.includes(i)) {
        bomb.play()
        setGameData((e) => ({ ...e, isGameOver: true }))
        setClickBlocks((e) => [...e, i])
      } else {
        setClickBlocks((e) => [...e, i])
      }
    }
  }, [bomb, clickBlocks, gameData.isGameOver, gameData.mines, tile])
  const onRestart = useCallback(() => {
    setClickBlocks([])
    setGameData((e) => ({ mines: generateMines(), isGameOver: false }))
    tile.play()
  }, [tile])
  return (
    <Fragment>
      <Head>
        <title>Mines</title>
      </Head>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-screen w-screen flex justify-center items-center p-4 relative overflow-hidden">
        <Background key="bgn" />
        <div className='absolute w-full h-full flex justify-center items-center p-4'>
          <div className="w-full md:w-[30rem] dark:bg-secondary-dark translucent shadow-xl p-4 rounded-lg">
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
            <div className='flex flex-col mt-5 px-4'>
              <motion.button
                onClick={onRestart}
                disabled={!gameData?.isGameOver}
                className="h-12 disabled:dark:bg-amber-600/10 disabled:cursor-not-allowed disabled:dark:text-zinc-500 w-full rounded-xl p-1 text-base font-semibold shadow transition-all dark:bg-amber-600 dark:focus:ring-2 dark:focus:ring-amber-600 dark:focus:ring-offset-1 dark:focus:ring-offset-secondary-dark">
                Restart
              </motion.button>
            </div>
          </div>
        </div>
      </motion.main >
    </Fragment>
  )
}