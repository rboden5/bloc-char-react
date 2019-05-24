import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/user.js';

var config = {
  apiKey: "AIzaSyCsguLLm5AlXcEPYD-_5B1b5N_KsZq0Q40",
  authDomain: "bloc-chat-react-3a4fb.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-3a4fb.firebaseio.com",
  projectId: "bloc-chat-react-3a4fb",
  storageBucket: "bloc-chat-react-3a4fb.appspot.com",
  messagingSenderId: "536533688821"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: null,
      user: null,
    };

    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  handleRoomChange(e){
    this.setState({activeRoom: e});
  }

  setUser(user){
    this.setState({user: user});
    console.log(user);
  }

  render() {
     return (
       <div className="App">
         <header className="App-header">
           <h1>Bloc Chat</h1>
         </header>
         <main>
           <section className ="chat-wrapper">
           <div className = "left-wrapper">
              <div className="User-Name">
                <User
                  firebase = {firebase}
                  user = {this.state.user}
                  setUser = {(user) => this.setUser(user)}
                />
              </div>
             <div className="Room-List">
             <RoomList
               firebase={firebase}
               activeRoom = { this.state.activeRoom }
               /*Passes function as prop to RoomList component*/
               handleRoomChange = {(e) => this.handleRoomChange(e)}
             />
             </div>
             <div className="Message-List">
               <h2>{this.state.activeRoom ? this.state.activeRoom.name : 'Pick a room!'}</h2>
               {this.state.activeRoom && (
               <MessageList
                 firebase = {firebase}
                 activeRoom = {this.state.activeRoom}
               />
             )}
             </div>
             </div>
           </section>
         </main>
       </div>
     );
   }
 }

 export default App;
