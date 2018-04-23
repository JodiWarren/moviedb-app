import { TmdbApi } from "@jodi/tmdb-typescript-api";
import { Observable } from "rxjs/index";
import {
  SearchFormResults,
  SearchResultsTypes
} from "../../../types/SearchResults.types";

/**
 * @returns {boolean}
 */
export function canUseSessionStorage(): boolean {
  return typeof window.sessionStorage === "object";
}

/**
 * @param {string} name
 * @returns {any}
 */
export function getStoredQuery(name: string) {
  if (!canUseSessionStorage()) {
    return null;
  }
  return sessionStorage.getItem(name);
}

/**
 * @param {string} name
 * @returns {any}
 */
export function hasStoredQuery(name: string) {
  return getStoredQuery(name) !== null;
}

/**
 * @param {string} name
 * @param value
 */
export function storeQuery(name: string, value: any) {
  if (!canUseSessionStorage()) {
    return;
  }
  sessionStorage.setItem(name, JSON.stringify(value));
}

/**
 *
 * @param {SearchResultsTypes} type
 * @param {TmdbApi} api
 * @param {string} term
 * @param {number} page
 * @returns {Observable<SearchFormResults>}
 */
export function getSearchResultByType(
  type: SearchResultsTypes,
  api: TmdbApi,
  term: string,
  page: number
): Observable<SearchFormResults> {
  switch (type) {
    case "movie": {
      return api.search.movies(term, page);
    }
    case "tv": {
      return api.search.tvshows(term, page);
    }
    case "person": {
      return api.search.people(term, page);
    }
    case "multi": {
      return api.search.multi(term, page);
    }
  }
}
