import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, graphql, compose } from "react-apollo";
import { Modal, View, TextInput } from "react-native";
import { Button } from "react-native-elements";

//to set up the query for comment mutation
const ADD_COMMENT = gql`
  mutation addComment($input: CommentCreateInput) {
    addComment(input: $input) {
      text
      userId
    }
  }
`;

//to set up the query for user data
const Query = gql`
  {
    users {
      _id
      firstname
      lastname
      email
    }
  }
`;

const AddComment = props => {
  return (
    <Mutation
      mutation={ADD_COMMENT}
      refetchQueries={() => {
        const queryPosts = gql`
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
        return [
          {
            query: queryPosts,
            variables: {
              filters: props.filter
            }
          }
        ];
      }}
    >
      {(addComment, { data }) => (
        <View>
          <Modal
          animationType="slide"
            transparent={true}
            visible={props.visible}
          >
            <View
              style={{
                flex: 1,
                paddingTop: 220,
                backgroundColor: "rgba(52, 52, 52, 0.8)"
              }}
            >
              <TextInput
                style={{
                  height: 150,
                  borderColor: "white",
                  borderWidth: 1,
                  backgroundColor: "white",
                  margin: 15,
                  padding: 10
                }}
                placeholder="Your Comment"
                onChangeText={text => props.updateText(text)}
              />
              <Button
                onPress={() => {
                  addComment({
                    variables: {
                      input: {
                        text: props.singleComment,
                        postId: props.postId,
                        userId:
                          props.data.users[Math.floor(Math.random() * 10)]._id
                      }
                    }
                  });
                  props.visible();
                }}
                MaterialCommunityIcons={{ name: "comment-outline" }}
                backgroundColor="#03A9F4"
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0
                }}
                title="Send"
              />
            </View>
          </Modal>
        </View>
      )}
    </Mutation>
  );
};

export default compose(graphql(Query))(AddComment);
