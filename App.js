import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import TabNavigator from "./TabNavigator";
import Meteor from "./screens/Meteor";
import ReactScreen from "./screens/ReactScreen";
import Javascript from "./screens/Javascript";
import OtherLang from "./screens/OtherLang";
import Settings from "./screens/Settings";

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/" component={TabNavigator} />
            <Route exact path="/screens/ReactScreen" component={Javascript} />
            <Route exact path="/screens/Meteor" component={Meteor} />
            <Route exact path="/screens/Javascript" component={ReactScreen} />
            <Route exact path="/screens/OtherLang" component={OtherLang} />
            <Route exact path="/screens/Settings" component={Settings} />
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
