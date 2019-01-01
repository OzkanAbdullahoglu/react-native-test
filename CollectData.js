import React, { Component } from "react";
import gql from "graphql-tag";
import PostMain from "./screens/PostMain";
import AddPost from "./PostMutation";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Text,
  ActivityIndicator
} from "react-native";
import { graphql } from "react-apollo";
import { ListItem, SearchBar, Button } from "react-native-elements";
import { Route, Link } from "react-router-native";
import escapeRegExp from "escape-string-regexp";

class PostList extends Component {
  state = {
    categories: [],
    searchQuery: "",
    categoryId: null,
    data: [],
    currIndex: 0,
    loading: false,
    openPostBox: false,
    inputPostTitle: null,
    inputPostDesc: null
  };

  componentDidMount() {
    this.reset();
    this.makeRemoteRequest();
  }

  componentDidUpdate(prevProps, item) {
    if (this.props.data !== prevProps.data) {
      this.reset();
      this.makeRemoteRequest();
    }
  }

  updateTitle = title => {
    this.setState({ inputPostTitle: title });
  };

  updateDesc = desc => {
    this.setState({ inputPostDesc: desc });
  };

  togglePostDialog = () => {
    this.setState({ openPostBox: !this.state.openPostBox });
  };

  reset = () => {
    this.setState({ data: [] });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.filterHandler(text)}
      />
    );
  };

  filterHandler = text => {
    this.setState({ searchQuery: text });
    this.filterUpToSearch();
  };

  renderFooter = () => {
    return this.props.data.loading ? (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderBottomWidth: 0,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating="true" size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  dataUpdate = () => {
    this.props.data.postCategories[this.state.currIndex].posts.map(e =>
      this.setState(state => ({
        data: state.data.concat(e)
      }))
    );
  };

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

  filterUpToSearch = () => {
    let filteredData;
    if (this.state.searchQuery) {
      let match = new RegExp(escapeRegExp(this.state.searchQuery), "i");
      filteredData = this.state.data.filter(filterOut =>
        match.test(filterOut.title)
      );
    } else {
      filteredData = this.state.data;
    }
    return filteredData;
  };

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
              MaterialCommunityIcons={{ name: "comment-outline" }}
              backgroundColor="#03A9F4"
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
    backgroundColor: "#f0efef"
  },
  box: {
    position: "absolute",
    bottom: 0,
    width: 300,
    height: 50,
    paddingBottom: 10,
    alignSelf: "center"
  }
});
