import * as types from "../utils/dataTypes";
import _ from "lodash";
import { Reducer } from "redux";
import { ReduxAction } from "./actions";

export interface RootReducerState {
  selectItem: types.Payload_Items;
  students: types.FetchGenericState<types.Student>;
  professors: types.FetchGenericState<types.Professor>;
  groups: types.FetchGenericState<types.Group>;
  cities: types.FetchGenericState<types.City>;
  currentFilterVs: types.FilterVs;
}

const initialState: RootReducerState = {
  selectItem: "students",
  cities: types.initialFetchingState,
  students: types.initialFetchingState,
  groups: types.initialFetchingState,
  professors: types.initialFetchingState,
  currentFilterVs: types.defaultFilterVs
};
export const RootReducer: Reducer<RootReducerState, ReduxAction<any>> = (
  state = initialState,
  action
) => {
  let tmpState = { ...state };
  switch (action.type) {
    case "FETCHING":
      console.log("action", action);
      let payloadFetching: types.Payload_Items = action.payload;
      tmpState[payloadFetching].isFetching = true;
      return tmpState;
    case "ERROR_FETCH":
      console.log("action", action);
      let payloadError: types.Payload_Items = action.payload;
      tmpState[payloadError].isFetching = false;
      tmpState[payloadError].errorFetch = true;
      return tmpState;
    case "SUCCESS_FETCH":
      console.log("action", action);
      let payloadSuccess: types.Payload_SuccessFetch = action.payload;
      tmpState[payloadSuccess.item].isFetching = false;
      tmpState[payloadSuccess.item].errorFetch = false;
      tmpState[payloadSuccess.item].isUpdated = true;

      tmpState[payloadSuccess.item].data = payloadSuccess.data;
      return tmpState;
    // case "FETCH_STUDENTS_SUCCESS":
    //   return {
    //     ...state,
    //     error: false,
    //     fetching: false,
    //     isStudentsUpdated: true,
    //     students: action.payload
    //   };
    // case "FETCH_GROUPS_SUCCESS":
    //   return {
    //     ...state,
    //     error: false,
    //     fetching: false,
    //     isGroupsUpdated: true,
    //     groups: action.payload
    //   };
    // case "FETCH_CITIES_SUCCESS":
    //   return {
    //     ...state,
    //     error: false,
    //     fetching: false,
    //     cities: action.payload
    //   };
    // case "FETCH_PROFESSORS_SUCCESS":
    //   return {
    //     ...state,
    //     error: false,
    //     fetching: false,
    //     professors: action.payload
    //   };
    // case "POST_STUDENT_SUCCESS":
    //   return { ...state, students: [...state.students, action.payload] };
    // case "DELETE_STUDENT_SUCCESS":
    //   return {
    //     ...state,
    //     students: _.filter(
    //       state.students,
    //       student => student.id !== action.payload.id
    //     )
    //   };
    // case "DELETE_GROUP_SUCCESS":
    //   return {
    //     ...state,
    //     groups: _.filter(state.groups, group => group.id !== action.payload.id)
    //   };
    // case "POST_GROUP_SUCCESS":
    //   return { ...state, isGroupsUpdated: false };
    case "CHANGE_FILTER":
      return { ...state, currentFilterVs: action.payload };

    default:
      return state;
  }
};

// export interface RootReducerState {
//   students: StudentState;
//   groups: GroupState;
//   cities: CitiesState;
//   professors: ProfessorsState;
// }

// export const Actions = {
//   ...StudentActions,
//   ...GroupActions,
//   ...ProfessorActions,
//   ...CitiesActions
// };

// export const RootReducer = combineReducers<RootReducerState>({
//   students: StudentReducer,
//   groups: GroupReducer,
//   cities: CitiesReducer,
//   professors: ProfessorsReducer
// });
