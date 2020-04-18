import * as React from "react";
import { Card } from "react-bootstrap";
import * as styles from "../components/stylesComponent";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  return (
    <Card style={styles.homeCardBodyStyle}>
      <Card.Body>
        <Card.Title>Application for the administration of students</Card.Title>
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

export default Home;
