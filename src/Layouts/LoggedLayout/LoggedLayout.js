import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import "./LoggedLayout.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes";

export default function LoggedLayout(props) {
  const { user } = props;
  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <h2>menu left</h2>
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <h2>top bar</h2>
            <Routes />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <h2>player</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
}
