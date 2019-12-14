import Vue from 'vue'
Vue.directive('DragWidth', {
  bind(el, binding, vnode, oldVnode) {
    let basedisX
    let baseWidth
    let enableDragWidth = false
    let flag = false
    console.log(vnode)
    /**
     * 仅在移动情况下判断鼠标样式
     */
    el.addEventListener('mousemove', divMouseMove)
    /**
     * 鼠标按下，判断是否进入拖拽
     */
    el.addEventListener('mousedown', divMouseDown)
    /**
     * div 鼠标按下
     */
    function divMouseDown(e) {
      /**
       * 设置基准数值，只需在此处更新
       */
      basedisX = e.clientX
      baseWidth = el.offsetWidth
      if (enableDragWidth) {
        el.removeEventListener('mousemove', divMouseMove)
        document.addEventListener('mousemove', documentMouseMove)
        flag = true
      }
      document.addEventListener('mouseup', documentMouseUp)
    }
    /**
     * 在div内移动，判断是否处于div边界处，处于边界时改变鼠标样式
     * 该处逻辑独立，不受鼠标按下或起影响
     */
    function divMouseMove(e) {
      let cursor = el.offsetWidth + el.offsetLeft - e.clientX - 3
      /**
       * 在body页面上设置cursor样式，在div上设置有鼠标样式频繁切换bug
       */
      if (cursor <= 0 && cursor > -3) {
        el.style.cursor = 'col-resize'
        // el.style.cursor = 'col-resize'
        enableDragWidth = true
      } else {
        el.style.cursor = 'default'
        // el.style.cursor = 'default'
        enableDragWidth = false
      }
    }
    /**
     * 只负责修改div宽
     */
    function documentMouseMove(e) {
      e.preventDefault()
      let moveLength = e.clientX - basedisX
      let width = baseWidth + moveLength
      console.log(width)
      console.log(moveLength)
      console.log(baseWidth)
      el.style.width = `${width}px`
      document.body.style.cursor = 'col-resize'
    }
    function documentMouseUp(e) {
      if (enableDragWidth && flag) {
        console.log('1')
        document.removeEventListener('mousemove', documentMouseMove)
        el.addEventListener('mousemove', divMouseMove)
        flag = false
        divMouseMove(e)
      }
      document.body.style.cursor = 'default'
      document.removeEventListener('mouseup', documentMouseUp)
    }
  }
})

// Vue.directive('DragWidth', {
//   bind(el, binding, vnode, oldVnode) {
//     el.onmousedown = (e) => {
//       const dragDom = el.parentElement
//       // console.log('mousedown')
//       // 鼠标按下，计算当前元素距离可视区的距离
//       const disX = e.clientX - el.offsetLeft
//       document.onmousemove = (e) => {
//         e.preventDefault() // 移动时禁用默认事件
//         console.log('disX' + disX)
//         // 通过事件委托，计算移动的距离
//         const moveLength = e.clientX - disX
//         const maxLength = document.body.clientWidth - disX - 100
//         const minLength = 100
//         let length
//         if (moveLength <= minLength) {
//           length = minLength
//         } else if (moveLength >= maxLength) {
//           length = maxLength
//         } else {
//           length = moveLength
//         }
//         console.log('l' + length)
//         console.log(dragDom.style)
//         dragDom.style.width = `${length}px`
//       }
//       document.onmouseup = function (e) {
//         document.onmousemove = null
//         document.onmouseup = null
//       }
//     }
//   }
// })
