import React, { Component } from "react";
import gql from "graphql-tag";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons
} from "@expo/vector-icons";
import { View, ScrollView, Platform } from "react-native";
import { graphql } from "react-apollo";
import { ListItem, Card, Text, Button, Icon } from "react-native-elements";
import Client from "./Client";
import ModalForComments from "./screens/ModalForComments";
import AddComment from "./CommentMutation";

const QueryPosts = gql`
  query getPosts($filters: JSON, $options: JSON) {
    posts(filters: $filters, options: $options) {
      _id
      categoryId
      userId
      title
      description
      createdAt
      user {
        _id
        firstname
        lastname
        email
      }
      category {
        _id
        name
      }
      tags {
        _id
        name
      }
      comments {
        user {
          firstname
          lastname
          email
        }
        text
        createdAt
      }
    }
  }
`;

class PostData extends Component {
  state = {
    comments: [],
    data: [],
    loading: false,
    modalVisible: false,
    toggleComModal: false,
    noComment: false,
    singleComment: null,
    trig: false
  };

  componentDidUpdate(prevProps, item) {
    if (this.props.data !== prevProps.data) {
      this.reset();
      this.dataUpdate();
    }
  }

  componentDidMount() {
    if (this.props.data.loading === false) {
      this.dataUpdate();
    }
  }

  updateText = text => {
    this.setState({ singleComment: text });
    this.setState({ noComment: false });
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  reset = () => {
    this.setState({ data: [] });
    this.setState({ comments: [] });
  };

  showProps = obj => {
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        return obj[i];
      }
    }
  };

  dataUpdate = () => {
    let obj = this.props.data.posts.map(e => e.comments);
    this.props.data.posts.map(e =>
      this.setState(state => ({
        data: state.data.concat(e)
      }))
    );
    if (this.showProps(obj) === null) {
      this.setState({ noComment: true });
    } else {
      this.setState({ noComment: false });
      this.props.data.posts.map(e =>
        e.comments.map(k =>
          this.setState(state => ({
            comments: state.comments.concat(k)
          }))
        )
      );
    }
  };

  toggleComModal = () => {
    this.setState({ toggleComModal: !this.state.toggleComModal });
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        {this.state.data.map((e, i) => (
          <View
            key={i}
            style={{ flex: 0.65, height: "100%", paddingBottom: 25 }}
          >
            <Card containerStyle={{ height: "100%" }} key={i} title={e.title}>
              <Text key={i} style={{ marginBottom: 5 }}>
                {e.description}
              </Text>
              <Text key={i + 1} style={{ marginBottom: 5 }}>
                {`Comment Date : ${e.createdAt}`}
              </Text>
              <Text key={i + 2} style={{ marginBottom: 5 }}>
                {`User Name : ${e.user.firstname} ${e.user.lastname}`}
              </Text>
              <Text key={i + 3} style={{ marginBottom: 5 }}>
                {`User email : ${e.user.email}`}
              </Text>
              <View>
                <View>
                  <Icon
                    reverse
                    onPress={() => {
                      this.toggleComModal();
                    }}
                    type="font-awesome"
                    name="comment-o"
                    color="#5388d0"
                    containerStyle={{
                      alignSelf: "center"
                    }}
                  />
                </View>
                <View style={{ bottom: 40, width: 100 }}>
                  <Ionicons
                    name={
                      Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"
                    }
                    size={40}
                    color="purple"
                    onPress={this.props.toggleSinglePost}
                  />
                </View>
              </View>
              {this.state.toggleComModal && (
                <View style={{ flex: 1 }}>
                  <AddComment
                    singleComment={this.state.singleComment}
                    updateText={this.updateText}
                    toggleComDialog={this.toggleComDialog}
                    postId={this.props.filter._id}
                    visible={this.toggleComModal}
                    trig={this.props.trig}
                    dataUpdate={this.dataUpdate}
                    filter={this.props.filter}
                  />
                </View>
              )}
            </Card>
          </View>
        ))}
        <View style={{ flex: 0.35 }}>
          <ScrollView>
            <Card
              containerStyle={{ padding: 5, marginTop: 20, height: "100%" }}
              title="Comments"
            >
              {!this.state.noComment ? (
                this.state.comments.map((c, k) => (
                  <View key={k}>
                    <ListItem
                      key={k}
                      onPress={() => this.setState({ modalVisible: true })}
                      title={c.text}
                      subtitle={c.createdAt}
                    />
                    <ModalForComments
                      key={c.createdAt}
                      visible={this.state.modalVisible}
                      comments={this.state.comments}
                      filter={c.createdAt}
                      setModalVisible={this.setModalVisible}
                    />
                  </View>
                ))
              ) : (
                <View style={{ flex: 1 }}>
                  <Text>No comments yet to display !</Text>
                </View>
              )}
            </Card>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default graphql(QueryPosts, {
  options: props => ({
    variables: {
      filters: props.filter
    }
  })
})(PostData);
