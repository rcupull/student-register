import { RootReducerState, defaultRootReducerState } from "./dataTypes";
import _ from "lodash";
import { Reducer } from "redux";
import { OwnAction } from "./actions";

export const RootReducer: Reducer<RootReducerState, OwnAction> = (
  state = defaultRootReducerState,
  action
) => {
  let tmpState = { ...state };
  switch (action.type) {
    case "FETCHING":
      tmpState[action.item].isFetching = true;
      break;
    case "ERROR_FETCH":
      tmpState[action.item].isFetching = false;
      tmpState[action.item].errorFetch = true;
      break;
    case "SUCCESS_FETCH":
      tmpState[action.item].isFetching = false;
      tmpState[action.item].errorFetch = false;
      tmpState[action.item].isUpdated = true;

      tmpState[action.item].data = action.data;
      break;
    case "SUCCESS_POST":
      tmpState[action.item].isFetching = false;
      tmpState[action.item].errorFetch = false;
      tmpState[action.item].isUpdated = false;
      break;
    case "SUCCESS_DELETE":
      tmpState[action.item].data = _.filter(
        tmpState[action.item].data,
        data => data.id !== action.id
      );

      tmpState[action.item].isFetching = false;
      tmpState[action.item].errorFetch = false;
      tmpState[action.item].isUpdated = true;

      //In this backend, when we delete a group all student of this group are deleted too
      if (action.item === "groups") tmpState.students.isUpdated = false;

      break;
    case "CHANGE_FILTER":
      tmpState.vsFilter = action.vsFilter;
      break;
    case "IS_ONLINE":
      console.log(action);
      tmpState.isOnline = action.value;
      break;
    default:
      break;
  }
  // console.log("action", action);
  // console.log("old State", state);
  // console.log("new state", tmpState);
  return tmpState;
};
