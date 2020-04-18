import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { SexTypes } from "../utils/dataTypes";
import { City, Group, Student } from "../utils/dataTypes";
import * as styles from "../components/stylesComponent";

import * as ReactRedux from "react-redux";
import { RootReducerState } from "../reducers/rootReducer";
import { Actions } from "../reducers/actions";
export interface OwnProps {}
export interface StateProps {
  listGroups: Group[];
  listCities: City[];
  fetching: boolean;
}
export interface DispatchProps {
  handlePostStudent: (student: Student) => void;
  handleloadGroups: () => void;
}

type FormStudentProps = OwnProps & StateProps & DispatchProps;

const FormStudent: React.SFC<FormStudentProps> = ({
  listGroups,
  listCities,
  fetching,
  handlePostStudent,
  handleloadGroups
}) => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [groupId, setGroupId] = useState<number>(0);
  const [sex, setSex] = useState<SexTypes>("Male");
  const [cityId, setCityId] = useState<number>(0);
  const [birthday, setBirthday] = useState<string>("");

  const handleResetCityId = () => {
    if (listCities.length) setCityId(listCities[0].id);
  };

  const handleResetGroupId = () => {
    if (listGroups.length) setGroupId(listGroups[0].id);
  };

  useEffect(() => {
    handleResetCityId();
    handleResetGroupId();
    handleloadGroups();
  }, []);

  const handlesResetAll = () => {
    setName("");
    setAge("");
    setEmail("");
    handleResetGroupId();
    setSex("Male");
    handleResetCityId();
    setBirthday("");
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    handlePostStudent({
      name: name,
      age: Number(age),
      sex: sex,
      birthday: birthday,
      cityId: cityId,
      email: email,
      groupId: groupId,
      id: 0
    });

    handlesResetAll();
  };

  const handleGroupSelector = () => {
    return (
      <Form.Group>
        <Form.Label>Group</Form.Label>
        <Form.Control
          as="select"
          value={groupId}
          onChange={(e: any) => {
            setGroupId(Number(e.target.value));
          }}
        >
          {listGroups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
  };

  const handleCitySelector = () => {
    return (
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          as="select"
          value={cityId}
          onChange={(e: any) => {
            setCityId(Number(e.target.value));
          }}
        >
          {listCities.map(city => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
  };

  const handleSexSelector = () => {
    return (
      <Form.Group>
        <Form.Label>Sex</Form.Label>
        <Form.Control
          as="select"
          onChange={(e: any) => {
            setSex(e.target.value);
          }}
        >
          <option>Male</option>
          <option>Female</option>
        </Form.Control>
      </Form.Group>
    );
  };

  return (
    <Form onSubmit={handleSubmit} style={styles.formStudentBodyStyle}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          pattern="[a-z A-Z]*"
          value={name}
          required
          type="text"
          placeholder="Enter full name"
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
      </Form.Group>
      {handleGroupSelector()}
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>

      {handleSexSelector()}
      <Form.Group>
        <Form.Label>Age</Form.Label>
        <Form.Control
          required
          type="number"
          min="5"
          max="100"
          placeholder="Enter age"
          value={age}
          onChange={(e: any) => {
            setAge(e.target.value);
          }}
        />
      </Form.Group>
      {handleCitySelector()}

      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          required
          type="date"
          value={birthday}
          onChange={(e: any) => {
            setBirthday(e.target.value);
          }}
        />
      </Form.Group>

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
//////////////////////////////Container//////////////////////////////////
const MapStateToProps: ReactRedux.MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return {
    listCities: state.cities,
    listGroups: state.groups,
    fetching: state.fetching
  };
};

const MapDispatchToProps: ReactRedux.MapDispatchToProps<
  DispatchProps,
  OwnProps
> = {
  handlePostStudent: Actions.PostStudentThunk,
  handleloadGroups: Actions.FetchGroupsThunk
};

export default ReactRedux.connect(
  MapStateToProps,
  MapDispatchToProps
)(FormStudent);
