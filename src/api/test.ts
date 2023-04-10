import type { Itest } from '@/types/test'
import request from '@/utils/request'

/**
 * @param data
 * @returns Promise
 */
export const test = (data: Itest) => {
  return request.get('./test', data)
}
