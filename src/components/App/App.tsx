import { ConfigurationResult, TmdbApi } from "@jodi/tmdb-typescript-api";
import * as React from "react";

import "./App.css";

import { key } from "../../config/config";
import {
  SearchFormResults,
  SearchResultsTypes
} from "../../types/SearchResults.types";
import { Search } from "../Search/Search";
import { AppHeader } from "./AppHeader";
import { getConfig } from "./services/getConfig";
import { makeSearch } from "./services/makeSearch";

interface IAppState {
  api: TmdbApi | null;
  loading: boolean;
  searchResults: SearchFormResults | null;
  searchType: SearchResultsTypes;
  config: ConfigurationResult | undefined;
  searchTerm: string;
}

class App extends React.Component<object, IAppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      api: new TmdbApi(key),
      config: undefined,
      loading: false,
      searchResults: null,
      searchTerm: "",
      searchType: "multi"
    };
  }

  public componentDidMount() {
    getConfig(this.state.api, this.setConfig);
  }

  public setLoading = (loading: boolean) => {
    this.setState({ loading });
  };

  public startLoading = () => this.setLoading(true);
  public stopLoading = () => this.setLoading(false);

  public receiveResults = (searchResults: SearchFormResults) => {
    this.setState({ searchResults });
  };

  public requestSearch = (
    term: string,
    type: SearchResultsTypes = this.state.searchType,
    page: number | undefined = undefined
  ) => {
    this.setState({ searchTerm: term });
    makeSearch(
      this.state.api,
      term,
      this.receiveResults,
      this.startLoading,
      this.stopLoading,
      type,
      page
    );
  };

  public moveSearchPage = (page: number = 1) => {
    const { searchTerm, searchType } = this.state;
    this.requestSearch(searchTerm, searchType, page);
  };

  public setType = (searchType: SearchResultsTypes) => {
    this.setState({ searchType });
  };

  public setConfig = (config: ConfigurationResult) => {
    this.setState({ config });
  };

  public render() {
    const { api, searchResults, searchType, config } = this.state;
    return (
      <div className="App">
        <AppHeader />
        <main>
          {api &&
            config && (
              <Search
                moveSearchPage={this.moveSearchPage}
                searchResults={searchResults}
                requestSearch={this.requestSearch}
                setType={this.setType}
                searchType={searchType}
                apiConfig={config}
              />
            )}
        </main>
      </div>
    );
  }
}

export default App;
