import express, { Request, Response } from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(() => {
  const server = express()
  server.use(express.json())

  server.post('/', (req, res) => {
    console.log(req.body)
    res.send()
  })

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
  })
})
