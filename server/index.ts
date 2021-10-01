import http from 'http'
import express, { Request, Response } from 'express'
import * as SocketIO from 'socket.io'
import next from 'next'
import { Post } from '../src/models/Post'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(() => {
  const app = express()
  const server = new http.Server(app)
  const io = new SocketIO.Server(server)

  app.use(express.json())

  // eslint-disable-next-line @typescript-eslint/ban-types
  app.post<{}, {}, { post: Post }>('/', (req, res) => {
    const comment = req.body.post.message

    if (comment.includes('\n')) {
      return
    }

    if (comment.length <= 1) {
      return
    }

    if (comment.length > 128) {
      return
    }

    console.log(`[TypeTalk] ${comment}`)
    io.emit('comment', comment)

    res.send()
  })

  app.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
  })
})
