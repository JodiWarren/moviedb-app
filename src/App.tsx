import { TmdbApi } from "@jodi/tmdb-typescript-api";
import * as React from 'react';

import './App.css';
import logo from './logo.svg';

import {key} from "./config/config";

class App extends React.Component {

  public state = {
    movies: {}
  };

  public componentDidMount() {
    const api = new TmdbApi(key);
    api.search.movies('america').subscribe(movies => {
      this.setState({movies})
    });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and saaave to reload.
          <pre>
            {
              JSON.stringify(this.state.movies, null, 2)
            }
          </pre>
        </p>
      </div>
    );
  }
}

export default App;
