import {
  Movie,
  MovieMulti,
  Person,
  PersonMulti,
  SearchResult,
  TvShow,
  TvShowMulti
} from "@jodi/tmdb-typescript-api";

export type SearchMultiResults = SearchResult<
  MovieMulti | TvShowMulti | PersonMulti
>;

export type SearchSingleResults = SearchResult<Movie | TvShow | Person>;

export type SearchFormResults = SearchSingleResults | SearchMultiResults;

export type SearchResultsTypes = "movie" | "tv" | "person" | "multi";
