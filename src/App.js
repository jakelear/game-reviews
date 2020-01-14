import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import GamesList from "./components/gameSearch.jsx";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <GamesList />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
