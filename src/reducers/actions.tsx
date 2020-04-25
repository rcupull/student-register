import { Action, Dispatch } from "redux";
import axios from "axios";
import * as def from "../utils/definitions";
import * as types from "../utils/dataTypes";

type ActionType =
  | "FETCHING"
  | "ERROR_FETCH"
  | "SUCCESS_FETCH"
  | "FETCH_STUDENTS_SUCCESS"
  | "FETCH_CITIES_SUCCESS"
  | "FETCH_GROUPS_SUCCESS"
  | "FETCH_PROFESSORS_SUCCESS"
  | "POST_STUDENT_SUCCESS"
  | "POST_GROUP_SUCCESS"
  | "DELETE_STUDENT_SUCCESS"
  | "DELETE_GROUP_SUCCESS"
  | "CHANGE_FILTER";

export interface ReduxAction<T> extends Action<ActionType> {
  payload: T;
}
///////////////////////////////////Action Creators///////////////////
// const PostStudentSucces = (student: dataTypes.Student): ReduxAction => {
//   return { type: "POST_STUDENT_SUCCESS", payload: student };
// };
// const DeleteStudentSucces = (student: dataTypes.Student): ReduxAction => {
//   return { type: "DELETE_STUDENT_SUCCESS", payload: student };
// };
// const PostGroupSuccess = (): ReduxAction => {
//   return { type: "POST_GROUP_SUCCESS" };
// };
// const DeleteGroupSucces = (group: dataTypes.Group): ReduxAction => {
//   return { type: "DELETE_GROUP_SUCCESS", payload: group };
// };

//////////////////////////////////////////////////////////
const FetchingAction = (
  item: types.Payload_Items
): ReduxAction<types.Payload_Items> => {
  return { type: "FETCHING", payload: item };
};
const FetchErrorAction = (
  item: types.Payload_Items
): ReduxAction<types.Payload_Items> => {
  return { type: "ERROR_FETCH", payload: item };
};
const FetchSuccessAction = (
  item: types.Payload_Items,
  data: any[]
): ReduxAction<types.Payload_SuccessFetch> => {
  return {
    type: "FETCH_STUDENTS_SUCCESS",
    payload: { item: item, data: data }
  };
};

// const FetchStudentSuccessAction = (data: Student[]): ReduxAction => {
//   return { type: "FETCH_STUDENTS_SUCCESS", payload: data };
// };
// const FetchGroupSuccessAction = (data: Group[]): ReduxAction => {
//   return { type: "FETCH_GROUPS_SUCCESS", payload: data };
// };
// const FetchCitiesSuccessAction = (data: City[]): ReduxAction => {
//   return { type: "FETCH_CITIES_SUCCESS", payload: data };
// };
// const FetchProfessorsSuccessAction = (data: Professor[]): ReduxAction => {
//   return { type: "FETCH_PROFESSORS_SUCCESS", payload: data };
// };
// //////////////////////////////////////////////////////////
const ChangeFilterVsAction = (
  filterVs: types.FilterVs
): ReduxAction<types.FilterVs> => {
  return { type: "CHANGE_FILTER", payload: filterVs };
};

//////////////////////////////////////////////////////////
const FetchThunk = (item: types.Payload_Items) => (
  dispatch: Dispatch<ReduxAction<any>>
) => {
  dispatch(FetchingAction(item));
  const error = () => {
    dispatch(FetchErrorAction(item));
  };
  const success = (res: any) => {
    dispatch(FetchSuccessAction(item, res.data));
  };
  axios({ method: "get", url: def.GetURL(item) })
    .then(success)
    .catch(error);
};

