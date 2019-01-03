import React from "react";
import { StyleSheet, View } from "react-native";
import { ApolloProvider } from "react-apollo";
import PostList from "../CollectData";
import Client from "../Client";
import { List } from "react-native-elements";
import { NativeRouter } from "react-router-native";
import PostMain from "./PostMain";

export default class Meteor extends React.Component {
  state = {
    name: "Meteor",
    route: "meteor",
    _id: "a3Nj2WXsF7HEAbLAo",
    show: true
  };

  /**
   *  @description after component did mount we trig updateRoute
   *  to set the init route as javascript
   */
  componentDidMount() {
    this.updateRoute(this.state.route);
  }

  /**
   *  @description we are seting initial route
   *  @param {string} route
   */
  updateRoute = route => {
    this.props.initialRoute(route);
  };

  /**
   *  @description we are updating postId to pass It as a prop to the PostMain Component
   *  @param {string} postId
   */
  updateId = postId => {
    this.setState({ _id: postId });
    this.setState({ show: false });
  };

  /**
   *  @description we are manipulating state.show so we decide to show main screen
   *  or single post screen (PostMain)
   */
  toggleSinglePost = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <NativeRouter>
        <View style={{ flex: 6 }}>
          {this.state.show ? (
            <List>
              <ApolloProvider client={Client}>
                <PostList name={this.state.name} filters={this.updateId} />
              </ApolloProvider>
            </List>
          ) : (
            <PostMain
              filters={this.state._id}
              toggleSinglePost={this.toggleSinglePost}
            />
          )}
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
