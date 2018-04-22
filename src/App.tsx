import { TmdbApi } from "@jodi/tmdb-typescript-api";
import * as React from 'react';

import './App.css';

import {key} from "./config/config";

class App extends React.Component {

  public api: TmdbApi | null = null;

  public state = {
    movies: {}
  };

  public input: HTMLInputElement | null = null;

  public componentDidMount() {
    this.api = new TmdbApi(key);
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormControlsCollection>) => {
    event.preventDefault();
    if (this.api === null || this.input === null) {
      return;
    }
    this.api.search.movies(this.input.value).subscribe(movies => {
      this.setState({movies});
    })
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Movie App</h1>
        </header>
        <p className="App-intro">
          <form id="searchMovies" className="searchMovies" onSubmit={this.handleSubmit}>
            <label htmlFor="">Search Movies</label>
            <input
              type="search"
              id="movieSearchField"
              placeholder="Amelie"
              ref={(input) => this.input = input}
            />
          </form>
        </p>
        <pre className="api-results">
            {
              JSON.stringify(this.state.movies, null, 2)
            }
        </pre>
      </div>
    );
  }
}

export default App;
