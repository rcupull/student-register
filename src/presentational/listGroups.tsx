import React, { useEffect } from "react";
import { Group, Professor } from "../reducers/dataTypes";
import * as ReactRedux from "react-redux";
import { RootReducerState } from "../reducers/dataTypes";
import { Actions } from "../reducers/actions";
import { Table, Button } from "react-bootstrap";
import { IdToName } from "../utils/utilsFunctions";
import * as styles from "../components/stylesComponent";
const fields: string[] = ["#", "Name", "Main professor", "Delete"];

export interface OwnProps {}
export interface StateProps {
  listGroups: Group[];
  listProfessors: Professor[];
}
export interface DispatchProps {
  handleDeleteGroup: (group: Group) => void;
  handleLoadProfessor: () => void;
  handleLoadGroup: () => void;
}
type ListGroupsProps = OwnProps & StateProps & DispatchProps;

const ListGroups: React.SFC<ListGroupsProps> = ({
  listGroups,
  listProfessors,
  handleDeleteGroup,
  handleLoadGroup,
  handleLoadProfessor
}) => {
  useEffect(() => {
    handleLoadProfessor();
    handleLoadGroup();
  }, []);

  return (
    <Table striped bordered hover style={styles.listTableBodyStyle}>
      <thead>
        <tr>
          {fields.map((field, id) => (
            <th key={id}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {listGroups.map(group => (
          <tr key={group.id}>
            <td>{group.id}</td>
            <td>{group.name}</td>
            <td>{IdToName(group.professorId, listProfessors)}</td>
            <td>
              <Button
                style={styles.listDeleteButtonStyle}
                onClick={() => {
                  handleDeleteGroup(group);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

//////////////////////////////////////Container///////////////////////////

const MapStateToProps: ReactRedux.MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return {
    listGroups: state.groups.data,
    listProfessors: state.professors.data
  };
};

const MapDispatchToProps: ReactRedux.MapDispatchToProps<
  DispatchProps,
  OwnProps
> = {
  handleLoadProfessor: Actions.FetchProfessors,
  handleLoadGroup: Actions.FetchGroups,
  handleDeleteGroup: Actions.DeleteGroup
};

export default ReactRedux.connect(
  MapStateToProps,
  MapDispatchToProps
)(ListGroups);
