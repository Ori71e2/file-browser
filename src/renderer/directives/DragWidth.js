import Vue from 'vue'

Vue.directive('DragWidth', {
  bind(el, binding, vnode, oldVnode) {
    el.onmousedown = (e) => {
      const dragDom = el.parentElement
      // console.log('mousedown')
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - el.offsetLeft
      document.onmousemove = (e) => {
        e.preventDefault() // 移动时禁用默认事件
        console.log('disX' + disX)
        // 通过事件委托，计算移动的距离
        const moveLength = e.clientX - disX
        const maxLength = document.body.clientWidth - disX - 100
        const minLength = 100
        let length
        if (moveLength <= minLength) {
          length = minLength
        } else if (moveLength >= maxLength) {
          length = maxLength
        } else {
          length = moveLength
        }
        console.log('l' + length)
        console.log(dragDom.style)
        dragDom.style.width = `${length}px`
      }
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
