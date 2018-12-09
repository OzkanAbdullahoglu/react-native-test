import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import TabNavigator from "./TabNavigator";
import Meteor from "./Meteor";
import ReactScreen from "./ReactScreen";
import Javascript from "./Javascript";
import OtherLang from "./OtherLang";
import Settings from "./Settings";

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
      <View style={styles.container}>
        <Switch>
          <Route exact path="/" component = {TabNavigator} />
          <Route path ="/javascript" component = {Javascript} />
          <Route path ="/meteor" component = {Meteor} />
          <Route path ="/reactscreen" component = {ReactScreen} />
          <Route path ="/other" component = {OtherLang} />
          <Route path ="/settings" component = {Settings} />


        </Switch>
      </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
