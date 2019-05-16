import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state ={
      /*Init state with empty array so we can push data to it later*/
      messages: []
    }
/*References messages table in firebase*/
  this.messagesRef = this.props.firebase.database().ref('Messages');
  }

/*Event to grab messages from firebase*/
componentDidMount(){
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

render() {
  return(
    <div className = "message-list">
      <div>
      {this.state.messages.filter(message =>
        message.roomId == this.props.activeRoom.key).map((message, index) =>
        <p>{message.content}{"  "}
        {message.sentAt}{"  "}
        {message.username}</p>)}
      </div>
    </div>
  )
}
}

export default MessageList;
