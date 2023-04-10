type Func = (...args: any[]) => any

/** 防抖 */
export const debounce = (fn: Func, time: number) => {
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

/** 节流 */
export const throttle = (fn: Func, time: number) => {
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
