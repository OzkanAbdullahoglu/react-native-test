import React from 'react';
import { NativeRouter } from 'react-router-native';
import { View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import Client from '../Client';
import PostData from '../PostData';


export default class PostMain extends React.Component {

  /**
   *  @description we use post_id to filter single post
   */
  filterSinglePost = () => ({ _id: this.props.filters });

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
