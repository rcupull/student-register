import { ThunkAction } from "redux-thunk";
import axios from "axios";
import { GetURL, isOnlineURL } from "../utils/definitions";
import { Item, FilterVs, RootReducerState, Student, Group } from "./dataTypes";

export type OwnAction =
  | { type: "FETCHING"; item: Item }
  | { type: "ERROR_FETCH"; item: Item }
  | { type: "SUCCESS_FETCH"; item: Item; data: any[] }
  | { type: "SUCCESS_POST"; item: Item }
  | { type: "SUCCESS_DELETE"; item: Item; id: number }
  | { type: "CHANGE_FILTER"; vsFilter: FilterVs }
  | { type: "IS_ONLINE"; value: boolean };

type ThunkResult<R> = ThunkAction<R, RootReducerState, undefined, OwnAction>;
///////////////////////////////////Action Creators///////////////////

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
const DeleteSuccessAction = (item: Item, id: number): OwnAction => {
  return {
    type: "SUCCESS_DELETE",
    item: item,
    id: id
  };
};
// //////////////////////////////////////////////////////////
const ChangeVsFilterAction = (vsFilter: FilterVs): OwnAction => {
  return { type: "CHANGE_FILTER", vsFilter: vsFilter };
};
const ChangeIsOnlineAction = (value: boolean): OwnAction => {
  return { type: "IS_ONLINE", value: value };
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
const CheckIsOnlineThunk = (): ThunkResult<void> => dispatch => {
  const error = () => {
    dispatch(ChangeIsOnlineAction(false));
  };
  const success = () => {
    dispatch(ChangeIsOnlineAction(true));
  };

  axios({ method: "get", url: isOnlineURL })
    .then(success)
    .catch(error);
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
    dispatch(DeleteSuccessAction(item, data.id));
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
  ChangeVsFilterAction,
  CheckIsOnlineThunk
};
