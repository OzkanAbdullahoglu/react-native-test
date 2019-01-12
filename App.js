import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import TabNavigator from './TabNavigator';

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path="/" component={TabNavigator} />
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
