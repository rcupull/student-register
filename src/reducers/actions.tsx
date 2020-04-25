import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";
import { GetURL } from "../utils/definitions";
import { Item, FilterVs, RootReducerState, Student, Group } from "./dataTypes";

export type OwnAction =
  | { type: "FETCHING"; item: Item }
  | { type: "ERROR_FETCH"; item: Item }
  | { type: "SUCCESS_FETCH"; item: Item; data: any[] }
  | { type: "SUCCESS_POST"; item: Item }
  | { type: "SUCCESS_DELETE"; item: Item }
  | { type: "CHANGE_FILTER"; vsFilter: FilterVs };

// type ActionType =
//   | "FETCHING"
//   | "ERROR_FETCH"
//   | "SUCCESS_FETCH"
//   | "FETCH_STUDENTS_SUCCESS"
//   | "FETCH_CITIES_SUCCESS"
//   | "FETCH_GROUPS_SUCCESS"
//   | "FETCH_PROFESSORS_SUCCESS"
//   | "POST_STUDENT_SUCCESS"
//   | "POST_GROUP_SUCCESS"
//   | "DELETE_STUDENT_SUCCESS"
//   | "DELETE_GROUP_SUCCESS"
//   | "CHANGE_FILTER";

// export interface OwnAction<T> extends Action<ActionType> {
//   payload: T;
// }
type ThunkResult<R> = ThunkAction<R, RootReducerState, undefined, OwnAction>;
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
const FetchingAction = (item: Item): OwnAction => {
  return { type: "FETCHING", item: item };
};
const FetchErrorAction = (item: Item): OwnAction => {
  return { type: "ERROR_FETCH", item: item };
};
const FetchSuccessAction = (item: Item, data: any[]): OwnAction => {
  return {
    type: "SUCCESS_FETCH",
    item: item,
    data: data
  };
};
const PostSuccessAction = (item: Item): OwnAction => {
  return {
    type: "SUCCESS_POST",
    item: item
  };
};
const DeleteSuccessAction = (item: Item): OwnAction => {
  return {
    type: "SUCCESS_DELETE",
    item: item
  };
};
// //////////////////////////////////////////////////////////
const ChangeVsFilterAction = (vsFilter: FilterVs): OwnAction => {
  return { type: "CHANGE_FILTER", vsFilter: vsFilter };
};

//////////////////////////////////////////////////////////
const FetchThunk = (item: Item): ThunkResult<void> => (dispatch, getState) => {
  if (!getState()[item].isUpdated) {
    dispatch(FetchingAction(item));
    const error = () => {
      dispatch(FetchErrorAction(item));
    };
    const success = (res: any) => {
      dispatch(FetchSuccessAction(item, res.data));
    };
    axios({ method: "get", url: GetURL(item) })
      .then(success)
      .catch(error);
  }
};

const FetchCities = (): ThunkResult<void> => dispatch => {
  dispatch(FetchThunk("cities"));
};
const FetchStudents = (): ThunkResult<void> => dispatch => {
  dispatch(FetchThunk("students"));
};
const FetchProfessors = (): ThunkResult<void> => dispatch => {
  dispatch(FetchThunk("professors"));
};
const FetchGroups = (): ThunkResult<void> => dispatch => {
  dispatch(FetchThunk("groups"));
};
///////////////////////////////////////////////////////////////////
const PostThunk = (
  item: Item,
  data: Student | Group
): ThunkResult<void> => dispatch => {
  dispatch(FetchingAction(item));
  const error = () => {
    dispatch(FetchErrorAction(item));
  };
  const success = (res: any) => {
    dispatch(PostSuccessAction(item));
  };
  axios({ method: "post", url: GetURL(item), data: data })
    .then(success)
    .catch(error);
};
const PostStudents = (student: Student): ThunkResult<void> => dispatch => {
  dispatch(PostThunk("students", student));
};
const PostGroup = (group: Group): ThunkResult<void> => dispatch => {
  dispatch(PostThunk("groups", group));
};

///////////////////////////////////////////////////////
const DeleteThunk = (
  item: Item,
  data: Student | Group
): ThunkResult<void> => dispatch => {
  dispatch(FetchingAction(item));
  const error = () => {
    dispatch(FetchErrorAction(item));
  };
  const success = (res: any) => {
    dispatch(DeleteSuccessAction(item));
  };

  axios({ method: "delete", url: GetURL(item) + "/" + data.id })
    .then(success)
    .catch(error);
};

const DeleteStudent = (student: Student): ThunkResult<void> => dispatch => {
  dispatch(DeleteThunk("students", student));
};
const DeleteGroup = (group: Group): ThunkResult<void> => dispatch => {
  dispatch(DeleteThunk("groups", group));
};
///////////////////////////////////////////////////////
export const Actions = {
  FetchStudents,
  FetchProfessors,
  FetchGroups,
  FetchCities,
  PostStudents,
  PostGroup,
  DeleteStudent,
  DeleteGroup,
  ChangeVsFilterAction
};

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
