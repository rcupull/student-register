import React, { useState, useEffect } from "react";
import { Row, FormControl, Col, Container, Button } from "react-bootstrap";
import * as styles from "../components/stylesComponent";
import {
  City,
  Group,
  Professor,
  filterTypeArray,
  FilterOption,
  FilterType,
  FilterVs,
  defaultFilterVs
} from "../reducers/dataTypes";

import * as ReactRedux from "react-redux";
import { RootReducerState } from "../reducers/dataTypes";
import { Actions } from "../reducers/actions";

export interface OwnProps {}
export interface StateProps {
  listGroups: Group[];
  listCities: City[];
  listProfessor: Professor[];
  currentFilterVs: FilterVs;
}
export interface DispatchProps {
  handleChangeFilterVs: (filterVs: FilterVs) => void;
}

type FilterProps = OwnProps & StateProps & DispatchProps;

const Filter: React.SFC<FilterProps> = ({
  listCities,
  listGroups,
  listProfessor,
  currentFilterVs,
  handleChangeFilterVs
}) => {
  const [filter, setFilter] = useState<FilterType>("All");
  const [filterOption, setFilterOption] = useState<FilterOption>(0);

  const [filterOptionArray, setFilterOptionArray] = useState<any[]>([]);

  useEffect(() => {
    setFilter(currentFilterVs.type);
    setFilterOption(currentFilterVs.option);
    if (currentFilterVs.option === defaultFilterVs.option)
      setFilterOptionArray([]);
  }, [currentFilterVs]);

  const handleChangeFilter = (filter: FilterType) => {
    setFilter(filter);
    switch (filter) {
      case "City":
        setFilterOption(listCities[0].id);
        setFilterOptionArray(listCities);
        break;
      case "Group":
        setFilterOption(listGroups[0].id);
        setFilterOptionArray(listGroups);
        break;
      case "Professor":
        setFilterOption(listProfessor[0].id);
        setFilterOptionArray(listProfessor);
        break;
      case "All":
        setFilterOptionArray([]);
        break;
      default:
        break;
    }
  };

  const handleShowChangeFilter = () => {
    return (
      <FormControl
        as="select"
        value={filter}
        onChange={(e: any) => {
          handleChangeFilter(e.target.value);
        }}
      >
        {filterTypeArray.map((option, id) => (
          <option key={id}>{option}</option>
        ))}
      </FormControl>
    );
  };

  const handleShowChangeFilterOption = () => {
    return (
      <FormControl
        as="select"
        value={filterOption}
        onChange={(e: any) => {
          setFilterOption(Number(e.target.value));
        }}
      >
        {filterOptionArray.map((option, id) => (
          <option key={id} value={option.id}>
            {option.name}
          </option>
        ))}
      </FormControl>
    );
  };

  const handleShowFilterButton = () => {
    return (
      <Container style={styles.applyFilterButtonContainerStyle}>
        <Button
          style={styles.filterButtonStyle}
          onClick={() => {
            handleChangeFilterVs({ type: filter, option: filterOption });
          }}
        >
          Filter
        </Button>
      </Container>
    );
  };
  const handleShowResetFilterButton = () => {
    return (
      <Container style={styles.resetFilterButtonContainerStyle}>
        <Button
          style={styles.filterButtonStyle}
          onClick={() => {
            handleChangeFilterVs(defaultFilterVs);
          }}
        >
          Show All
        </Button>
      </Container>
    );
  };
  return (
    <Row style={styles.filterBodyStyle}>
      <Col sm={3}>{handleShowChangeFilter()}</Col>
      <Col sm={3}>{handleShowChangeFilterOption()}</Col>
      <Col>{handleShowFilterButton()}</Col>
      <Col>{handleShowResetFilterButton()}</Col>
    </Row>
  );
};

const MapStateToProps: ReactRedux.MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return {
    listProfessor: state.professors.data,
    listCities: state.cities.data,
    listGroups: state.groups.data,
    currentFilterVs: state.vsFilter
  };
};

const MapDispatchToProps: ReactRedux.MapDispatchToProps<
  DispatchProps,
  OwnProps
> = {
  handleChangeFilterVs: Actions.ChangeVsFilterAction
};

export default ReactRedux.connect(MapStateToProps, MapDispatchToProps)(Filter);
