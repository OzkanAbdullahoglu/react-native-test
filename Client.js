import React from "react";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://fiipractic-react.cultofcoders.com/graphql",
  cache
});

export default client;
