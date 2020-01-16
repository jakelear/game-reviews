import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import GameSearch from "./components/GameSearch";
import GamePage from "./components/GamePage";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import styles from "./app.scss";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <div className={styles.app}>
        <Switch>
          <Route exact path="/" component={GameSearch} />
          <Route exact path="/game/:id" component={GamePage} />
        </Switch>
      </div>
    </ApolloProvider>
  </BrowserRouter>
);

render(<App />, document.getElementById("root"));
