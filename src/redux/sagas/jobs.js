import {call, put, select, takeLatest} from 'redux-saga/effects'

import moment from 'moment'
import {actions, selectors, types} from 'redux/reducers/jobs'

import {fetch} from 'utils/api'
import {jobsSelectors, userSelectors} from 'redux/reducers/index

moment.locale('vi')

// Utils

// Parse jobs data
const parseJobs = jobs => {
  return jobs.map(job => {
    const {
      job_id,
      job_name,
      publish_date = 0,
      start_date,
      end_date,
      employee_name,
      employee_avatar,
      place,
      // for job details
      salary = 0,
      pay_method = null,
      job_description = null,
      contact_phone_number = null,
      // for user job details
      status = '',
      time_in = 0,
      time_out = 0,
      total_worker = 0,
      current_worker = 0,
      total_apply = 0,
      rating,
      category_id,
      is_require_contract
    } = job

    let time = {}
    // let date = {}
    let workerCount = {}

    // if (publish_date !== 0) {
    //   date = {
    //     start: moment.unix(start_date).format('DD/MM/YYYY'),
    //     end: moment.unix(end_date).format('DD/MM/YYYY'),
    //     publish: moment.unix(publish_date).format('DD/MM/YYYY')
    //   }
    // }

    if (time_in !== 0) {
      time = {
        in: moment.unix(time_in).format('HH:mm'),
        out: moment.unix(time_out).format('HH:mm'),
        date: moment.unix(time_in).format('DD/MM/YYYY')
      }
    }

    if (total_worker !== 0) {
      workerCount = {
        current: current_worker,
        total: total_worker
      }
    }

    return {
      id: job_id,
      name: job_name,
      phoneNumber: contact_phone_number,
      payMethod: pay_method,
      description: job_description,
      supplier: {
        name: employee_name,
        avatar: employee_avatar
      },
      totalApply: total_apply,
      place,
      salary,
      rating,
      status,
      date: {
        start: moment.unix(start_date).format('DD/MM/YYYY'),
        end: moment.unix(end_date).format('DD/MM/YYYY'),
        publish: moment.unix(publish_date).format('DD/MM/YYYY')
      },
      time,
      workerCount,
      categoryId: category_id,
      isContractRequired: is_require_contract
    }
  })
}

// Parse user jobs data
const parseUserJobs = jobs => {
  return jobs.map(job => {
    const {
      job_id,
      job_name,
      work_id,
      employee_id,
      employee_name,
      employee_avatar,
      time_in,
      time_out,
      place,
      salary,
      status
    } = job

    return {
      id: job_id,
      workId: work_id,
      name: job_name,
      supplier: {
        id: employee_id,
        name: employee_name,
        avatar: employee_avatar
      },
      time: {
        in: moment.unix(time_in).format('HH:mm'),
        out: moment.unix(time_out).format('HH:mm')
      },
      date: {
        start: moment.unix(time_in).format('DD/MM/YYYY'),
        end: moment.unix(time_out).format('DD/MM/YYYY')
      },
      place,
      salary,
      status
    }
  })
}

// Parse workshifts data
const parseWorkshifts = shifts => {
  let workshifts = []

  return shifts.map(shift => {
    if (shift.workshifts) {
      workshifts = shift.workshifts.map(workshift => {
        const {
          workshift_id,
          time_in,
          time_out,
          total_worker_count,
          current_worker_count,
          salary,
          freelancer_status
        } = workshift

        return {
          id: workshift_id,
          salary,
          time: {
            in: moment.unix(time_in).format('HH:mm'),
            out: moment.unix(time_out).format('HH:mm')
          },
          workerCount: {
            current: current_worker_count,
            total: total_worker_count
          },
          date: moment.unix(shift.date).format('DD/MM/YYYY'),
          freelancerStatus: freelancer_status
        }
      })
    }

    return {
      date: moment.unix(shift.date).format('DD/MM/YYYY'),
      workshifts
    }
  })
}

// Jobs

// Get jobs
const getJobs = function* ({payload: isRefreshing}) {
  const total = yield select(selectors.getTotal)
  const currentTotal = yield select(selectors.getCurrentTotal)

  if (isRefreshing || !total || currentTotal < total) {
    const page = isRefreshing ? 0 : yield select(selectors.getPage)
    let selectedContractTypes = yield select(userSelectors.getSelectedContractTypes)
    let selectedPaymentMethods = yield select(userSelectors.getSelectedPaymentMethods)
    let selectedCategories = yield select(userSelectors.getSelectedCategories)
    console.log('--------------------SAGA-----', selectedCategories, selectedPaymentMethods, selectedContractTypes)
    const res = yield call(fetch, 'getJobs', { page: page + 1, selectedContractTypes, selectedPaymentMethods, selectedCategories})
    if (res && res.status_code === 1000) {
      yield put(
        actions.getJobsSuccess({
          jobs: parseJobs(res.data.jobs || []),
          page: res.data.page,
          total: res.data.total,
          isRefreshing
        })
      )
    } else {
      yield put(actions.getJobsFail())
    }
  } else {
    yield put(actions.getJobsCanceled())
  }
}

