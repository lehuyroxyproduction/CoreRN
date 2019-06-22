type Action = {
  type?: String
}

type Func = {
  isStart: Action,
  isSuccess?: Action,
  isError?: Action
}

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const reducerFactory = ({ onStart, onSuccess, onError }: Func) => (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case onStart:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null
      }

    case onSuccess:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null
      }

    case onError:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: payload
      }

    default:
      return state
  }
}
