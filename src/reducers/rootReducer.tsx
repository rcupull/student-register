import {
  Group,
  Professor,
  City,
  Student,
  FilterVs,
  defaultFilterVs
} from "../utils/dataTypes";
import _ from "lodash";
import { Reducer } from "redux";
import { ReduxAction } from "./actions";

export interface RootReducerState {
  students: Student[];
  professors: Professor[];
  groups: Group[];
  cities: City[];

  fetching: boolean;
  error: boolean;
  currentFilterVs: FilterVs;
}

const initialState: RootReducerState = {
  cities: [],
  students: [],
  groups: [],
  professors: [],
  error: false,
  fetching: false,
  currentFilterVs: defaultFilterVs
};
export const RootReducer: Reducer<RootReducerState, ReduxAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "FETCHING":
      return { ...state, fetching: true, error: false };
    case "FETCH_ERROR":
      return { ...state, fetching: false, error: true };
    case "FETCH_STUDENTS_SUCCESS":
      return {
        ...state,
        error: false,
        fetching: false,
        isStudentsUpdated: true,
        students: action.payload
      };
    case "FETCH_GROUPS_SUCCESS":
      return {
        ...state,
        error: false,
        fetching: false,
        isGroupsUpdated: true,
        groups: action.payload
      };
    case "FETCH_CITIES_SUCCESS":
      return {
        ...state,
        error: false,
        fetching: false,
        cities: action.payload
      };
    case "FETCH_PROFESSORS_SUCCESS":
      return {
        ...state,
        error: false,
        fetching: false,
        professors: action.payload
      };
    case "POST_STUDENT_SUCCESS":
      return { ...state, students: [...state.students, action.payload] };
    case "DELETE_STUDENT_SUCCESS":
      return {
        ...state,
        students: _.filter(
          state.students,
          student => student.id !== action.payload.id
        )
      };
    case "DELETE_GROUP_SUCCESS":
      return {
        ...state,
        groups: _.filter(state.groups, group => group.id !== action.payload.id)
      };
    case "POST_GROUP_SUCCESS":
      return { ...state, isGroupsUpdated: false };
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
