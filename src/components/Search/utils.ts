import {
  Movie,
  MovieMulti,
  Person,
  PersonMulti,
  TvShow,
  TvShowMulti
} from "@jodi/tmdb-typescript-api";
import { isInArray } from "../../global/utils";
import { SearchResultsTypes } from "../../types/SearchResults.types";

export function isValidSearchType(type: SearchResultsTypes): boolean {
  return isInArray<string>(type, ["movie", "tv", "person", "multi"]);
}

/**
 * Cast to Movie based on available parameters
 * @param {Movie | TvShow | Person} item
 * @returns {item}
 */
export function isMovie(item: Movie | TvShow | Person): item is Movie {
  return (item as Movie).release_date !== undefined;
}

/**
 * Cast to MovieMulti based on available parameters
 * @param {Movie | MovieMulti} item
 * @returns {item}
 */
export function isMovieMulti(item: Movie | MovieMulti): item is MovieMulti {
  return (item as MovieMulti).media_type !== undefined;
}

/**
 * Cast to TvShow based on available parameters
 * @param {Movie | TvShow | Person} item
 * @returns {item}
 */
export function isTvShow(item: Movie | TvShow | Person): item is TvShow {
  return (item as TvShow).first_air_date !== undefined;
}

/**
 * Cast to MovieMulti based on available parameters
 * @param {Movie | MovieMulti} item
 * @returns {item}
 */
export function isTvShowMulti(item: TvShow | TvShowMulti): item is TvShowMulti {
  return (item as TvShowMulti).media_type !== undefined;
}

/**
 * Cast to Person based on available parameters
 * @param {Movie | TvShow | Person} item
 * @returns {item}
 */
export function isPerson(item: Movie | TvShow | Person): item is Person {
  return (item as Person).known_for !== undefined;
}

/**
 * Cast to MovieMulti based on available parameters
 * @param {Movie | MovieMulti} item
 * @returns {item}
 */
export function isPersonMulti(item: Person | PersonMulti): item is PersonMulti {
  return (item as PersonMulti).media_type !== undefined;
}
