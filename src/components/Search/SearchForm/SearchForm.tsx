import * as React from "react";
import { SearchResultsTypes } from "../../../types/SearchResults.types";
import { isValidSearchType } from "../utils";

interface ISearchFormProps {
  onSubmit: (term: string) => void;
  setType: (value: SearchResultsTypes) => void;
  searchType: SearchResultsTypes;
}

import "./SearchForm.css";

export class SearchForm extends React.Component<ISearchFormProps> {
  public input: HTMLInputElement | null = null;

  public labels = {
    movie: {
      main: "Search Movies:",
      placeholder: 'Try "Amélie"'
    },
    multi: {
      main: "Search:",
      placeholder: 'Try "Space"'
    },
    person: {
      main: "Search People:",
      placeholder: 'Try "Spielberg"'
    },
    tv: {
      main: "Search TV Shows:",
      placeholder: 'Try "Game of Thrones"'
    }
  };

  public handleSubmit = (event: any) => {
    event.preventDefault();
    if (!this.input) {
      return;
    }
    const term = this.input.value;
    this.props.onSubmit(term);
  };

  public assignInput = (input: any): void => {
    this.input = input;
  };

  public handleOnChange = (event: any): void => {
    const { value } = event.currentTarget;
    if (value && isValidSearchType(value as SearchResultsTypes)) {
      this.props.setType(value as SearchResultsTypes);
    }
  };

  public render() {
    const { searchType } = this.props;
    const { main, placeholder } = this.labels[searchType];

    return (
      <form id="searchForm" className="searchForm" onSubmit={this.handleSubmit}>
        <div className="searchMovies__field searchMovies__field--term">
          <label className="searchMovies__field__label searchMovies__field__label--term">
            {main}
          </label>
          <input
            type="search"
            id="movieSearchField"
            placeholder={placeholder}
            ref={this.assignInput}
            title="Search term"
            className="searchMovies__field__input searchMovies__field__input--term"
          />
          <button
            type="submit"
            title="Search"
            className="searchMovies__field__button searchMovies__field__button--term"
          >
            Search
          </button>
        </div>
        <div className="searchMovies__field searchMovies__field--type">
          <label className="searchMovies__field__label searchMovies__field__label--type">
            <span>All</span>
            <input
              name="searchType"
              value="multi"
              type="radio"
              id="searchTypeMulti"
              onChange={this.handleOnChange}
              checked={searchType === "multi"}
              title="Search type: All"
            />
          </label>
          <label className="searchMovies__field__label searchMovies__field__label--type">
            <span>Movie</span>
            <input
              name="searchType"
              value="movie"
              onChange={this.handleOnChange}
              type="radio"
              id="searchTypeMovie"
              checked={searchType === "movie"}
              title="Search type: Movie"
            />
          </label>
          <label className="searchMovies__field__label searchMovies__field__label--type">
            <span>TV</span>
            <input
              name="searchType"
              value="tv"
              onChange={this.handleOnChange}
              type="radio"
              id="searchTypeTv"
              checked={searchType === "tv"}
              title="Search type: TV"
            />
          </label>
          <label
            className="searchMovies__field__label searchMovies__field__label--type"
            htmlFor="searchTypePerson"
          >
            <span>Person</span>
            <input
              name="searchType"
              value="person"
              onChange={this.handleOnChange}
              type="radio"
              id="searchTypePerson"
              checked={searchType === "person"}
              title="Search type: Person"
            />
          </label>
        </div>
      </form>
    );
  }
}
