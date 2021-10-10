export function configCardTouch(element, event) {
  const left = element.offsetLeft
  const top = element.offsetTop
  const width = element.clientWidth
  const w1 = width / 3 + left
  const w2 = width / 3 * 2 + left
  const height = element.clientHeight
  const h1 = height / 3 + top
  const h2 = height / 3 * 2 + top
  const eDx = height / width

  // const point = event.touches[0] // touchstart
  const point = event.changedTouches[0] // touchend
  if (point) {
    const _x = point.pageX
    const x = _x - left
    const _y = point.pageY
    const y = _y - top
    const xp = _x < w1 ? 'w1' : _x < w2 ? 'w2' : 'w3'
    const yp = _y < h1 ? 'h1' : _y < h2 ? 'h2' : 'h3'
    const vertical = eDx * x < y ? 'down' : 'up' // 4사분면 상의 x=-y 에 대한 위아래
    const horizontal = -eDx * x + height < y ? 'right' : 'left' // 1사분면 상의 x=y 에 대한 좌우 

    if (yp === 'h1' && vertical === 'up' && horizontal === 'left') { // 상
      this.$emit('touch:card', 'up')
    } else if (xp === 'w3' && vertical === 'up' && horizontal === 'right') { // 우
      this.$emit('touch:card', 'right')
    } else if (yp === 'h3' && vertical === 'down' && horizontal === 'right') { // 하
      this.$emit('touch:card', 'down')
    } else if (xp === 'w1' && vertical === 'down' && horizontal === 'left') { // 좌
      this.$emit('touch:card', 'left')
    } else if (xp === 'w2' && yp === 'h2') { // 중앙
      this.$emit('touch:card', 'center')
    }
  }
}
