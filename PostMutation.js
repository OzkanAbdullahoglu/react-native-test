import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, graphql, compose } from "react-apollo";
import { Modal, View, TextInput } from "react-native";
import { Button } from "react-native-elements";

//to set up the query for post mutation
const ADD_POST = gql`
  mutation addPost($input: PostCreateInput) {
    addPost(input: $input) {
      title
      description
      createdAt
    }
  }
`;

//to set up the query for users and tags data
const Query = gql`
  {
    users {
      _id
      firstname
      lastname
      email
    }

    tags {
      _id
      name
    }
  }
`;

const AddPost = props => {
  return (
    <Mutation
      mutation={ADD_POST}
      refetchQueries={() => {
        const queryPosts = gql`
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
        `;
        return [
          {
            query: queryPosts
          }
        ];
      }}
    >
      {(addPost, { data }) => (
        <View>
          <Modal
          animationType="slide"
            transparent={true}
            visible={props.visible}
          >
            <View
              style={{
                flex: 1,
                paddingTop: 150,
                backgroundColor: "rgba(52, 52, 52, 0.8)"
              }}
            >
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  backgroundColor: "white",
                  borderWidth: 2,
                  margin: 5
                }}
                placeholder="Your Post Title"
                onChangeText={text => props.updateTitle(text)}
              />
              <TextInput
                style={{
                  height: 140,
                  borderColor: "gray",
                  backgroundColor: "white",
                  borderWidth: 2,
                  margin: 5
                }}
                multiline={true}
                numberOfLines={4}
                placeholder="Your Post Description"
                onChangeText={text => props.updateDesc(text)}
              />
              <Button
                onPress={() => {
                  addPost({
                    variables: {
                      input: {
                        title: props.inputPostTitle,
                        description: props.inputPostDesc,
                        categoryId: props.category,
                        userId:
                          props.data.users[Math.floor(Math.random() * 10)]._id,
                        tagIds:
                          props.data.tags[Math.floor(Math.random() * 3)]._id
                      }
                    }
                  });
                  props.togglePostDialog();
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

export default compose(graphql(Query))(AddPost);
