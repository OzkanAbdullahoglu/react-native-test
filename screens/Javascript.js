import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import CollectData from "../CollectData";
import { List, ListItem } from "react-native-elements";

const client = new ApolloClient({
  uri: "http://fiipractic-react.cultofcoders.com/graphql"
});

export default class Javascript extends React.Component {
  state = {
    name: "JavaScript"
  };

  render() {
    return (
      <List>
        <ApolloProvider client={client}>
          <CollectData name={this.state.name} />
        </ApolloProvider>
      </List>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 370,
    height: 50,
    left: 5,
    position: "absolute",
    top: 500,
    bottom: 0,
    backgroundColor: "#f8f8f8",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  }
});
