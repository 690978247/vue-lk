import { fabric } from 'fabric'

// 扩展 fabric 曲线文字
function drawCurve(options, ctx) {
  const {
    curve,
    diameter,
    fontSize,
    fill,
    fontFamily,
    fontWeight,
    fontStyle,
    text,
    clipPath
  } = options

  const radius = diameter // 圆的半径
  const angleDecrement = curve / Math.max(text.length - 1, 1) // 每个字母占的弧度
  let angle = curve

  ctx.save()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let index = 0; index < text.length; index++) {
    const character = text.charAt(index)
    ctx.save()
    ctx.translate(
      Math.cos((Math.PI / 180) * angle) * radius,
      -Math.sin((Math.PI / 180) * angle) * radius
    )
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
    ctx.rotate(Math.PI / 2 - (Math.PI / 180) * angle)
    ctx.fillStyle = fill
    ctx.fillText(character, 0, 0)
    angle -= angleDecrement
    ctx.restore()
  }
  ctx.restore()
}

fabric.TextCurved = fabric.util.createClass(fabric.IText, {
  type: 'textCured',
  superType: 'drawing',
  initialize(text, options = {}) {
    this.callSuper('initialize', text, options)
  },

  // 将自定义属性添加到序列化对象中，方便canvas记录
  toObject() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      curve: this.curve,
      diameter: this.diameter,
      clipPath: this.clipPath
    })
  },

  _render(ctx) {
    if (this.curve > 0) {
      drawCurve({ ...this }, ctx)
      this.set({
        padding: this.diameter * 2 + this.fontSize
      })
    } else {
      this.set({ padding: 0 })
      this.callSuper('_render', ctx)
    }
    this.setCoords()
  }
})

fabric.TextCurved.fromObject = (options, callback) => {
  return callback(new fabric.TextCurved(options.text, options))
}

export default fabric
