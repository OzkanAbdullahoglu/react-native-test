import React, { Component } from 'react';
import gql from 'graphql-tag';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { graphql } from 'react-apollo';
import { ListItem, SearchBar, Button } from 'react-native-elements';
import escapeRegExp from 'escape-string-regexp';
import AddPost from './PostMutation';


class PostList extends Component {
  state = {
    //to hold categories of languages
    categories: [],
    //seach query will be used in search bar
    searchQuery: '',
    //to store ca''goryId
    categoryId: null,
    //to hold all data from GraphQL
    data: [],
    //to seperate posts from data
    currIndex: 0,
    //to check loading process status
    loading: false,
    //to check If add post is activated
    openPostBox: false,
    //to take input as a post title
    inputPostTitle: null,
    //to take input as a post description
    inputPostDesc: null
  };

  /**
   *  @description after component did mount we reset the data
   *  and make a remote request to the GraphQL
   */
  componentDidMount() {
    this.reset();
    this.makeRemoteRequest();
  }

  /**
   *  @description after component did update we reset the data
   *  and make a remote request to the GraphQL
   */
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.reset();
      this.makeRemoteRequest();
    }
  }

  /**
   *  @description to update post title
   *  @param {string} title
   */
  updateTitle = title => {
    this.setState({ inputPostTitle: title });
  };

  /**
   *  @description to update post description
   *  @param {string} desc
   */
  updateDesc = desc => {
    this.setState({ inputPostDesc: desc });
  };

  /**
   *  @description to toggle add post input box
   */
  togglePostDialog = () => {
    this.setState({ openPostBox: !this.state.openPostBox });
  };

  /**
   *  @description to reset data array
   */
  reset = () => {
    this.setState({ data: [] });
  };

  /**
   *  @description to update search query and to trig search
   *  @param {string} text
   */
  filterHandler = text => {
    this.setState({ searchQuery: text });
    this.filterUpToSearch();
  };

  /**
   *  @description to update data with the current language's posts
   */
  dataUpdate = () => {
    this.props.data.postCategories[this.state.currIndex].posts.map(e =>
      this.setState(state => ({
        data: state.data.concat(e)
      }))
    );
  };

  /**
   *  @description to perform remote request to the GraphQL
   *  @param {string} title
   */
  makeRemoteRequest = () => {
    if (this.props.data.loading) {
      this.setState({ loading: true });
    } else {
      this.setState({ loading: false });
      this.props.data.postCategories.map(object =>
        this.setState(state => ({
          categories: state.categories.concat(object)
        }))
      );
      this.props.data.postCategories.map((element, index) => {
        if (element.name === this.props.name) {
          this.setState({ categoryId: element._id });
          this.setState({ currIndex: index }, () => {
            this.dataUpdate();
          });
        }
      });
    }
  };

  /**
   *  @description to perform a dynamic search up to the searchQuery
   */
  filterUpToSearch = () => {
    let filteredData;
    if (this.state.searchQuery) {
      const match = new RegExp(escapeRegExp(this.state.searchQuery), 'i');
      filteredData = this.state.data.filter(filterOut =>
        match.test(filterOut.title)
      );
    } else {
      filteredData = this.state.data;
    }
    return filteredData;
  };


    /**
     *  @description to trig ActivityIndicator If loading status is true
     */
    renderFooter = () => this.props.data.loading ? (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderBottomWidth: 0,
            borderColor: '#CED0CE'
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null;

  /**
   *  @description to render search bar at the top of FlatList
   */
  renderHeader = () => (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.filterHandler(text)}
      />
    );

  render() {
    return (
      <View>
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={this.renderHeader}
            data={this.filterUpToSearch()}
            renderItem={({ item }) => (
              <View>
                <TouchableHighlight>
                  <ListItem
                    title={item.title}
                    subtitle={item.description}
                    variables={item._id}
                    onPress={() => {
                      this.props.filters(item._id);
                    }}
                  />
                </TouchableHighlight>
              </View>
            )}
            ListFooterComponent={this.renderFooter}
            keyExtractor={item => item._id}
          />
        </View>
        <View style={styles.box}>
          <View>
            <Button
              onPress={() => {
                this.togglePostDialog();
              }}
              MaterialCommunityIcons={{ name: 'comment-outline' }}
              backgroundColor='#03A9F4'
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              title="Add Post"
            />
          </View>
          {this.state.openPostBox && (
            <View>
              <AddPost
                updateTitle={this.updateTitle}
                updateDesc={this.updateDesc}
                togglePostDialog={this.togglePostDialog}
                inputPostTitle={this.state.inputPostTitle}
                inputPostDesc={this.state.inputPostDesc}
                category={this.state.categoryId}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

//we are seting up query to communicate with GraphQL API
export default graphql(gql`
  {
    postCategories {
      _id
      name
      posts {
        _id
        title
        description
        userId
      }
    }
  }
`)(PostList);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60,
    backgroundColor: '#f0efef'
  },
  box: {
    position: 'absolute',
    bottom: 0,
    width: 300,
    height: 50,
    paddingBottom: 10,
    alignSelf: 'center'
  }
});
