import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allDates: []
    };
  }
  componentDidMount() {
    console.log("component mounted!");
    this.getDates();
  }
  getDates() {
    return fetch("http://172.16.1.154:8080/data")
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then(json => {
        console.log("Retrieved items:");
        console.log(json);
        this.setState({ allDates: [...json] });
      })
      .catch(error => {
        console.log(Error, error);
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>All dates</p>
          <ul>
            {this.state.allDates.map(item => (
              <li key={item._id}>{item.date}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