// Get user jobs
const getUserJobs = function* ({payload: isRefreshing}) {
  const total = yield select(selectors.getUserJobsTotal)
  const currentTotal = yield select(selectors.getCurrentUserJobsTotal)

  if (isRefreshing || !total || currentTotal < total) {
    const page = isRefreshing ? 0 : yield select(selectors.getUserJobsPage)

    const res = yield call(fetch, 'getUserJobs', page + 1)

    if (res && res.status_code === 1000) {
      yield put(
        actions.getUserJobsSuccess({
          jobs: parseUserJobs(res.data.works || []),
          page: res.data.page,
          total: res.data.total,
          isRefreshing
        })
      )
    } else {
      yield put(actions.getUserJobsFail())
    }
  } else {
    yield put(actions.getUserJobsCanceled())
  }
}

// Get job details
const getJobDetailsToCheck = function* ({payload: {jobId, onSuccess}}) {
  const res = yield call(fetch, 'getJobDetails', jobId)

  if (res && res.status_code === 1000) {
    const {workshifts, ...otherDetails} = res.data

    const jobDetails = parseJobs([otherDetails])[0]
    const jobWorkShifts = parseWorkshifts(workshifts)

    yield put(
      actions.getJobDetailsSuccess({
        ...jobDetails,
        workshifts: jobWorkShifts
      })
    )
    if (onSuccess) {
      onSuccess()
    }
  } else {
    yield put(actions.getJobDetailsFail())
  }
}

// Get job details
const getJobDetails = function* ({payload: {jobId, onSuccess}}) {
  const res = yield call(fetch, 'getJobDetails', jobId)

  if (res && res.status_code === 1000) {
    const {workshifts, ...otherDetails} = res.data

    const jobDetails = parseJobs([otherDetails])[0]
    const jobWorkShifts = parseWorkshifts(workshifts)

    yield put(
      actions.getJobDetailsSuccess({
        ...jobDetails,
        workshifts: jobWorkShifts
      })
    )
    if (onSuccess) {
      return onSuccess()
    }
  } else {
    yield put(actions.getJobDetailsFail())
  }
}

// Get user job details
const getUserJobDetails = function* ({payload: {workId, meta}}: { payload: { workId: String, meta: { onSuccess: Function } } }) {
  const res = yield call(fetch, 'getUserJobDetails', workId)

  if (res && res.status_code === 1000) {
    yield put(actions.getUserJobDetailsSuccess(parseJobs([res.data])[0]))
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    yield put(actions.getUserJobDetailsFail())
  }
}

// Works
const applyWorks = function* ({payload}) {
  console.log('4234346534634634636----------applyWorks', payload)
  const {note, jobId, selectedWorkshifts} = payload

  const workshifts = selectedWorkshifts.map(workshift => workshift)
  console.log('-----------applyWorks workshifts', workshifts)
  const res = yield call(fetch, 'applyWorks', {
    job_id: jobId,
    note,
    workshifts
  })

  if (res) {
    if (res.status_code === 1000) {
      const issues = []

      if (res.status_code !== 1000 && res.data.length) {
        issues = res.data.map(({message, data}) => {
          return {
            message,
            time: {
              in: moment.unix(data.time_in).format('HH:mm'),
              out: moment.unix(data.time_out).format('HH:mm')
            },
            date: moment.unix(data.time_in).format('DD/MM/YYYY')
          }
        })
      }

      yield put(actions.applyWorksSuccess(issues))

      yield call(getJobDetails, {payload: {jobId}})
      yield call(getUserJobs, {payload: (isRefreshing = true)})
    } else {
      yield put(actions.applyWorksFail(res))
      yield call(getJobDetails, {payload: {jobId}})
      yield call(getUserJobs, {payload: (isRefreshing = true)})
    }
  }
}

const cancelWork = function* ({payload: workId}) {
  const res = yield call(fetch, 'cancelWork', workId)
  if (res) {
    if (res.status_code === 1000) {
      const issues = []
      if (res.status_code !== 1000 && res.data.length) {
        issues = res.data.map(({message, data}) => {
          return {
            message,
            time: {
              in: moment.unix(data.time_in).format('HH:mm'),
              out: moment.unix(data.time_out).format('HH:mm')
            },
            date: moment.unix(data.time_in).format('DD/MM/YYYY')
          }
        })
      }
      yield put(actions.cancelWorkSuccess(issues))
      yield call(getUserJobs, {payload: (isRefreshing = true)})
    } else {
      yield put(actions.cancelWorkFail(res.message))
    }
  }
}
const getCategories = function* ({payload: onSuccess}) {
  try {
    const res = yield call(fetch, 'getCategories')
    if (res && res.status_code === 1000) {
      yield put(actions.getCategoriesSuccess(res.data.categories))
      onSuccess && onSuccess()
    } else {
      yield put(actions.getCategorieError())
    }
  } catch (e) {
    yield put(actions.getCategorieError(e))
  }
}

const watcher = function* () {
  // Jobs
  yield takeLatest(types.GET_JOBS, getJobs)
  yield takeLatest(types.GET_USER_JOBS, getUserJobs)
  yield takeLatest(types.GET_JOB_DETAILS, getJobDetails)
  yield takeLatest(types.GET_JOB_DETAILS_TO_CHECK, getJobDetailsToCheck)
  yield takeLatest(types.GET_USER_JOB_DETAILS, getUserJobDetails)
  // Works
  yield takeLatest(types.APPLY_WORKS, applyWorks)
  yield takeLatest(types.CANCEL_WORK, cancelWork)
  // Categories
  yield takeLatest(types.GET_CATEGORIES, getCategories)
}

export default watcher()
