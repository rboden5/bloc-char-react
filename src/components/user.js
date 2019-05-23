import React, { Component } from 'react';


class User extends Component {
constructor(props){
  super(props);

  this.signIn = this.signIn.bind(this);
  this.signOut = this.signOut.bind(this);
  }

componentDidMount(){
  this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
  });
}

signIn(e){
    e.preventDefault();
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
}

signOut(e){
  this.props.firebase.auth().signOut();
}

  render () {
    return (
      <div className = "user-wrapper">
        <div className = "user-label"> {this.props.user ? this.props.user.displayName : "Guest" }</div>
        <div className = "signIn-signOut-button">
          {this.props.user ? <button className="Sign Out" onClick={e =>this.signOut(e)}>Sign Out</button>:
          <button className="Sign In" onClick={e => this.signIn(e)}>Sign In with Google</button>
          }
        </div>
    </div>
    )
  }
}

export default User;
