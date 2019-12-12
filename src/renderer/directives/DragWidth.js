import Vue from 'vue'
Vue.directive('DragWidth', {
  bind(el, binding, vnode, oldVnode) {
    let basedisX
    let baseWidth
    let enableDragWidth = false
    console.log(vnode)
    /**
     * 仅在移动情况下判断鼠标样式
     */
    el.addEventListener('mousemove', mouseMoveBeforeDown)
    /**
     * 鼠标按下，判断是否进入拖拽
     */
    el.addEventListener('mousedown', (e) => {
      /**
       * 设置基准数值，只需在此处更新
       */
      basedisX = e.clientX
      baseWidth = el.offsetWidth
      if (enableDragWidth) {
        el.removeEventListener('mousemove', mouseMoveBeforeDown)
        document.addEventListener('mousemove', mouseMoveAfterDown)
      }
    })
    document.addEventListener('mouseup', (e) => {
      if (enableDragWidth) {
        console.log('1')
        document.removeEventListener('mousemove', mouseMoveAfterDown)
        el.addEventListener('mousemove', mouseMoveBeforeDown)
      }
    })
    function mouseMoveBeforeDown(e) {
      let cursor = el.offsetWidth + el.offsetLeft - e.clientX - 3
      /**
       * 在body页面上设置cursor样式，在div上设置有鼠标样式频繁切换bug
       */
      if (cursor <= 0) {
        document.body.style.cursor = 'col-resize'
        enableDragWidth = true
      } else {
        document.body.style.cursor = 'default'
        enableDragWidth = false
      }
    }
    function mouseMoveAfterDown(e) {
      e.preventDefault()
      let moveLength = e.clientX - basedisX
      let width = baseWidth + moveLength
      console.log(width)
      console.log(moveLength)
      console.log(baseWidth)
      el.style.width = `${width}px`
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
