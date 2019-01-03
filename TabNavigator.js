import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, Platform } from "react-native";
import { AsyncStorage, StyleSheet, View } from "react-native";
import Meteor from "./screens/Meteor";
import ReactScreen from "./screens/ReactScreen";
import Javascript from "./screens/Javascript";
import OtherLang from "./screens/OtherLang";
import Settings from "./screens/Settings";
import { Redirect, NativeRouter, Route, Link } from "react-router-native";

export default class TabNavigator extends React.Component {
  state = {
    initRouteHandler: "",
    isLoading: true
  };

  /**
   *  @description after component did mount we trig initRouteManage
   *  to get the init route and perform
   */
  componentDidMount() {
    this.initRouteManage();
  }

  /**
   *  @description we send to the store the init route
   *  @param {string} initRoute
   */
  setInitRoute = async initRoute => {
    try {
      await AsyncStorage.setItem("initRoute", initRoute);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   *  @description we get the init route from the store
   *  and return the init route
   */
  getInitRoute = async () => {
    let initialRoute = "";
    try {
      initialRoute = await AsyncStorage.getItem("initRoute");
      if (initialRoute !== "") {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.log(error.message);
    }
    return initialRoute;
  };

  /**
   *  @description we get the init route and we manipulate
   *  initRouteHandler state with this data so we will redirect that route
   */
  initRouteManage = () => {
    this.getInitRoute().then(res => {
      this.setState({ initRouteHandler: res });
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 0,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator  size="large" color="#0000ff" />
          </View>
        ) : (
          <NativeRouter>
            <View style={{ flex: 1 }}>
              <Route
                path="/javascript"
                component={() => (
                  <Javascript initialRoute={this.setInitRoute} />
                )}
              />
              <Route
                path="/meteor"
                component={() => <Meteor initialRoute={this.setInitRoute} />}
              />
              <Route
                path="/reactscreen"
                component={() => (
                  <ReactScreen initialRoute={this.setInitRoute} />
                )}
              />
              <Route
                path="/other"
                component={() => <OtherLang initialRoute={this.setInitRoute} />}
              />
              <Route
                path="/settings"
                component={() => <Settings initialRoute={this.setInitRoute} />}
              />
              <View style={styles.container}>
                {this.state.initRouteHandler === "javascript" ? (
                  <View>
                    <Redirect to="/javascript" />
                  </View>
                ) : this.state.initRouteHandler === "meteor" ? (
                  <View>
                    <Redirect to="/meteor" />
                  </View>
                ) : this.state.initRouteHandler === "reactscreen" ? (
                  <View>
                    <Redirect to="/reactscreen" />
                  </View>
                ) : this.state.initRouteHandler === "other" ? (
                  <View>
                    <Redirect to="/other" />
                  </View>
                ) : (
                  <View>
                    <Redirect to="/settings" />
                  </View>
                )}
                <Link to="/javascript">
                  <MaterialCommunityIcons
                    name="language-javascript"
                    size={60}
                    color="#f0db4f"
                  />
                </Link>
                <Link to="/meteor">
                  <MaterialCommunityIcons
                    name="meteor"
                    size={60}
                    color="#de4f4f"
                  />
                </Link>
                <Link to="/reactscreen">
                  <MaterialCommunityIcons
                    name="react"
                    size={60}
                    color="#26d9fd"
                  />
                </Link>
                <Link to="/other">
                  <Ionicons
                    name={
                      Platform.OS === "ios"
                        ? "ios-code-working"
                        : "md-code-working"
                    }
                    size={60}
                    color="purple"
                  />
                </Link>
                <Link to="/settings">
                  <Ionicons
                    name={
                      Platform.OS === "ios" ? "ios-settings" : "md-settings"
                    }
                    size={60}
                    color="#7e7a7a"
                  />
                </Link>
              </View>
            </View>
          </NativeRouter>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
    height: 30,
    paddingBottom: 20,
    flexDirection: "row",
    backgroundColor: "#fff7ee",
    justifyContent: "space-around",
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  }
});
