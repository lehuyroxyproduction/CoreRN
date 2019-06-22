import R from 'ramda'

export const isEmpty = (params: {} | Array<T>): {} | Array<T> | null => {
  if (!R.isEmpty(params)) {
    return params
  }

  return null
}
