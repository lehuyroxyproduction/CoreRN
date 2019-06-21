export const createLoadingSelector = actions => (state) => {
  // returns true only when all actions is not loading
  return actions.some(action => state.loading[action]);
};

export const createErrorSelector = actions => (state, actionName = undefined) => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error

  const errors = actions.map(action => state.error[action]);

  // ===== Error Base ActionName ========
  if (errors && actionName) {
    return errors[actionName];
  }

  // ====== Add All Error Message =======
  let errorMessage = '';
  errors.forEach((error) => { errorMessage += error ? `${error} ` : ''; });
  if (errorMessage) {
    return errorMessage;
  }

  if (errors && errors[0]) {
    return errors[0];
  }

  return '';
};
