import React from 'react';
import { Modal, View } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';

export default class ModalForComments extends React.Component {
  state = {
    //to hold the single comment data
    commentData: [],
    //to hold user data in comments
    userData: []
    };

    /**
     *  @description after component did update we reset the data
     *  and filter the single comment data from the props
     */
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.reset();
      this.updateCommentData();
    }
  }

  /**
   *  @description reset the data by manipulating the commentData state
   */
  reset = () => {
    this.setState({ commentData: [] });
  };

  /**
   *  @description we are filtering the comment's data from props
   */
  updateCommentData = () => {
    const commentObj = this.props.comments.filter(
      c => c.createdAt === this.props.filter
    );
    commentObj.map(e =>
      this.setState(state => ({
        commentData: state.commentData.concat(e)
      }))
    );
  };

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          transparent
          visible={this.props.visible}
        >
          <View
            style={{
              flex: 1,
              paddingTop: 220,
              backgroundColor: 'rgba(52, 52, 52, 0.8)'
            }}
          >
            <View>
              <Card style={{ flex: 1 }}>
                {this.state.commentData.map((c, k) => (
                  <View key={k}>
                    <Text style={{ marginBottom: 10, fontSize: 15 }} key={k}>
                      {c.text}
                    </Text>
                    <Text key={k + 1}>{`Comment Date : ${c.createdAt}`}</Text>
                    <Text key={k + 2}>{`User email : ${c.user.email}`}</Text>
                    <Text key={k + 3}>
                      {`User Name : ${c.user.firstname} ${c.user.lastname}`}
                    </Text>
                  </View>
                ))}
                <Button
                  MaterialCommunityIcons={{ name: 'comment-outline' }}
                  backgroundColor='#03A9F4'
                  buttonStyle={{
                    borderRadius: 0,
                    marginTop: 15,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0
                  }}
                  onPress={() => {
                    this.props.setModalVisible(!this.props.visible);
                  }}
                  title="Close"
                />
              </Card>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
