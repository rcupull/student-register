import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Group, Professor } from "../reducers/dataTypes";
import * as ReactRedux from "react-redux";
import { RootReducerState } from "../reducers/dataTypes";
import { Actions } from "../reducers/actions";
import * as styles from "../components/stylesComponent";
export interface OwnProps {}
export interface StateProps {
  listProfessors: Professor[];
}
export interface DispatchProps {
  handlePostGroup: (group: Group) => void;
}

type FormGroupProps = OwnProps & StateProps & DispatchProps;

const FormGroup: React.SFC<FormGroupProps> = ({
  listProfessors,
  handlePostGroup
}) => {
  const [name, setName] = useState<string>("");
  const [professorId, setProfessorId] = useState<number>(1);

  const handleResetProfessorId = () => {
    if (listProfessors.length) setProfessorId(listProfessors[0].id);
  };

  const handlesResetAll = () => {
    setName("");
    handleResetProfessorId();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handlesResetAll();

    let group: Group = {
      name: name,
      professorId: professorId,
      id: 0
    };
    handlePostGroup(group);
  };

  const handleProfessorSelector = () => {
    return (
      <Form.Group>
        <Form.Label>Professor</Form.Label>
        <Form.Control
          as="select"
          value={professorId}
          onChange={(e: any) => {
            setProfessorId(Number(e.target.value));
          }}
        >
          {listProfessors.map(prof => (
            <option key={prof.id} value={prof.id}>
              {prof.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
  };

  return (
    <Form onSubmit={handleSubmit} style={styles.formGroupBodyStyle}>
      <Form.Group>
        <Form.Label>Group name</Form.Label>
        <Form.Control
          pattern="[a-zA-Z0-9-_]*"
          value={name}
          required
          type="text"
          placeholder="Enter group name"
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
      </Form.Group>
      {handleProfessorSelector()}

      <Button
        variant="primary"
        type="submit"
        style={styles.formSubmitButtonStyle}
      >
        Submit
      </Button>
    </Form>
  );
};

const MapStateToProps: ReactRedux.MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return { listProfessors: state.professors.data };
};

const MapDispatchToProps: ReactRedux.MapDispatchToProps<
  DispatchProps,
  OwnProps
> = {
  handlePostGroup: Actions.PostGroup
};

export default ReactRedux.connect(
  MapStateToProps,
  MapDispatchToProps
)(FormGroup);
