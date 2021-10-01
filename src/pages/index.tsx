import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { createCanvasAppOptions, FontWeight } from 'qratch'
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { CommnetViewer } from '../CommentViewer'

type Query = {
  fontSize?: string
  stroke?: string
  speedRatio?: string
  font?: string
  fontWeight?: FontWeight
  strokeColor?: string
  fillColor?: string
  background?: string
}

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const [socket] = useState(() => io())
  const canvasRef = useRef<HTMLCanvasElement>()
  const router = useRouter()

  const updateCanvasSize = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    const query = router.query as Query

    const options = createCanvasAppOptions(canvasRef.current)
    const viewer = new CommnetViewer(options)
    viewer.fontSize = query.fontSize
      ? parseFloat(query.fontSize)
      : viewer.fontSize
    viewer.commentStroke = query.stroke
      ? parseFloat(query.stroke)
      : viewer.commentStroke
    viewer.speedRatio = query.speedRatio
      ? parseFloat(query.speedRatio)
      : viewer.speedRatio
    viewer.font = query.font ?? viewer.font
    viewer.fontWeight = query.fontWeight ?? viewer.fontWeight
    viewer.strokeColor = query.strokeColor ?? viewer.strokeColor
    viewer.fillColor = query.fillColor ?? viewer.fillColor
    viewer.background = query.background ?? viewer.background
    console.log(query, viewer)
    viewer.start()

    updateCanvasSize()

    socket.on('comment', (comment: string) => {
      viewer.addComment(comment)
    })

    return () => {
      socket.close()
    }
  }, [router.isReady])

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
