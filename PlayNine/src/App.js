import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


/*class Button extends React.Component{
  state = {counter:0};
  render(){
    return (
<button onClick={() => {
          this.setState((prevState) => ({ counter: prevState.counter + 1}))}} >{this.state.counter}</button>
    );
  }
}*/


class Button extends React.Component {

  onClickHandler = () => {
    this.props.onClickFunction(this.props.incrementValue);
  }
  render() {
    return (
      <button onClick={this.onClickHandler} >+{this.props.incrementValue}</button>
    );
  }
}

const Result = (props) => {
  return (
    <div>{props.counter}</div>
  )
};

class App extends Component {  state = { counter: 0 };

  incrementCounter = (incrementValue) => {
    this.setState((prevState) => ({ counter: prevState.counter + incrementValue }));
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Button onClickFunction={this.incrementCounter} incrementValue={1} />
        <Button onClickFunction={this.incrementCounter} incrementValue={1} />
        <Button onClickFunction={this.incrementCounter} incrementValue={2} />
        <Button onClickFunction={this.incrementCounter} incrementValue={3} />
        <Button onClickFunction={this.incrementCounter} incrementValue={5} />
        <Button onClickFunction={this.incrementCounter} incrementValue={8} />
        <Button onClickFunction={this.incrementCounter} incrementValue={13} />
        <Result counter={this.state.counter} />
      </div>
    );
  }
}

export default App;
