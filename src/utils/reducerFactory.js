export const reducerFactory = ({ onStart, onSuccess, onError, onCancel }) => (
  state,
  action
) => {
  switch (action.type) {
    case onStart:
      return { ...state, isLoading: true, status: '' }
    case onSuccess:
      return { ...state, isLoading: false, status: 'success' }
    case onError:
      return { ...state, isLoading: false, status: 'error' }
    case onCancel:
      return { ...state, isLoading: false, status: '' }
    default:
      return { ...state }
  }
}
