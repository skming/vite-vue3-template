/* Object to key-value union */
type ObjToKeyValUnion<T> = {
  [K in keyof T]: { key: K, value: T[K] }
}[keyof T]

/* Object to key-value array */
type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]
