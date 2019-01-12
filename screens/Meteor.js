import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-elements';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from 'react-apollo';
import PostList from '../CollectData';
import Client from '../Client';

import PostMain from './PostMain';

export default class Meteor extends React.Component {
  state = {
    name: 'Meteor',
    route: 'meteor',
    _id: 'a3Nj2WXsF7HEAbLAo',
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
    const { show, name, _id } = this.state;
    return (
      <NativeRouter>
        <View style={{ flex: 6 }}>
          {show ? (
            <List>
              <ApolloProvider client={Client}>
                <PostList name={name} filters={this.updateId} />
              </ApolloProvider>
            </List>
          ) : (
            <PostMain
              filters={_id}
              toggleSinglePost={this.toggleSinglePost}
            />
          )}
        </View>
      </NativeRouter>
    );
  }
}
