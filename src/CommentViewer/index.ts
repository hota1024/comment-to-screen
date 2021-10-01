import { FontWeight, QratchApp, Vec2 } from 'qratch'

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
   * comment font size.
   */
  fontSize = 24

  /**
   * comment stroke size.
   */
  commentStroke = 8

  /**
   * speed ratio.
   */
  speedRatio = 0.1

  /**
   * comment font.
   */
  font = `'Noto Sans JP'`

  /**
   * comment font weight.
   */
  fontWeight: FontWeight = 'bold'

  /**
   * comment stroke color.
   */
  strokeColor = 'white'

  /**
   * comment fill color.
   */
  fillColor = '#101010'

  /**
   * background color.
   */
  background = '#00ff00'

  frame(): void {
    this.update()
    this.draw()
  }

  private update() {
    this.comments = this.comments.filter((c) => {
      c.pos.add(this.commentWidth(c.text) * -this.speedRatio, 0)

      return c.pos.x > -this.commentWidth(c.text)
    })
  }

  private draw() {
    const { renderer, drawer } = this

    renderer.fill(this.background)

    this.comments.forEach((c) => {
      const { pos, text } = c

      drawer.strokeText(
        text,
        pos,
        this.commentStroke,
        this.strokeColor,
        void 0,
        {
          size: this.fontSize,
          font: this.font,
          weight: this.fontWeight,
        },
        void 0,
        'middle'
      )
      drawer.fillText(
        text,
        pos,
        this.fillColor,
        void 0,
        {
          size: this.fontSize,
          font: this.font,
          weight: this.fontWeight,
        },
        void 0,
        'middle'
      )
    })
  }

  commentWidth(text: string): number {
    const context = this.renderer['context'] as CanvasRenderingContext2D
    context.font = `${this.font} ${this.fontWeight}`
    return context.measureText(text).width
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
