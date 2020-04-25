export type SexTypes = "Male" | "Female";
export type FilterType = "All" | "Group" | "City" | "Professor";
export const filterTypeArray: FilterType[] = [
  "All",
  "Group",
  "Professor",
  "City"
];
export type FilterOption = number;

export interface FilterVs {
  type: FilterType;
  option: FilterOption;
}

export const defaultFilterVs: FilterVs = { type: "All", option: 0 };
export interface Student {
  id: number;
  name: string;
  age: number;
  sex: SexTypes;
  email: string;
  birthday: string;
  cityId: number;
  groupId: number;
}
export interface Group {
  id: number;
  name: string;
  professorId: number;
}
export interface Professor {
  id: number;
  name: string;
}
export interface City {
  id: number;
  name: string;
}

export interface FetchGenericState<T> {
  data: T[];
  isUpdated: boolean;
  isFetching: boolean;
  errorFetch: boolean;
}
export const initialFetchingState: FetchGenericState<any> = {
  data: [],
  isFetching: false,
  isUpdated: false,
  errorFetch: false
};

//////////////////////////PAYLOAD TYPES////////////////////////
export type Payload_Items = "students" | "professors" | "groups" | "cities";
export interface Payload_SuccessFetch {
  item: Payload_Items;
  data: any[];
}
