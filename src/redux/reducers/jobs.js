import { createAction, handleActions } from 'redux-actions'

export const types = {
  // Jobs
  GET_JOBS: 'GET_JOBS',
  GET_JOBS_SUCCESS: 'GET_JOBS_SUCCESS',
  GET_JOBS_FAIL: 'GET_JOBS_FAIL',
  GET_JOBS_CANCELED: 'GET_JOBS_CANCELED',
  // User's jobs
  GET_USER_JOBS: 'GET_USER_JOBS',
  GET_USER_JOBS_SUCCESS: 'GET_USER_JOBS_SUCCESS',
  GET_USER_JOBS_FAIL: 'GET_USER_JOBS_FAIL',
  GET_USER_JOBS_CANCELED: 'GET_USER_JOBS_CANCELED',
  // Job details
  GET_JOB_DETAILS: 'GET_JOB_DETAILS',
  GET_JOB_DETAILS_TO_CHECK: 'GET_JOB_DETAILS_TO_CHECK',
  GET_JOB_DETAILS_SUCCESS: 'GET_JOB_DETAILS_SUCCESS',
  GET_JOB_DETAILS_FAIL: 'GET_JOB_DETAILS_FAIL',
  // User job details
  GET_USER_JOB_DETAILS: 'GET_USER_JOB_DETAILS',
  GET_USER_JOB_DETAILS_SUCCESS: 'GET_USER_JOB_DETAILS_SUCCESS',
  GET_USER_JOB_DETAILS_FAIL: 'GET_USER_JOB_DETAILS_FAIL',
  // Apply work
  APPLY_WORKS: 'APPLY_WORKS',
  APPLY_WORKS_SUCCESS: 'APPLY_WORKS_SUCCESS',
  APPLY_WORKS_FAIL: 'APPLY_WORKS_FAIL',
  APPLY_WORKS_CANCELED: 'APPLY_WORKS_CANCELED',
  // Cancel work
  CANCEL_WORK: 'CANCEL_WORK',
  CANCEL_WORK_SUCCESS: 'CANCEL_WORK_SUCCESS',
  CANCEL_WORK_FAIL: 'CANCEL_WORK_FAIL',
  CANCEL_WORK_CANCELED: 'CANCEL_WORK_CANCELED',

  // Get categories
  GET_CATEGORIES: 'GET_CATEGORIES',
  GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_ERROR: 'GET_CATEGORIES_ERROR',

  //

  SELECT_CONTRACT_TYPES: 'SELECT_CONTRACT_TYPES',
  SELECT_PAYMENT_METHODS: 'SELECT_PAYMENT_METHODS',
  SELECT_CATEGORIES: 'SELECT_CATEGORIES'
}

export const actions = {
  // Jobs
  getJobs: createAction(types.GET_JOBS),
  getJobDetailsToCheck: createAction((types.GET_JOB_DETAILS_TO_CHECK)),
  getJobsSuccess: createAction(types.GET_JOBS_SUCCESS),
  getJobsFail: createAction(types.GET_JOBS_FAIL),
  getJobsCanceled: createAction(types.GET_JOBS_CANCELED),
  // User's jobs
  getUserJobs: createAction(types.GET_USER_JOBS),
  getUserJobsSuccess: createAction(types.GET_USER_JOBS_SUCCESS),
  getUserJobsFail: createAction(types.GET_USER_JOBS_FAIL),
  getUserJobsCanceled: createAction(types.GET_USER_JOBS_CANCELED),
  // Job details
  getJobDetails: createAction(types.GET_JOB_DETAILS),
  getJobDetailsSuccess: createAction(types.GET_JOB_DETAILS_SUCCESS),
  getJobDetailsFail: createAction(types.GET_JOB_DETAILS_FAIL),
  // User job details
  getUserJobDetails: createAction(types.GET_USER_JOB_DETAILS),
  getUserJobDetailsSuccess: createAction(types.GET_USER_JOB_DETAILS_SUCCESS),
  getUserJobDetailsFail: createAction(types.GET_USER_JOB_DETAILS_FAIL),
  // Apply work
  applyWorks: createAction(types.APPLY_WORKS),
  applyWorksSuccess: createAction(types.APPLY_WORKS_SUCCESS),
  applyWorksFail: createAction(types.APPLY_WORKS_FAIL),
  applyWorksCanceled: createAction(types.APPLY_WORKS_CANCELED),
  // Cancel work
  cancelWork: createAction(types.CANCEL_WORK),
  cancelWorkSuccess: createAction(types.CANCEL_WORK_SUCCESS),
  cancelWorkFail: createAction(types.CANCEL_WORK_FAIL),
  cancelWorkCanceled: createAction(types.CANCEL_WORK_CANCELED),
  // Categories
  getCategories: createAction(types.GET_CATEGORIES),
  getCategoriesSuccess: createAction(types.GET_CATEGORIES_SUCCESS),
  getCategorieError: createAction(types.GET_CATEGORIES_ERROR),
  //
  selectContractTypes: createAction(types.SELECT_CONTRACT_TYPES),
  selectPaymentMethods: createAction(types.SELECT_PAYMENT_METHODS),
  selectCategories: createAction(types.SELECT_CATEGORIES)
}

