/**
 * @description 手机号
 */
export function isMobile(e: string) {
  return /^1[3-9]\d{9}$/.test(e)
}

/**
 * @description 中文
 */
export function isChineseName(e: string) {
  return /^[\u4E00-\u9FA5·]{2,16}$/.test(e)
}

/**
 * @description 邮箱
 */
export function isEmail(e: string) {
  return /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(e)
}

/**
 * @description 身份证号 15位或18位
 */
export function isIDNumber(e: string) {
  return /^(?:\d{15}|\d{17}[0-9X])$/.test(e)
}

/**
 * @description 银行卡号 16-19位
 */
export function isBankCardNumber(e: string) {
  return /^(?:\d{16}|\d{17}|\d{18})$/.test(e)
}
