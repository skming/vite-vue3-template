type Func = (...args: any[]) => any

/**
 * @description 防抖
 * @param fn 回调函数
 * @param time 时间
 */
export function debounce(fn: Func, time: number) {
  let timer: null | ReturnType<typeof setTimeout> = null
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn(...args)
      clearTimeout(timer as ReturnType<typeof setTimeout>)
      timer = null
    }, time)
  }
}

/**
 * @description 节流
 * @param fn 回调函数
 * @param time 时间
 */
export function throttle(fn: Func, time: number) {
  let flag = true
  let timer: null | ReturnType<typeof setTimeout> = null
  return (...args: any) => {
    if (!flag)
      return
    flag = false
    timer = setTimeout(() => {
      fn(...args)
      flag = true
      clearTimeout(timer as ReturnType<typeof setTimeout>)
      timer = null
    }, time)
  }
}
