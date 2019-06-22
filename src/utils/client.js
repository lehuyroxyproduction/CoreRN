import { api } from 'services/api'
import { STATUS_CODE } from 'constant'

const fetch = async (method: String, path: String, data: Object | String) => {
  return api[method](path, data).then(res => {
    if (res.ok && res.data.status_code === STATUS_CODE.SUCCESS) {
      return {
        ok: true,
        data: res.data
      }
    }

    return {
      ok: false,
      error: res.problem
    }
  })
}

export default { fetch }
