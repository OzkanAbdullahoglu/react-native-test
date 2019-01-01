import React, { Component } from "react";
import gql from "graphql-tag";
import { View } from "react-native";
import { ApolloProvider } from "react-apollo";
import Client from "../Client";
import PostData from "../PostData";
import { NativeRouter } from "react-router-native";

export default class PostMain extends React.Component {
  state = {
    _id: "a3Nj2WXsF7HEAbLAo"
  };

  filterSinglePost = () => {
    return { _id: this.props.filters };
  };

  render() {
    return (
      <NativeRouter>
        <View style={{ flex: 6 }}>
          <ApolloProvider client={Client}>
            <PostData
              filter={this.filterSinglePost()}
              toggleSinglePost={this.props.toggleSinglePost}
            />
          </ApolloProvider>
        </View>
      </NativeRouter>
    );
  }
}
