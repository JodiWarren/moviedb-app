import { Movie, Person, TvShow } from "@jodi/tmdb-typescript-api";
import * as React from "react";

import "./SearchResults.css";

import { truthyOrZero } from "../../../global/utils";
import {
  SearchFormResults,
  SearchResultsTypes
} from "../../../types/SearchResults.types";
import { isMovie, isPerson, isTvShow } from "../utils";

export interface IPagination {
  currentPage: number;
  maxPages: number;
  nextPage: number;
  prevPage: number;
}

const decoratePagination = (
  searchResults: SearchFormResults | null
): IPagination => {
  if (searchResults === null) {
    return {
      currentPage: 0,
      maxPages: 0,
      nextPage: 0,
      prevPage: 0
    };
  }

  return {
    currentPage: searchResults.page,
    maxPages: searchResults.total_pages,
    nextPage: truthyOrZero(searchResults.page + 1),
    prevPage: truthyOrZero(searchResults.page - 1)
  };
};

interface ISearchResults {
  searchResults: SearchFormResults | null;
  requestSearch: (
    term: string,
    type: SearchResultsTypes,
    page: number | undefined
  ) => void;
  renderPagination: (data: IPagination) => any;
  renderTvShow: (item: TvShow) => any;
  renderMovie: (item: Movie) => any;
  renderPerson: (item: Person) => any;
}

export class SearchResults extends React.Component<ISearchResults> {
  public renderResults(results: Array<Movie | TvShow | Person>) {
    return results.map(item => {
      if (isMovie(item)) {
        return this.props.renderMovie(item);
      }
      if (isTvShow(item)) {
        return this.props.renderTvShow(item);
      }
      if (isPerson(item)) {
        return this.props.renderPerson(item);
      }
      return null;
    });
  }

  public shouldComponentUpdate(nextProps: ISearchResults) {
    return this.props.searchResults !== nextProps.searchResults;
  }

  public render() {
    const { searchResults } = this.props;
    if (searchResults === null) {
      return null;
    }
    const decoratedPagination = decoratePagination(this.props.searchResults);

    const { results } = searchResults;

    return (
      <div className="searchResults">
        {this.props.renderPagination(decoratedPagination)}
        <div className="searchResults__items">
          {this.renderResults(results)}
        </div>
        {this.props.renderPagination(decoratedPagination)}
      </div>
    );
  }
}
