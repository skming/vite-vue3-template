// 声明变量
declare const __BUILD_TIME__: string

/* Generic Tools */
type ObjToKeyValUnion<T> = {
  [K in keyof T]: { key: K, value: T[K] }
}[keyof T]

type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]
