/** 手机号 */
export const isMobile = (e: string) => {
  return /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/.test(e)
}

/** 中文 */
export const isChineseName = (e: string) => {
  return /^([\u4E00-\u9FA5·]{2,16})$/.test(e)
}

/** 邮箱 */
export const isEmail = (e: string) => {
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
}

/** 身份证号 */
export const isIDNumber = (e: string) => {
  return /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(e)
}

/** 银行卡号 */
export const isBankCardNumber = (e: string) => {
  return /^([1-9]{1})(\d{15}|\d{18})$/.test(e)
}
