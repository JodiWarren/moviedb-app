import { TmdbApi } from "@jodi/tmdb-typescript-api";
import { ConfigurationResult } from "@jodi/tmdb-typescript-api/dist/src/model/configuration-result";
import slugify from "slugify";

import { noOp } from "../../../global/utils";
import {
  canUseSessionStorage,
  getStoredQuery,
  hasStoredQuery,
  storeQuery
} from "./utils";

export function getConfig(
  api: TmdbApi | null,
  onConfigSuccess: (config: ConfigurationResult) => void,
  beforeConfig: () => void = noOp,
  afterConfig: () => void = noOp
): void {
  if (!api) {
    throw Error(
      `getConfig() requires an instance of the TMDB API as it's first parameter`
    );
  }

  const canStore = canUseSessionStorage();
  const shortName = slugify(`appConfig`);

  // check cache
  if (hasStoredQuery(shortName)) {
    const storedResults = getStoredQuery(shortName);
    if (storedResults) {
      // We're done here, scram
      return onConfigSuccess(JSON.parse(storedResults));
    }
  }

  beforeConfig();
  const results = api.configuration.configuration();
  if (!results) {
    return;
  }
  if (canStore && shortName && results) {
    results.subscribe(result => {
      storeQuery(shortName, result);
    });
  }
  results.subscribe(result => {
    onConfigSuccess(result);
    afterConfig();
  });
}
