import {TmdbApi} from "@jodi/tmdb-typescript-api";
import * as React from 'react';

import './App.css';

import {key} from "./config/config";

class App extends React.Component {

  public api: TmdbApi | null = null;

  public state = {
    resultList: [],
    results: {},
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

    if (this.input.value.length === 0) {
      this.setState({
        resultList: [],
      })
    }

    this.api.search.multi(this.input.value).subscribe(searchResults => {
      this.setState({
        resultList: searchResults.results.map(result => {
          switch (result.media_type) {
            case('tv') : {
              return result.name;
            }
            case('movie') : {
              return result.title;
            }
            case('person') : {
              return result.name;
            }
          }
          return '';
        }),
        // results,
      });
    })
  };

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Movie App</h1>
        </header>
        <div className="App-intro">
          <form id="searchMovies" className="searchMovies" onSubmit={this.handleSubmit}>
            <label htmlFor="">Search Movies</label>
            <input
              type="search"
              id="movieSearchField"
              placeholder="Amelie"
              ref={(input) => this.input = input}
            />
          </form>
        </div>
        <pre className="api-results">
            {
              JSON.stringify(this.state.resultList, null, 2)
            }
        </pre>
      </div>
    );
  }
}

export default App;
