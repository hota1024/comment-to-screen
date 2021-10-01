import { NextPage } from 'next'
import Head from 'next/head'
import { createCanvasAppOptions } from 'qratch'
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { CommnetViewer } from '../CommentViewer'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const [socket] = useState(() => io())
  const canvasRef = useRef<HTMLCanvasElement>()

  const updateCanvasSize = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  useEffect(() => {
    const options = createCanvasAppOptions(canvasRef.current)
    const viewer = new CommnetViewer(options)
    viewer.start()

    updateCanvasSize()

    socket.on('comment', (comment: string) => {
      viewer.addComment(comment)
    })

    return () => {
      socket.close()
    }
  }, [])

  return (
    <>
      <Head>
        <title>comment to zoom</title>
      </Head>

      <canvas ref={canvasRef}></canvas>

      <style global jsx>{`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        canvas {
          display: block;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </>
  )
}

export default HomePage
