import * as React from "react";
import { Card } from "react-bootstrap";
import * as styles from "../components/stylesComponent";
import { RootReducerState } from "../reducers/rootReducer";
import * as ReactRedux from "react-redux";
export interface OwnProps {}
export interface StateProps {
  error: boolean;
}
export interface DispatchProps {}
type HomeProps = OwnProps & StateProps & DispatchProps;

const Home: React.SFC<HomeProps> = ({ error }) => {
  return (
    <Card style={styles.homeCardBodyStyle}>
      <Card.Body>
        <Card.Title>
          Application for the administration of students{" "}
          {error ? "<<CONNECTION FAIL>>" : ""}
        </Card.Title>
        <Card.Text>
          Download 'db.json' file from source code. Install json-server (
          <Card.Link href="https://www.npmjs.com/package/json-server">
            https://www.npmjs.com/package/json-server
          </Card.Link>
          ) and write 'json-server --watch db.json --port 3001' for running
          json-server.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const MapStateToProps: ReactRedux.MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return {
    error: state.error
  };
};

const MapDispatchToProps: ReactRedux.MapDispatchToProps<
  DispatchProps,
  OwnProps
> = {};

export default ReactRedux.connect(MapStateToProps, MapDispatchToProps)(Home);
