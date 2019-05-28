import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state ={
      /*Init state with empty array so we can push data to it later*/
      messages: [],
      newMessage: ''
    }
/*References messages table in firebase*/
  this.messagesRef = this.props.firebase.database().ref('Messages');
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmitMessage = this.handleSubmitMessage.bind(this);

  }

/*Event to grab messages from firebase*/
componentDidMount(){
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

handleChange (e){
  this.setState({newMessage: e.target.value});
console.log(this.state.newMessage);
}

handleSubmitMessage(e){
  e.preventDefault();

  this.messagesRef.push({
    content: this.state.newMessage,
    username: this.props.user ? this.props.user.displayName : "Guest",
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.activeRoom.key
  });
  this.setState({newMessage:''});
}



render() {
  return(
    <div className = "message-list">
      <div>
        {this.state.messages.filter(message =>
          message.roomId == this.props.activeRoom.key).map((message, index) =>
          <div className = "single-message">
            <div className = "username-time">
              <div id = "m-username">{message.username}</div>
            </div>
            <div id = "m-content">{message.content}</div>
          </div>
          )}
      </div>
      <div>
        <form className = "send-message-form" onSubmit = {this.handleSubmitMessage}>
          <input className="message-input"
            onChange={e => this.handleChange(e)}
            value = {this.state.newMessage}
            placeholder = "Type your message and hit ENTER"
            type = "text"/>
            <input type ="submit"/>
        </form>
      </div>
    </div>
  )
}
}

export default MessageList;
