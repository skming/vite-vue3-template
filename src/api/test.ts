import type { Itest } from '@/api/type'
import request from '@/utils/request'

/**
 * @param params
 * @returns Promise
 */
export function test(params: Itest) {
  return request.get('./test', params)
}
