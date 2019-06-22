import store from 'store'

import { actions } from 'reducers/app'

export const betterError = (title: String, error: String) => {
  const display = `${title} ${error}`

  // console.log(display)
  store.dispatch(actions.toast(display))
}

export const betterWarning = text => {
  const underDevText =
    'Chức năng đang được phát triển. \n Vui lòng quay lại sau'

  if (!text) {
    store.dispatch(actions.toast(underDevText))
  } else {
    store.dispatch(actions.toast(text))
  }
}