// const FetchStudentsThunk = () => (dispatch: Dispatch<ReduxAction<any>>) => {
//   dispatch(FetchingAction());
//   const error = () => {
//     dispatch(FetchErrorAction());
//   };
//   const success = (res: any) => {
//     dispatch(FetchStudentSuccessAction(res.data));
//   };
//   axios(def.getStudentsRequestConfig)
//     .then(success)
//     .catch(error);
// };
// const FetchProfessorsThunk = () => (dispatch: Dispatch<ReduxAction>) => {
//   dispatch(FetchingAction());
//   const error = () => {
//     dispatch(FetchErrorAction());
//   };
//   const success = (res: any) => {
//     dispatch(FetchProfessorsSuccessAction(res.data));
//   };
//   axios(def.getProfessorsRequestConfig)
//     .then(success)
//     .catch(error);
// };
// const FetchCitiesThunk = () => (dispatch: Dispatch<ReduxAction>) => {
//   dispatch(FetchingAction());
//   const error = () => {
//     dispatch(FetchErrorAction());
//   };
//   const success = (res: any) => {
//     dispatch(FetchCitiesSuccessAction(res.data));
//   };
//   axios(def.getCitiesRequestConfig)
//     .then(success)
//     .catch(error);
// };
// const FetchGroupsThunk = () => (dispatch: Dispatch<ReduxAction>) => {
//   dispatch(FetchingAction());
//   const error = () => {
//     dispatch(FetchErrorAction());
//   };
//   const success = (res: any) => {
//     dispatch(FetchGroupSuccessAction(res.data));
//   };
//   axios(def.getGroupRequestConfig)
//     .then(success)
//     .catch(error);
// };
//////////////////////////////////////////////////////////

// const PostStudentThunk = (student: Student) => (
//   dispatch: Dispatch<ReduxAction>
// ) => {
//   dispatch(FetchingAction());
//   const error = () => {
//     dispatch(FetchErrorAction());
//   };
//   const success = (res: any) => {
//     dispatch(PostStudentSucces(res.data));
//   };
//   axios({ ...def.postStudentRequestConfig, data: student })
//     .then(success)
//     .catch(error);
// };

// const PostGroupThunk = (group: Group) => (dispatch: Dispatch<ReduxAction>) => {
//   dispatch(FetchingAction());
//   const error = () => {
//     dispatch(FetchErrorAction());
//   };
//   const success = (res: any) => {
//     dispatch(PostGroupSuccess());
//   };
//   axios({ ...def.postGroupRequestConfig, data: group })
//     .then(success)
//     .catch(error);
// };
// //////////////////////////////////////////////////////////
// const DeleteStudentThunk = (student: Student) => (
//   dispatch: Dispatch<ReduxAction>
// ) => {
//   dispatch(FetchingAction());
//   const error = () => {
//     dispatch(FetchErrorAction());
//   };
//   const success = (res: any) => {
//     dispatch(DeleteStudentSucces(student));
//   };
//   let url: string = def.deleteStudentRequestConfig.url
//     ? def.deleteStudentRequestConfig.url
//     : "";
//   axios({ ...def.deleteStudentRequestConfig, url: url + "/" + student.id })
//     .then(success)
//     .catch(error);
// };

// const DeleteGroupThunk = (group: Group) => (
//   dispatch: Dispatch<ReduxAction>
// ) => {
//   dispatch(FetchingAction());
//   const error = () => {
//     dispatch(FetchErrorAction());
//   };
//   const success = (res: any) => {
//     dispatch(DeleteGroupSucces(group));
//   };
//   let url: string = def.deleteGroupRequestConfig.url
//     ? def.deleteGroupRequestConfig.url
//     : "";
//   axios({ ...def.deleteGroupRequestConfig, url: url + "/" + group.id })
//     .then(success)
//     .catch(error);
// };

export const Actions = {
  FetchThunk,
  // FetchCitiesThunk,
  // FetchGroupsThunk,
  // FetchProfessorsThunk,
  // FetchStudentsThunk,
  // PostStudentThunk,
  // PostGroupThunk,
  // DeleteStudentThunk,
  // DeleteGroupThunk,
  ChangeFilterVsAction
};
