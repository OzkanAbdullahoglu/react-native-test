import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { List, ListItem } from "react-native-elements";

export default class Settings extends React.Component {
  state = {
    name: "Settings",
    route: "settings"
  };

  componentDidMount() {
    this.updateRoute(this.state.route);
  }

  updateRoute = route => {
    this.props.initialRoute(route);
  };

  render() {
    return (
      <View style={{ flex: 6, top: 100, alignItems: "center" }}>
        <Text>Under construction</Text>
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
