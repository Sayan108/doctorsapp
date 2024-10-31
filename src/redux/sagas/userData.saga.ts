import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {
  appointmentListFailure,
  appointmentListRequested,
  appointmentListSuccess,
  dashboardDataFailure,
  dashboardDataRequested,
  dashboardDataSuccess,
  dateTimeSlotFailure,
  dateTimeSlotRequested,
  dateTimeSlotSuccess,
  getAppointmentDetailsFailure,
  getAppointmentDetailsRequested,
  getAppointmentDetailsSuccess,
  IDashboardData,
  removeFromAppoinmentListFailed,
  removeFromAppoinmentListRequested,
  removeFromAppoinmentListSuccess,
  updateAppointmentFailed,
  updateAppointmentRequested,
  updateAppointmentSuccess,
  // upcomingAppointmentFailure,
  // upcomingAppointmentRequested,
} from '../silces/userdata.slice';

import {
  addAppointment,
  getAppointmentDetails,
  getAppointmentList,
  getDashBoardData,
  updateAppointment,
} from '../../services/appointments/appoinment.services';
// import { addAppoinemt } from "../../services/appointments/api.services";
import {
  IAppointment,
  IUpdateAppointment,
} from '../constants/appointment.constant';
import {AxiosResponse} from 'axios';
import {
  formatDateString,
  getCountByStatus,
  serializeError,
  StatusName,
} from '../../util/funtions.util';
import {availableSlots} from '../../services/clinic/clinic.service';
import {IDashboardOverViewData} from '../constants/userdata.constants';
import {AppointmentStatus} from '../../config/enum';

// function* fetchUpcomingAppointment(
//   action: ActionType<typeof upcomingAppointmentRequested>,
// ) {
//   try {
//     // yield put(upcomingAppointmentSuccess(appointments[5]));
//   } catch (error) {
//     yield put(upcomingAppointmentFailure(error));
//   }
// }

function* fetchAppointmentList(
  action: ActionType<typeof appointmentListRequested>,
): Generator<any, void, any> {
  try {
    const payload = action.payload;
    const res = yield call(getAppointmentList, payload);
    yield put(appointmentListSuccess(res?.data?.data));
  } catch (error: any) {
    yield put(appointmentListFailure(error.message));
  }
}

function* fetchAppointmentDetails(
  action: ActionType<typeof getAppointmentDetailsRequested>,
): Generator<any, void, any> {
  try {
    const payload = {
      appointmentId: action.payload,
    };
    // const res: any = yield call(addAppointment, payload);
    const res: any = yield call(getAppointmentDetails, payload);
    yield put(getAppointmentDetailsSuccess(res.data.data));
  } catch (error) {
    yield put(getAppointmentDetailsFailure(error));
  }
}

function* updateSelectedAppointment(
  action: ActionType<typeof updateAppointmentRequested>,
) {
  try {
    const params = action.payload;
    const res: AxiosResponse = yield call(updateAppointment, params);
    yield put(updateAppointmentSuccess(action.payload));

    return;
  } catch (err) {
    err = serializeError(err);
    yield put(updateAppointmentFailed(err));
  }
}

function* cancelSelectedAppointment(
  action: ActionType<typeof removeFromAppoinmentListRequested>,
) {
  try {
    const params: IUpdateAppointment = {
      isDeleted: true,
      appointmentId: action.payload,
      status: AppointmentStatus.Cancelled,
    };
    const res: AxiosResponse = yield call(updateAppointment, params);
    console.log(action.payload);
    const data = res;
    console.log(data, 'getting api response');
    if (data) {
      yield put(removeFromAppoinmentListSuccess(action.payload));
    }

    return;
  } catch (err: any) {
    err = serializeError(err);
    removeFromAppoinmentListFailed(err);
  }
}

// export function* watchFetchUpcomingAppointment() {
//   yield takeEvery(upcomingAppointmentRequested.type, fetchUpcomingAppointment);
// }
function* fetchDateTimeSlot(action: ActionType<typeof dateTimeSlotRequested>) {
  try {
    const res: AxiosResponse = yield call(availableSlots, action.payload);

    const data = res?.data?.data?.map((item: any) => ({
      value: formatDateString(item?.date),
      originalvalue: item?.date,
      id: item?.dayId,
      hourAndSlot: item?.hourAndSlot?.map((slotItem: any) => ({
        value: slotItem?.hour,
        id: slotItem?.hourId,
      })),
    }));

    yield put(dateTimeSlotSuccess(data));

    return;
  } catch (err: any) {
    err = serializeError(err);
    yield put(dateTimeSlotFailure(err));
  }
}

function* fetchDashboardData(
  action: ActionType<typeof dashboardDataRequested>,
) {
  try {
    const res: AxiosResponse = yield call(
      getDashBoardData,
      action.payload.doctorid,
      action.payload.accessToken,
    );
    const data = res?.data?.data;

    const dashboardData: IDashboardOverViewData = {
      totalAppointments: data?.totalAppointmentCount,
      todaysAppointments: data?.todaysAppointments,
      upcomingAppointments: getCountByStatus(
        data?.statusWiseCount,
        StatusName.upcoming,
      ),
      cancelledAppointments: getCountByStatus(
        data?.statusWiseCount,
        StatusName.cancelled,
      ),
    };
    const newData: IDashboardData = {
      upcommingAppoinment: data?.latestAppointment,
      dashboardData,
    };

    //newData);
    yield put(dashboardDataSuccess(newData));

    return;
  } catch (err) {
    err = serializeError(err);
    //err);
    yield put(dashboardDataFailure(err));
  }
}
export function* watchCancelAppoinment() {
  yield takeEvery(
    removeFromAppoinmentListRequested.type,
    cancelSelectedAppointment,
  );
}

export function* watchFetchAppointmentList() {
  yield takeEvery(appointmentListRequested.type, fetchAppointmentList);
}

export function* watchFetchAppointmentDetails() {
  yield takeEvery(getAppointmentDetailsRequested.type, fetchAppointmentDetails);
}

export function* watchUpdateAppointment() {
  yield takeEvery(updateAppointmentRequested.type, updateSelectedAppointment);
}

export function* watchFetchDateTimeSlot() {
  yield takeEvery(dateTimeSlotRequested.type, fetchDateTimeSlot);
}

export function* watchFetchDashboardData() {
  yield takeEvery(dashboardDataRequested.type, fetchDashboardData);
}
