import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';

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
    super()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Bloc Chat</h1>
        </header>
        <main>
          <div>
          <RoomList firebase={firebase}/>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
