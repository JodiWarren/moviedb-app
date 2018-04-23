import { TmdbApi } from "@jodi/tmdb-typescript-api";
import slugify from "slugify";

import { noOp } from "../../../global/utils";
import {
  SearchFormResults,
  SearchResultsTypes
} from "../../../types/SearchResults.types";
import { isValidSearchType } from "../../Search/utils";
import {
  canUseSessionStorage,
  getSearchResultByType,
  getStoredQuery,
  hasStoredQuery,
  storeQuery
} from "./utils";

/**
 *
 * @param {TmdbApi | null} api
 * @param {string} term
 * @param {(searchResults: SearchFormResults) => void} onSearchSuccess
 * @param {() => void} beforeSearch
 * @param {() => void} afterSearch
 * @param {SearchResultsTypes} type
 * @param {number} page
 */
export function makeSearch(
  api: TmdbApi | null,
  term: string = "",
  onSearchSuccess: (searchResults: SearchFormResults) => void,
  beforeSearch: () => void = noOp,
  afterSearch: () => void = noOp,
  type: SearchResultsTypes = "multi",
  page: number = 1
): void {
  if (!api) {
    throw Error(
      `makeSearch() requires an instance of the TMDB API as it's first parameter`
    );
  }

  if (!isValidSearchType(type)) {
    throw Error(`Invalid search type of ${type} sent to makeSearch()`);
  }

  // TODO: need to think of a better plan for this.
  if (term.length === 0) {
    return;
  }

  const canStore = canUseSessionStorage();
  const shortName = slugify(`Term${term}Type${type}Page${page}`);

  // check cache
  if (hasStoredQuery(shortName)) {
    const storedResults = getStoredQuery(shortName);
    if (storedResults) {
      // We're done here, scram
      return onSearchSuccess(JSON.parse(storedResults));
    }
  }

  beforeSearch();
  const results = getSearchResultByType(type, api, term, page);
  if (!results) {
    return;
  }
  if (canStore && shortName && results) {
    results.subscribe(result => {
      storeQuery(shortName, result);
    });
  }
  results.subscribe(result => {
    onSearchSuccess(result);
    afterSearch();
  });
}
