import {
  ConfigurationResult,
  Movie,
  Person,
  TvShow
} from "@jodi/tmdb-typescript-api";
import * as React from "react";

import {
  SearchFormResults,
  SearchResultsTypes
} from "../../types/SearchResults.types";

import { MovieOverview } from "./SearchResults/MovieOverview";
import { PersonOverview } from "./SearchResults/PersonOverview";
import { TvShowOverview } from "./SearchResults/TvShowOverview";

import { ResultsPagination } from "./ResultsPagination";
import { SearchForm } from "./SearchForm/SearchForm";
import { IPagination, SearchResults } from "./SearchResults/SearchResults";
import { GetImageUrl } from "./utils/GetImageUrl";
// import { SearchFormComponent } from "./SearchForm/SearchForm.component";

export interface ISearchPageProps {
  moveSearchPage: (page: number) => void;
  searchResults: SearchFormResults | null;
  searchType: SearchResultsTypes;
  requestSearch: (
    term: string,
    type?: SearchResultsTypes,
    page?: number
  ) => void;
  setType: (searchType: SearchResultsTypes) => void;
  apiConfig: ConfigurationResult;
}

export class Search extends React.Component<ISearchPageProps> {
  public buildImageUrl = new GetImageUrl(this.props.apiConfig);

  public startSearch = (value: string) => {
    this.props.requestSearch(value);
  };

  public setType = (value: SearchResultsTypes) => {
    this.props.setType(value as SearchResultsTypes);
  };

  public prevPage = () => {
    const { searchResults, moveSearchPage } = this.props;
    if (!searchResults) {
      return;
    }
    if (searchResults.page > 1) {
      moveSearchPage(Number(searchResults.page) - 1);
    }
  };

  public nextPage = () => {
    const { searchResults, moveSearchPage } = this.props;
    if (!searchResults) {
      return;
    }
    if (searchResults.page < searchResults.total_pages) {
      moveSearchPage(Number(searchResults.page) + 1);
    }
  };

  public renderMovie = (movie: Movie) => (
    <MovieOverview
      key={movie.id}
      data={movie}
      getImageUrl={this.buildImageUrl.buildPath}
    />
  );
  public renderTvShow = (tvShow: TvShow) => (
    <TvShowOverview
      key={tvShow.id}
      data={tvShow}
      getImageUrl={this.buildImageUrl.buildPath}
    />
  );
  public renderPerson = (person: Person) => (
    <PersonOverview
      key={person.id}
      data={person}
      getImageUrl={this.buildImageUrl.buildPath}
    />
  );
  public renderPagination = (pagination: IPagination) => (
    <ResultsPagination
      pagination={pagination}
      prevPage={this.prevPage}
      nextPage={this.nextPage}
    />
  );

  public render() {
    const { searchResults, requestSearch, searchType } = this.props;
    return (
      <div className="search">
        <SearchForm
          onSubmit={this.startSearch}
          setType={this.setType}
          searchType={searchType}
        />
        {searchResults &&
          searchResults.results && (
            <SearchResults
              searchResults={searchResults}
              requestSearch={requestSearch}
              renderMovie={this.renderMovie}
              renderTvShow={this.renderTvShow}
              renderPerson={this.renderPerson}
              renderPagination={this.renderPagination}
            />
          )}
      </div>
    );
  }
}
