import React, { Component } from "react";
import Sample from './components/Sample';
import Post from './components/Post';

export default class App extends Component {
  getServerData = () => {
    fetch("http://localhost:5000/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        console.log(typeof res);
        return res.json();
      })
      .then((res) => console.log(res));
  };
  render() {
    return (
      <div>
        <button onClick={this.getServerData}>버튼</button>
        <Post/>
        <Post/>
        <Sample/>
      </div>
    );
  }
}
