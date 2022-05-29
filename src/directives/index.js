// 管理自定义指令
export const imgerror = {

  // 指令对象  会在当前的dom元素插入到节点之后执行
  inserted (el, options) {
    // el：指令所绑定的元素，可以用来直接操作 DOM。
    // options  options.value指令的绑定值
    // console.log(123)
    // el 图片
    // 有值就赋值 没有值就使用默认值
    el.src=el.src||options.value   
    // 当图片有地址，但是地址没有加载成功的时候，会报错
    // 就会触发图片的一个事件 ===onerror
    el.onerror = function () {
      // 图片异常的时候，会将指令配置的默认图片设置为图片的内容
      el.src=options.value
    }
  },
  componentUpdated (el, options) {
    // 该钩子会在当前指令作用的组件， 更新数据完毕之后执行
    el.src=el.src||options.value
  }
}

export const focus = {
  inserted (el) {
    el.focus()
  }
}

