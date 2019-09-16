import React, { Component } from 'react';
import './App.css';
import Game from './components/game';
import Loader from './components/loader';
import Menu from './components/menu';

class App extends Component {

  state = {
    isPlaying: false
  }

  setPlaying = () => {
    this.setState({isPlaying:true});
  }

  render() {
    return (
      <div className="App">
      <Loader />
      <Menu setPlaying = {this.setPlaying} />
      <Game isPlaying = {this.state.isPlaying}/>
      </div>
    );
  }
}

export default App;
