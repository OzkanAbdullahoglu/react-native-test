import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import PostList from "../CollectData";
import Client from "../Client";
import PostData from "../PostData";
import { List, ListItem } from "react-native-elements";
import { NativeRouter, Route, Link } from "react-router-native";
import PostMain from "./PostMain";

export default class ReactScreen extends React.Component {
  state = {
    name: "React",
    _id: "a3Nj2WXsF7HEAbLAo",
    route: "reactscreen",
    show: true
  };

  componentDidMount() {
    this.updateRoute(this.state.route);
  }

  updateRoute = route => {
    this.props.initialRoute(route);
  };

  updateId = postId => {
    this.setState({ _id: postId });
    this.setState({ show: false });
  };

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
