import React, { useEffect, Fragment } from "react";
import { Student, Group, City, Professor } from "../utils/dataTypes";
import * as ReactRedux from "react-redux";
import { RootReducerState } from "../reducers/rootReducer";
import { Actions } from "../reducers/actions";
import { Table, Button } from "react-bootstrap";
import { IdToName, StudentToProfessorName } from "../utils/utilsFunctions";
import * as styles from "../components/stylesComponent";
import _ from "lodash";
import Filter from "./filter";
const fields: string[] = [
  "#",
  "Name",
  "Group",
  "Email",
  "Sex",
  "Age",
  "Birthplace",
  "Birthday",
  "Main professor",
  "Delete"
];

export interface OwnProps {}
export interface StateProps {
  listStudents: Student[];
  listGroups: Group[];
  listCities: City[];
  listProfessors: Professor[];
}
export interface DispatchProps {
  handleDeleteStudent: (student: Student) => void;
  handleLoadStudents: () => void;
  handleLoadGroup: () => void;
}
type ListStudentsProps = OwnProps & StateProps & DispatchProps;

const ListStudents: React.SFC<ListStudentsProps> = ({
  listStudents,
  listGroups,
  listCities,
  listProfessors,
  handleDeleteStudent,
  handleLoadStudents,
  handleLoadGroup
}) => {
  useEffect(() => {
    handleLoadStudents();
    handleLoadGroup();
  }, []);

  return (
    <Fragment>
      <Filter />
      <Table striped bordered hover style={styles.listTableBodyStyle}>
        <thead>
          <tr>
            {fields.map((field, id) => (
              <th key={id}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{IdToName(student.groupId, listGroups)}</td>
              <td>{student.email}</td>
              <td>{student.sex}</td>
              <td>{student.age}</td>
              <td>{IdToName(student.cityId, listCities)}</td>
              <td>{student.birthday}</td>
              <td>
                {StudentToProfessorName(student, listGroups, listProfessors)}
              </td>
              <td>
                <Button
                  style={styles.listDeleteButtonStyle}
                  onClick={() => {
                    handleDeleteStudent(student);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

//////////////////////////////////////Container///////////////////////////

const MapStateToProps: ReactRedux.MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  var listStudents: Student[];

  switch (state.currentFilterVs.type) {
    case "City":
      listStudents = _.filter(
        state.students,
        student => student.cityId === state.currentFilterVs.option
      );
      break;
    case "Group":
      listStudents = _.filter(
        state.students,
        student => student.groupId === state.currentFilterVs.option
      );
      break;
    case "Professor":
      var group: Group | undefined = _.find(
        state.groups,
        group => group.professorId === state.currentFilterVs.option
      );

      listStudents =
        typeof group === undefined
          ? state.students
          : _.filter(state.students, student => student.groupId === group?.id);
      break;
    case "All":
    default:
      listStudents = state.students;
      break;
  }

  return {
    listStudents: listStudents,
    listCities: state.cities,
    listGroups: state.groups,
    listProfessors: state.professors
  };
};

const MapDispatchToProps: ReactRedux.MapDispatchToProps<
  DispatchProps,
  OwnProps
> = {
  handleDeleteStudent: Actions.DeleteStudentThunk,
  handleLoadGroup: Actions.FetchGroupsThunk,
  handleLoadStudents: Actions.FetchStudentsThunk
};

export default ReactRedux.connect(
  MapStateToProps,
  MapDispatchToProps
)(ListStudents);
