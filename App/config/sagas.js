import { takeEvery, call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  CHANGE_BASE_CURRENCY,
  GET_INITIAL_CONVERSION,
  SWAP_CURRENCY,
  CONVERSION_RESULT,
  CONVERSION_ERROR,
} from '../actions/currencies';

export const getLatestRate = currency =>
  fetch(`https://fixer.handlebarlabs.com/latest?base=${currency}`);

const fetchLatestConversionRates = function* ({ currency }) {
  const { connected, hasCheckedStatus } = yield select(state => state.network);

  // Prevent any cached network error from displaying
  yield put({
    type: CONVERSION_ERROR,
    error: null,
  });

  if (!connected && hasCheckedStatus) {
    return yield put({
      type: CONVERSION_ERROR,
      error: 'Not connected to the internet.  Conversion rate may be outdate or unavailable.',
    });
  }

  try {
    let usedCurrency = currency;
    if (usedCurrency === undefined) {
      usedCurrency = yield select(state => state.currencies.baseCurrency);
    }
    const response = yield call(getLatestRate, usedCurrency);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (error) {
    yield put({ type: CONVERSION_ERROR, error: error.message });
  }
};

// If there was a network error, it gets persisted to localstorage
// When the app reloads, the error is still there and gets displayed
// Since the error is part of the conversions state, we can't blacklist it
// To overcome this, we let the error display initially for 4 seconds
// Then, we clear it out so it is persisted as null
const clearConversionError = function* () {
  const DELAY_SECONDS = 4;
  const error = yield select(state => state.currencies.error);
  if (error) {
    yield delay(DELAY_SECONDS * 1000);
    yield put({ type: CONVERSION_ERROR, error: null });
  }
};

const rootSaga = function* () {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(CONVERSION_ERROR, clearConversionError);
};

export default rootSaga;
