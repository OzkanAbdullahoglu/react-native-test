import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import TabNavigator from "./TabNavigator";

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/" component={TabNavigator} />
          </Switch>
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
