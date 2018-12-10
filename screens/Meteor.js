import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import CollectData from "../CollectData";
import { List, ListItem } from "react-native-elements";

const client = new ApolloClient({
  uri: "http://fiipractic-react.cultofcoders.com/graphql"
});

export default class Meteor extends React.Component {
  state = {
    name: "Meteor"
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <List>
          <ApolloProvider client={client}>
            <CollectData name={this.state.name} />
          </ApolloProvider>
        </List>
      </View>
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
