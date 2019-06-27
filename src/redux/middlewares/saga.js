import { all } from 'redux-saga/effects'

import { sagaFetchList } from './sagaListUser';


export default function* sagas() {
    yield all([
        sagaFetchList()
    ]);
  }