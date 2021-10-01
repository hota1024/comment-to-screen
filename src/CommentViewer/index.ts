import { CanvasRenderer, QratchApp, Vec2 } from 'qratch'

type Comment = {
  pos: Vec2
  text: string
}

/**
 * CommnetViewer class.
 */
export class CommnetViewer extends QratchApp {
  /**
   * comment array.
   */
  comments: Comment[] = []

  /**
   * comment size.
   */
  commentSize = '24px'

  /**
   * comment stroke size.
   */
  commentStroke = 8

  frame(): void {
    this.update()
    this.draw()
  }

  private update() {
    this.comments = this.comments.filter((c) => {
      c.pos.add(-1, 0)

      return true
    })
  }

  private draw() {
    const { renderer, drawer } = this

    renderer.fill('#00ff00')
    drawer.fillText(`${this.comments.length}`, 0, 16, 'red', void 0, {
      size: '16px',
      font: 'sans-serif',
    })

    this.comments.forEach((c) => {
      const { pos, text } = c

      console.log(text, pos)
      drawer.strokeText(text, pos, this.commentStroke, 'white', void 0, {
        size: this.commentSize,
        font: 'sans-serif',
      })
      drawer.fillText(text, pos, 'black', void 0, {
        size: this.commentSize,
        font: 'sans-serif',
      })
    })
  }

  addComment(text: string): void {
    this.comments.push({
      pos: new Vec2(
        this.renderer.width + 16,
        Math.random() * this.renderer.height
      ),
      text,
    })
  }
}
