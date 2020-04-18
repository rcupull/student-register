import _ from "lodash";
import { Group, City, Professor, Student } from "./dataTypes";

const defaultResponse: string = "< Not found >";

export const IdToName = (id: number, list: Group[] | City[]): string => {
  if (list.length === 0) return defaultResponse;
  if (list.length === 1) {
    return list[0].id === id ? list[0].name : defaultResponse;
  } else {
    let index: number = _.findIndex(list, obj => obj.id === id);

    return index >= 0 ? list[index].name : defaultResponse;
  }
};

export const NameToID = (name: string, list: Group[] | City[]): number => {
  if (list.length === 0) return -1;
  if (list.length === 1) {
    return list[0].name === name ? list[0].id : -1;
  } else {
    let index: number = _.findIndex(list, obj => obj.name === name);
    return list[index].id;
  }
};

export const StudentToProfessorName = (
  student: Student,
  listGroups: Group[],
  listProfessors: Professor[]
): string => {
  let group: Group | undefined = _.find(
    listGroups,
    group => group.id === student.groupId
  );
  let professor: Professor | undefined = _.find(
    listProfessors,
    professor => professor.id === group?.professorId
  );

  return professor ? professor.name : defaultResponse;
};
