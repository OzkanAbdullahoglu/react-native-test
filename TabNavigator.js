import React from "react";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { Platform } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import CollectData from "./CollectData";
import Meteor from "./screens/Meteor";
import ReactScreen from "./screens/ReactScreen";
import Javascript from "./screens/Javascript";
import OtherLang from "./screens/OtherLang";
import Settings from "./screens/Settings";
import { List, ListItem } from "react-native-elements";
import { NativeRouter, Route, Link } from "react-router-native";

const client = new ApolloClient({
  uri: "http://fiipractic-react.cultofcoders.com/graphql"
});

export default class TabNavigator extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={{ flex: 1 }}>
          <List>
            <ApolloProvider client={client}>
              <CollectData />
            </ApolloProvider>
          </List>
          <View style={styles.container}>
            <Link to="/screens/javascript">
              <MaterialCommunityIcons
                name="language-javascript"
                size={32}
                color="blue"
              />
            </Link>
            <Link to="/screens/meteor">
              <MaterialCommunityIcons name="meteor" size={32} color="orange" />
            </Link>
            <Link to="/screens/ReactScreen">
              <MaterialCommunityIcons name="react" size={32} color="blue" />
            </Link>
            <Link to="/screens/other">
              <Ionicons
                name={
                  Platform.OS === "ios" ? "ios-code-working" : "md-code-working"
                }
                size={32}
                color="purple"
              />
            </Link>
            <Link to="/screens/settings">
              <Ionicons
                name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
                size={32}
                color="lightgray"
              />
            </Link>
          </View>
          <Route path="/screens/javascript" component={Javascript} />
          <Route path="/screens/meteor" component={Meteor} />
          <Route path="/screens/reactscreen" component={ReactScreen} />
          <Route path="/screens/other" component={OtherLang} />
          <Route path="/screens/settings" component={Settings} />
        </View>
      </NativeRouter>
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