export const selectors = {
  // Jobs
  getJobs: state => state.jobs.list,
  getPage: state => state.jobs.page,
  getTotal: state => state.jobs.total,
  getCurrentTotal: state => state.jobs.list.length,
  // User's jobs
  getUserJobs: state => state.jobs.userJobsList,
  getUserJobsPage: state => state.jobs.userJobsPage,
  getUserJobsTotal: state => state.jobs.userJobsTotal,
  getCurrentUserJobsTotal: state => state.jobs.userJobsList.length,
  // Job's details
  getJobDetails: state => state.jobs.details,
  // User's job details
  getUserJobDetails: state => state.jobs.userJobDetails,
  // Apply works issues list
  getApplyWorksIssues: state => state.jobs.applyWorksIssues,
  getApplyWorksMessage: state => state.jobs.applyWorksMessage,

  // Cancel work
  getCancelWorksIssues: state => state.jobs.cancelWorkIssues,
  getCancelWorkMessage: state => state.jobs.cancelWorkMessage,
  //
  getContractTypes: state => state.jobs.contractTypes,
  getPaymentMethods: state => state.jobs.paymentMethods,
  getJobTypes: state => state.jobs.jobTypes,
  // get Categories
  getCategories: state => state.jobs.categories,
  // Ui
  getStatus: (state, action) => state.ui.jobs[action].status,
  getLoading: (state, action) => state.ui.jobs[action].isLoading,
  //
  getSelectedCategories: state => state.jobs.selectedCategories,
  getSelectedPaymentMethods: state => state.jobs.selectedPaymentMethods,
  getSelectedContractTypes: state => state.jobs.selectedContractTypes
}

const defaultState = {
  selectedContractTypes: null,
  selectedPaymentMethods: null,
  selectedCategories: null,
  // Categories
  categories: [],
  // Jobs
  list: [],
  page: 0,
  total: null,
  // User's jobs
  userJobsList: [],
  userJobsPage: 0,
  userJobsTotal: null,
  // Apply work issues list
  applyWorksIssues: [],
  applyWorksMessage: '',
  cancelWorkIssues: [],
  cancelWorkMessage: '',
  contractTypes: [{id: '1', description: 'Không hợp đồng', value: false}, {id: '2', description: 'Có hợp đồng', value: true}],
  paymentMethods: [{id: '1', description: 'Tiền mặt'}, {id: '2', description: 'Chuyển khoản'}]
}

export default handleActions(
  {
    [types.GET_JOBS_SUCCESS]: (state, action) => {
      const { jobs, page, total, isRefreshing } = action.payload

      return {
        ...state,
        list: isRefreshing ? jobs : [...state.list, ...jobs],
        page,
        total
      }
    },
    [types.GET_USER_JOBS_SUCCESS]: (state, action) => {
      const { jobs, page, total, isRefreshing } = action.payload

      return {
        ...state,
        userJobsList: isRefreshing ? jobs : [...state.userJobsList, ...jobs],
        userJobsPage: page,
        userJobsTotal: total
      }
    },
    [types.GET_JOB_DETAILS_SUCCESS]: (state, action) => {
      return { ...state, details: action.payload }
    },
    [types.GET_USER_JOB_DETAILS_SUCCESS]: (state, action) => {
      return { ...state, userJobDetails: action.payload }
    },
    [types.APPLY_WORKS_SUCCESS]: (state, action) => {
      return { ...state, applyWorksIssues: action.payload }
    },
    [types.APPLY_WORKS_FAIL]: (state, action) => {
      return { ...state, applyWorksMessage: action.payload }
    },
    [types.CANCEL_WORK_SUCCESS]: (state, action) =>{
      return { ...state, cancelWorkIssues: action.payload }
    },
    [types.CANCEL_WORK_FAIL]: (state, action) =>{
      return { ...state, cancelWorkMessage: action.payload }
    },
    [types.GET_CATEGORIES_SUCCESS]: (state, action) =>{
      return {...state, categories: action.payload}
    },
    [types.SELECT_CATEGORIES]: (state, {payload}) =>{
      return {...state, selectedCategories: payload}
    },
    [types.SELECT_CONTRACT_TYPES]: (state, {payload})=>{
      return {...state, selectedContractTypes: payload}
    },
    [types.SELECT_PAYMENT_METHODS]: (state, {payload}) => {
      return {...state, selectedPaymentMethods: payload}
    }

  },
  defaultState
)
