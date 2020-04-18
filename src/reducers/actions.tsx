import { Action, Dispatch } from "redux";
import axios from "axios";
import * as def from "../utils/definitions";
import { Group, Professor, City, Student, FilterVs } from "../utils/dataTypes";

type ActionType =
  | "FETCHING"
  | "FETCH_ERROR"
  | "FETCH_STUDENTS_SUCCESS"
  | "FETCH_CITIES_SUCCESS"
  | "FETCH_GROUPS_SUCCESS"
  | "FETCH_PROFESSORS_SUCCESS"
  | "POST_STUDENT_SUCCESS"
  | "POST_GROUP_SUCCESS"
  | "DELETE_STUDENT_SUCCESS"
  | "DELETE_GROUP_SUCCESS"
  | "CHANGE_FILTER";

export interface ReduxAction extends Action<ActionType> {
  payload?: any;
}
///////////////////////////////////Action Creators///////////////////
const PostStudentSucces = (student: Student): ReduxAction => {
  return { type: "POST_STUDENT_SUCCESS", payload: student };
};
const DeleteStudentSucces = (student: Student): ReduxAction => {
  return { type: "DELETE_STUDENT_SUCCESS", payload: student };
};
const PostGroupSuccess = (): ReduxAction => {
  return { type: "POST_GROUP_SUCCESS" };
};
const DeleteGroupSucces = (group: Group): ReduxAction => {
  return { type: "DELETE_GROUP_SUCCESS", payload: group };
};
//////////////////////////////////////////////////////////
const FetchingAction = (): ReduxAction => {
  return { type: "FETCHING" };
};
const FetchErrorAction = (): ReduxAction => {
  return { type: "FETCH_ERROR" };
};
//////////////////////////////////////////////////////////
const FetchStudentSuccessAction = (data: Student[]): ReduxAction => {
  return { type: "FETCH_STUDENTS_SUCCESS", payload: data };
};
const FetchGroupSuccessAction = (data: Group[]): ReduxAction => {
  return { type: "FETCH_GROUPS_SUCCESS", payload: data };
};
const FetchCitiesSuccessAction = (data: City[]): ReduxAction => {
  return { type: "FETCH_CITIES_SUCCESS", payload: data };
};
const FetchProfessorsSuccessAction = (data: Professor[]): ReduxAction => {
  return { type: "FETCH_PROFESSORS_SUCCESS", payload: data };
};
//////////////////////////////////////////////////////////
const ChangeFilterVsAction = (filterVs: FilterVs): ReduxAction => {
  return { type: "CHANGE_FILTER", payload: filterVs };
};

//////////////////////////////////////////////////////////
const FetchStudentsThunk = () => (dispatch: Dispatch<ReduxAction>) => {
  dispatch(FetchingAction());
  const error = () => {
    dispatch(FetchErrorAction());
  };
  const success = (res: any) => {
    dispatch(FetchStudentSuccessAction(res.data));
  };
  axios(def.getStudentsRequestConfig)
    .then(success)
    .catch(error);
};
const FetchProfessorsThunk = () => (dispatch: Dispatch<ReduxAction>) => {
  dispatch(FetchingAction());
  const error = () => {
    dispatch(FetchErrorAction());
  };
  const success = (res: any) => {
    dispatch(FetchProfessorsSuccessAction(res.data));
  };
  axios(def.getProfessorsRequestConfig)
    .then(success)
    .catch(error);
};
const FetchCitiesThunk = () => (dispatch: Dispatch<ReduxAction>) => {
  dispatch(FetchingAction());
  const error = () => {
    dispatch(FetchErrorAction());
  };
  const success = (res: any) => {
    dispatch(FetchCitiesSuccessAction(res.data));
  };
  axios(def.getCitiesRequestConfig)
    .then(success)
    .catch(error);
};
const FetchGroupsThunk = () => (dispatch: Dispatch<ReduxAction>) => {
  dispatch(FetchingAction());
  const error = () => {
    dispatch(FetchErrorAction());
  };
  const success = (res: any) => {
    dispatch(FetchGroupSuccessAction(res.data));
  };
  axios(def.getGroupRequestConfig)
    .then(success)
    .catch(error);
};
//////////////////////////////////////////////////////////
const PostStudentThunk = (student: Student) => (
  dispatch: Dispatch<ReduxAction>
) => {
  dispatch(FetchingAction());
  const error = () => {
    dispatch(FetchErrorAction());
  };
  const success = (res: any) => {
    dispatch(PostStudentSucces(res.data));
  };
  axios({ ...def.postStudentRequestConfig, data: student })
    .then(success)
    .catch(error);
};
const PostGroupThunk = (group: Group) => (dispatch: Dispatch<ReduxAction>) => {
  dispatch(FetchingAction());
  const error = () => {
    dispatch(FetchErrorAction());
  };
  const success = (res: any) => {
    dispatch(PostGroupSuccess());
  };
  axios({ ...def.postGroupRequestConfig, data: group })
    .then(success)
    .catch(error);
};
//////////////////////////////////////////////////////////
const DeleteStudentThunk = (student: Student) => (
  dispatch: Dispatch<ReduxAction>
) => {
  dispatch(FetchingAction());
  const error = () => {
    dispatch(FetchErrorAction());
  };
  const success = (res: any) => {
    dispatch(DeleteStudentSucces(student));
  };
  let url: string = def.deleteStudentRequestConfig.url
    ? def.deleteStudentRequestConfig.url
    : "";
  axios({ ...def.deleteStudentRequestConfig, url: url + "/" + student.id })
    .then(success)
    .catch(error);
};

const DeleteGroupThunk = (group: Group) => (
  dispatch: Dispatch<ReduxAction>
) => {
  dispatch(FetchingAction());
  const error = () => {
    dispatch(FetchErrorAction());
  };
  const success = (res: any) => {
    dispatch(DeleteGroupSucces(group));
  };
  let url: string = def.deleteGroupRequestConfig.url
    ? def.deleteGroupRequestConfig.url
    : "";
  axios({ ...def.deleteGroupRequestConfig, url: url + "/" + group.id })
    .then(success)
    .catch(error);
};

export const Actions = {
  FetchCitiesThunk,
  FetchGroupsThunk,
  FetchProfessorsThunk,
  FetchStudentsThunk,
  PostStudentThunk,
  PostGroupThunk,
  DeleteStudentThunk,
  DeleteGroupThunk,
  ChangeFilterVsAction
};
