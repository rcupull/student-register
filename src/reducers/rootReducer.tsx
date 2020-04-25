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
    case "SUCCESS_DELETE":
      tmpState[action.item].isFetching = false;
      tmpState[action.item].errorFetch = false;
      tmpState[action.item].isUpdated = false;
      break;
    case "CHANGE_FILTER":
      tmpState.vsFilter = action.vsFilter;
      break;
    default:
      break;
  }
  // console.log("action", action);
  // console.log("new state", tmpState);
  return tmpState;
};
