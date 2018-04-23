import { TvShow, TvShowMulti } from "@jodi/tmdb-typescript-api";
import * as React from "react";
import { isTvShowMulti } from "../utils";
import { GetImageUrl } from "../utils/GetImageUrl";

export interface ITvShowOverview {
  data: TvShow | TvShowMulti;
  getImageUrl: GetImageUrl["buildPath"];
}

export class TvShowOverview extends React.Component<ITvShowOverview> {
  public shouldComponentUpdate(nextProps: ITvShowOverview) {
    return this.props.data.id !== nextProps.data.id;
  }

  public render() {
    const { data, getImageUrl } = this.props;
    const bgImage = getImageUrl(data.backdrop_path, "backdrop", 1000);
    const style = bgImage ? { backgroundImage: `url("${bgImage}")` } : {};
    return (
      <div
        className="searchResults__item searchResults__item--tvshow"
        style={style}
      >
        <div className="searchResults__item__text">
          <h2 className="searchResults__item__title">{data.name}</h2>
          {isTvShowMulti(data) &&
            data.media_type && (
              <h3 className="searchResults__item__type">TV Show</h3>
            )}
        </div>
      </div>
    );
  }
}
