import React, { Component } from "react";
import gql from "graphql-tag";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { graphql, ApolloProvider } from "react-apollo";
import {
  List,
  ListItem,
  SearchBar,
  ActivityIndicator
} from "react-native-elements";

class FlatListDemo extends Component {
  state = {
    categories: [],
    data: [],
    name: "Javascript",
    currIndex: 0,
    page: 1,
    seed: 1,
    error: null,
    refreshing: false,
    loading: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.makeRemoteRequest();
    }
    if (this.props.name !== prevProps.name) {
      console.log(prevProps.name);
      console.log("truefor");
      this.deneme();
    } else {
      console.log("yok");
    }
  }

  componentWillUpdate(nextProps) {
    console.log(this.state.currIndex);
  }

  componentWillUnmount() {
    console.log(this.state.currIndex);
  }

  componentWillMount() {
    console.log(this.state.currIndex);
  }

  componentWillReceiveProps() {
    console.log(this.state.currIndex);
  }

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderBottomWidth: 0,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  makeRemoteRequest = () => {
    if (this.props.data.loading) {
      this.setState({ loading: true });
    } else {
      this.setState({ loading: true });
      this.props.data.postCategories.map(object =>
        this.setState(state => ({
          categories: state.categories.concat(object)
        }))
      );

      this.props.data.postCategories.map((element, index) => {
        console.log(this.props.name);
        if (element.name === this.props.name) {
          this.setState({ currIndex: index });
          console.log(this.state.currIndex);
        }
      });

      this.props.data.postCategories[this.state.currIndex].posts.map(e =>
        this.setState(state => ({
          data: state.data.concat(e)
        }))
      );
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem title={item.title} subtitle={item.description} />
        )}
        containerStyle={{ borderBottomWidth: 0 }}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

export default graphql(gql`
  {
    postCategories {
      _id
      name
      posts {
        title
        description
        userId
      }
    }
  }
`)(FlatListDemo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 1,
    position: "relative",
    backgroundColor: "#fff"
  },
  title: {
    width: 100,
    height: 100,
    shadowOpacity: 0.2,
    shadowColor: "#000",
    color: "blue",
    fontWeight: "bold"
  }
});
