import { SearchResultsTypes } from "../../types/SearchResults.types";
import { isMovie, isPerson, isTvShow, isValidSearchType } from "./utils";

describe("isValidSearchType", () => {
  describe("it should return true for", () => {
    ["movie", "tv", "person", "multi"].forEach(searchType => {
      test(searchType, () => {
        expect(
          isValidSearchType(searchType as SearchResultsTypes)
        ).toBeTruthy();
      });
    });
  });

  describe("it returns false for", () => {
    ["Movie", "teevee", "person1", "1234", undefined, null, 0, 100].forEach(
      searchType => {
        test(searchType as SearchResultsTypes, () => {
          expect(
            isValidSearchType(searchType as SearchResultsTypes)
          ).toBeFalsy();
        });
      }
    );
  });
});

const movie = require("./fixtures/movie-search.json");

describe("isMovie", () => {
  it("should only return true if the item has a release_date property", () => {
    expect(isMovie(movie.results[0])).toBeTruthy();
  });
});

const tvShow = require("./fixtures/tv-show-search.json");

describe("isTvShow", () => {
  it("should only return true if the item has a first_air_date property", () => {
    expect(isTvShow(tvShow.results[0])).toBeTruthy();
  });
});

const person = require("./fixtures/person-search.json");

describe("isPerson", () => {
  it("should only return true if the item has a known_for property", () => {
    expect(isPerson(person.results[0])).toBeTruthy();
  });
});
