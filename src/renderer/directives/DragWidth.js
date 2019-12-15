import Vue from 'vue'
Vue.directive('DragWidth', {
  bind(el, binding, vnode, oldVnode) {
    let basedisX
    let baseWidth
    let enableDragWidth = false
    let detectionRange = -2
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
     * 在div内移动，判断是否处于div边界处，处于边界时改变鼠标样式
     * 该处逻辑独立，在鼠标按下时移除，在鼠标起来时重新注册
     */
    function divMouseMove(e) {
      let cursor = el.offsetWidth + el.offsetLeft - e.clientX + detectionRange
      /**
       * 在body页面上设置cursor样式，在div上设置有鼠标样式频繁切换bug
       */
      if (cursor <= 0 && cursor > detectionRange) {
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
     * div 鼠标按下
     */
    function divMouseDown(e) {
      /**
       * 设置基准数值，只需在此处更新
       */
      basedisX = e.clientX
      baseWidth = el.offsetWidth
      if (enableDragWidth) {
        /**
         * 移除div mousemove，添加document mousemove
         */
        el.removeEventListener('mousemove', divMouseMove)
        document.addEventListener('mousemove', documentMouseMove)
        // document.body.style.zIndex = 99999
        // document.body.style.cursor = 'col-resize'
      }
      /**
       * 添加document mouseup，仅执行一次
       */
      document.addEventListener('mouseup', documentMouseUp)
    }
    /**
     * 修改div宽，修改鼠标样式
     */
    function documentMouseMove(e) {
      e.preventDefault()
      let moveLength = e.clientX - basedisX
      let width = baseWidth + moveLength
      // console.log(width)
      // console.log(moveLength)
      // console.log(baseWidth)
      el.style.width = `${width}px`
      // console.log(el.parentElement)
      /**
       * 父元素及其子元素鼠标事件被屏蔽
       */
      el.parentElement.style.pointerEvents = 'none'
      document.body.style.cursor = 'col-resize'
    }
    /**
     * 仅运行一次
     */
    function documentMouseUp(e) {
      if (enableDragWidth) {
        el.parentElement.style.pointerEvents = 'auto'
        console.log('1')
        /**
         * 移除document mousemove，添加div mousemove
         */
        document.removeEventListener('mousemove', documentMouseMove)
        el.addEventListener('mousemove', divMouseMove)
        divMouseMove(e)
      }
      document.body.style.cursor = 'default'
      /**
       * 移除document mouseup，确保只执行一次
       */
      document.removeEventListener('mouseup', documentMouseUp)
    }
  }
})
